/* ============================================================
   Piyush.dev — Portfolio scripts
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
  // Hide after window load, or after a safe fallback delay.
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener("load", () => setTimeout(hideLoader, 400));
    setTimeout(hideLoader, 2500); // fallback
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
    // Close when a link is tapped.
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    // Close on outside click / escape.
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

  /* ---------- Sticky nav shadow on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 12) {
      nav.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    } else {
      nav.style.boxShadow = "none";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".section > .container, .hero__content, .hero__side");
  revealEls.forEach((el) => el.classList.add("reveal"));

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
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat__num");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
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

  /* ---------- Subtle tilt on profile card ---------- */
  const statusCard = document.querySelector(".status-card");
  if (statusCard && window.matchMedia("(pointer: fine)").matches) {
    statusCard.addEventListener("mousemove", (e) => {
      const rect = statusCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      statusCard.style.transform =
        "perspective(800px) rotateY(" + x * 5 + "deg) rotateX(" + -y * 5 + "deg)";
    });
    statusCard.addEventListener("mouseleave", () => {
      statusCard.style.transform = "";
    });
  }
})();
