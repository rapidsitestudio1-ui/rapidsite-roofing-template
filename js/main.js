// Roflin template — vanilla JS
(function () {
  "use strict";

  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Projects: cards fold into each other while scrolling.
  // Each card is sticky; as the next one scrolls over it, the pinned card
  // scales down and dims slightly so the stack reads as folding together.
  var stack = document.getElementById("project-stack");
  if (stack && motionOK) {
    var items = Array.prototype.slice.call(stack.querySelectorAll(".stack__item"));
    var cards = items.map(function (item) { return item.querySelector(".project-card"); });
    var ticking = false;

    var update = function () {
      ticking = false;
      items.forEach(function (item, i) {
        var next = items[i + 1];
        if (!next) return; // last card never folds
        var rect = item.getBoundingClientRect();
        var nextRect = next.getBoundingClientRect();
        // Progress of the next card covering this one: 0 (not yet) → 1 (fully stacked)
        var span = rect.height || 1;
        var covered = Math.min(Math.max((rect.bottom - nextRect.top) / span, 0), 1);
        var scale = 1 - covered * 0.06;
        var lift = covered * -12;
        cards[i].style.transform = "translateY(" + lift + "px) scale(" + scale + ")";
        cards[i].style.filter = "brightness(" + (1 - covered * 0.18) + ")";
      });
    };
    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  // Before/after comparison slider
  var compare = document.getElementById("compare");
  if (compare) {
    var range = compare.querySelector(".compare__range");
    range.addEventListener("input", function () {
      compare.style.setProperty("--pos", range.value + "%");
    });
  }

  // Testimonials slider dots
  var track = document.getElementById("reviews-track");
  var dotsWrap = document.querySelector(".reviews__dots");
  if (track && dotsWrap) {
    var slides = track.children.length;
    for (var i = 0; i < slides; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Go to testimonial " + (i + 1));
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      (function (index) {
        b.addEventListener("click", function () {
          track.scrollTo({ left: index * track.clientWidth, behavior: motionOK ? "smooth" : "auto" });
        });
      })(i);
      dotsWrap.appendChild(b);
    }
    var syncDots = function () {
      var index = Math.round(track.scrollLeft / track.clientWidth);
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    };
    track.addEventListener("scroll", function () {
      window.requestAnimationFrame(syncDots);
    }, { passive: true });
  }

  // FAQ: keep only one item open at a time
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Soft scroll-reveal animations
  if (motionOK && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      [
        ".hero__content", ".hero__emergency",
        ".about__photo", ".about__content", ".about__badge",
        ".section-head", ".service-card", ".services__more",
        ".compare__frame", ".bento",
        ".team__grid li",
        ".reviews__stat", ".reviews__slider", ".reviews__side",
        ".contact__info", ".contact__form",
        ".blog-card", ".blog__more",
        ".faq__intro", ".faq__item",
        ".cta__content > *"
      ].join(",")
    );
    targets.forEach(function (el) {
      el.classList.add("anim");
      var siblings = el.parentElement ? el.parentElement.children : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      el.style.transitionDelay = Math.min(idx * 90, 360) + "ms";
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim--in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { observer.observe(el); });
  }
})();
