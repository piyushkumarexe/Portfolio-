/* ============================================================
   Piyush Kr — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  function hideLoader() {
    if (loader) loader.classList.add("done");
  }
  window.addEventListener("load", function () {
    // give the bar a beat to finish animating, then fade out
    setTimeout(hideLoader, 1500);
  });
  // safety: never trap the user behind the loader
  setTimeout(hideLoader, 3200);

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* ---------- Active nav link highlight ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    var sio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { sio.observe(s); });
  }

  /* ---------- Discord presence (Lanyard) — optional ----------
     Drop your Discord user ID below to show live status / Spotify.
     Everything falls back gracefully to the static "Offline"
     state when no ID is set or the API is unreachable.        */
  var DISCORD_ID = ""; // e.g. "1020693089851027457"

  if (DISCORD_ID && "fetch" in window) {
    fetch("https://api.lanyard.rest/v1/users/" + DISCORD_ID)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.success) return;
        var d = data.data;
        var stateEl = document.querySelector(".activity-value");
        var dotEl = document.querySelector(".status-dot");

        // Discord status
        var status = d.discord_status; // "online" | "idle" | "dnd" | "offline"
        var label = status.charAt(0).toUpperCase() + status.slice(1);
        if (stateEl) {
          var emoji = { online: "🟢", idle: "🌙", dnd: "⛔", offline: "😴" }[status] || "😴";
          stateEl.parentElement.querySelector(".dot-emoji").textContent = emoji;
          stateEl.textContent = label;
        }
        if (dotEl) {
          dotEl.classList.remove("offline", "online", "idle", "dnd");
          dotEl.classList.add(status === "online" ? "online" : status);
        }

        // Spotify
        var spotUser = document.querySelector(".spotify-user");
        var spotTrack = document.querySelector(".spotify-track");
        var spotArt = document.querySelector(".spotify-art");
        if (d.spotify) {
          if (spotUser) spotUser.textContent = d.spotify.artist;
          if (spotTrack) spotTrack.textContent = d.spotify.song;
          if (spotArt) {
            spotArt.style.backgroundImage = "url(" + d.spotify.album_art_url + ")";
            spotArt.style.backgroundSize = "cover";
            spotArt.textContent = "";
          }
          var spotState = document.querySelector(".spotify .activity-value");
          if (spotState) spotState.textContent = "Listening";
        } else {
          if (spotUser) spotUser.textContent = "Piyush";
          if (spotTrack) spotTrack.textContent = "Not listening";
        }
      })
      .catch(function () { /* stay on static state */ });
  }
})();
