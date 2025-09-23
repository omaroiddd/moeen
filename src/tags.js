import Matter from "matter-js";

(function () {
  const container = document.querySelector(".hero__tags");
  if (!container) return;

  const tags = Array.from(container.querySelectorAll(".tag"));
  if (!tags.length) return;

  /* ===== Helpers ===== */
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const bounds = () => container.getBoundingClientRect();
  const setVar = (el, name, val, unit = "px") =>
    el.style.setProperty(name, typeof val === "number" ? `${val}${unit}` : val);

  // نوزع التاجز مبدئياً: X عشوائي جوّا العرض، و Y فوق الحاوية (عشان "تقع من فوق")
  function seedAboveTop() {
    const b = bounds();
    tags.forEach((tag) => {
      const r = tag.getBoundingClientRect();
      const hw = r.width / 2,
        hh = r.height / 2;
      const x = clamp(Math.random() * b.width, hw, b.width - hw);
      const y = -Math.random() * 200 - hh - 20; // فوق بفرق 20-200px
      setVar(tag, "--x", x);
      setVar(tag, "--y", y);
      setVar(tag, "--rotate", "0rad");
    });
  }

  // نادّيها دلوقتي بحيث نظهرهم في أماكن فوق قبل الفيزياء
  seedAboveTop();

  /* ===== Lazy-start via IntersectionObserver ===== */
  const heroSection = document.querySelector(".hero");
  let started = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startPhysics(); // نبدأ المحرك
          observer.unobserve(heroSection);
        }
      });
    },
    { threshold: 0.25 } // لما 25% من السكشن يظهر
  );
  observer.observe(heroSection);

  /* ===== Matter.js world ===== */
  function startPhysics() {
    const {
      Engine,
      Runner,
      Composite,
      Bodies,
      Body,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    const engine = Engine.create({ enableSleeping: true });
    const world = engine.world;

    // كانت 0 قبل البداية؛ دلوقتي نشغّل الجاذبية للأسفل
    world.gravity.x = 0;
    world.gravity.y = 0.9;

    // نعمل Body لكل Tag
    const b = bounds();
    const entries = tags.map((el) => {
      const r = el.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      // ناخد الـX من CSS vars (اللي عملناها seed)، والـY برضه فوق
      const cssX =
        parseFloat(getComputedStyle(el).getPropertyValue("--x")) || b.width / 2;
      const cssY =
        parseFloat(getComputedStyle(el).getPropertyValue("--y")) || -100;

      const body = Bodies.rectangle(cssX, cssY, w, h, {
        chamfer: { radius: 10 },
        restitution: 0.6, // ارتداد
        friction: 0.08,
        frictionAir: 0.03, // سحب هواء
        density: 0.0016,
      });

      // دوران عشوائي بسيط للبداية
      Body.setAngle(body, (Math.random() - 0.5) * 0.6);

      return { el, body };
    });

    Composite.add(
      world,
      entries.map((e) => e.body)
    );

    // جدران الحاوية (يمين/شمال/تحت وفوق)
    let walls = [];
    function makeWalls() {
      if (walls.length) Composite.remove(world, walls);
      const pad = 2;
      const W = bounds().width;
      const H = bounds().height;

      const left = Bodies.rectangle(-pad / 2, H / 2, pad, H, {
        isStatic: true,
      });
      const right = Bodies.rectangle(W + pad / 2, H / 2, pad, H, {
        isStatic: true,
      });
      const top = Bodies.rectangle(W / 2, -pad / 2, W, pad, {
        isStatic: true,
      });
      const bottom = Bodies.rectangle(W / 2, H + pad / 2, W, pad, {
        isStatic: true,
      });

      walls = [left, right, top, bottom];
      Composite.add(world, walls);
    }
    makeWalls();

    // سحب بالماوس جوّا نفس الكونتينر (بدون canvas)
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        angularStiffness: 0.02,
        damping: 0.02,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    // كلاس أثناء السحب
    Events.on(mouseConstraint, "startdrag", (e) => {
      const entry = entries.find((en) => en.body === e.body);
      if (entry) entry.el.classList.add("is-dragging");
    });
    Events.on(mouseConstraint, "enddrag", (e) => {
      const entry = entries.find((en) => en.body === e.body);
      if (entry) entry.el.classList.remove("is-dragging");
    });

    // تشغيل المحرك + مزامنة CSS vars كل فريم
    const runner = Runner.create();
    Runner.run(runner, engine);

    (function sync() {
      const bNow = bounds();
      entries.forEach(({ el, body }) => {
        // كلّمب ناعم لو خرج شوية بسبب ريسايز
        const r = el.getBoundingClientRect();
        const hw = r.width / 2,
          hh = r.height / 2;

        const x = clamp(body.position.x, hw, bNow.width - hw);
        const y = clamp(body.position.y, hh, bNow.height - hh);

        if (x !== body.position.x || y !== body.position.y) {
          Body.setPosition(body, { x, y });
          Body.setVelocity(body, {
            x: body.velocity.x * 0.6,
            y: body.velocity.y * 0.6,
          });
        }

        setVar(el, "--x", body.position.x);
        setVar(el, "--y", body.position.y);
        setVar(el, "--rotate", body.angle, "rad");
      });
      requestAnimationFrame(sync);
    })();

    // ريسايز: عدّل الجدران وامنَع الأجسام من الهروب
    let resizeRaf = null;
    window.addEventListener("resize", () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        makeWalls();
        const b2 = bounds();
        entries.forEach(({ el, body }) => {
          const r = el.getBoundingClientRect();
          const hw = r.width / 2,
            hh = r.height / 2;
          const nx = clamp(body.position.x, hw, b2.width - hw);
          const ny = clamp(body.position.y, hh, b2.height - hh);
          Body.setPosition(body, { x: nx, y: ny });
          Body.setVelocity(body, { x: 0, y: 0 });
        });
      });
    });
  }
})();
