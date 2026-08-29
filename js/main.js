/* ============================================================
   Piyush Kumar — Portfolio scripts
   Loader · live IST clock · mobile nav · reveal · counters ·
   active section · profile-card tilt
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Loader ---------- */
  const loader = document.getElementById("loader");
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add("is-hidden");
    document.body.classList.add("is-loaded");
  };
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 350);
  } else {
    window.addEventListener("load", () => setTimeout(hideLoader, 350));
    setTimeout(hideLoader, 2200); // fallback so it never sticks
  }

  /* ---------- Live IST clock (nav) ---------- */
  const clock = document.getElementById("clock");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => {
      const time = fmt.format(new Date());
      clock.textContent = "IST " + time;
      clock.setAttribute("datetime", time);
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const closeNav = () => {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("click", (e) => {
      if (
        !navLinks.classList.contains("is-open") ||
        navLinks.contains(e.target) ||
        navToggle.contains(e.target)
      )
        return;
      closeNav();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    nav.style.boxShadow = window.scrollY > 12 ? "0 10px 30px rgba(0,0,0,0.5)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (with light stagger) ---------- */
  const heroContent = document.querySelector(".hero__content");
  const heroSide = document.querySelector(".hero__side");
  if (heroContent) heroContent.classList.add("reveal");
  if (heroSide) heroSide.classList.add("reveal", "reveal--d1");

  document.querySelectorAll(".section").forEach((sec) => {
    const kids = sec.querySelectorAll(
      ".card, .project, .timeline__item, .contact-card, .loc-card, .cta-banner, .stats, .section__index, .section__title"
    );
    kids.forEach((el, i) => {
      el.classList.add("reveal");
      if (i > 0) el.classList.add("reveal--d" + Math.min(i, 3));
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated counters (stats) ---------- */
  const counters = document.querySelectorAll(".stat__num");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.target || "0") + (el.dataset.suffix || "");
    });
  }

  /* ---------- Active section highlight in nav ---------- */
  if ("IntersectionObserver" in window && navLinks) {
    const map = {};
    navLinks.querySelectorAll("a").forEach((a) => {
      map[a.getAttribute("href").slice(1)] = a;
    });
    const sections = Object.keys(map)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          Object.values(map).forEach((a) => a.classList.remove("is-active"));
          const link = map[entry.target.id];
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => sio.observe(s));
  }

  /* ---------- Subtle tilt on profile card ---------- */
  const pcard = document.querySelector(".pcard");
  if (pcard && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pcard.addEventListener("mousemove", (e) => {
      const rect = pcard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      pcard.style.transform =
        "perspective(900px) rotateY(" + x * 4 + "deg) rotateX(" + -y * 4 + "deg)";
    });
    pcard.addEventListener("mouseleave", () => {
      pcard.style.transform = "";
    });
    pcard.style.transition = "transform 0.25s ease";
  }
})();
