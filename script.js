/* =========================================================
   GOKULRAJ G — PORTFOLIO
   script.js
   ========================================================= */

"use strict";

/* =========================================================
   1. DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

/* =========================================================
   2. PAGE READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollProgress();
  initRevealAnimations();
  initCounters();
  initTiltCards();
  initCursorGlow();
  initCertificateFilter();
  initSmoothScrolling();
  initActiveNavigation();
  initCurrentYear();
  initLazyImages();
});

/* =========================================================
   3. NAVIGATION
   ========================================================= */

function initNavigation() {
  const menuButton = $(".menu");
  const links = $(".links");

  if (!menuButton || !links) return;

  menuButton.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      menuButton.classList.add("active");
    } else {
      menuButton.classList.remove("active");
    }
  });

  /* Close menu after clicking a navigation link */
  $$(".links a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  /* Close menu when clicking outside */
  document.addEventListener("click", (event) => {
    if (
      links.classList.contains("open") &&
      !links.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      links.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  /* Close mobile menu with Escape */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      links.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================================================
   4. NAVBAR SCROLL EFFECT
   ========================================================= */

function updateNavbar() {
  const navShell = $(".nav-shell");

  if (!navShell) return;

  if (window.scrollY > 40) {
    navShell.classList.add("scrolled");
  } else {
    navShell.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar, {
  passive: true,
});

updateNavbar();

/* =========================================================
   5. SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {
  const progress = $(".scroll-progress");

  if (!progress) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) {
      progress.style.width = "0%";
      return;
    }

    const percentage = (scrollTop / documentHeight) * 100;

    progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };

  window.addEventListener("scroll", updateProgress, {
    passive: true,
  });

  window.addEventListener("resize", updateProgress);

  updateProgress();
}

/* =========================================================
   6. REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {
  const elements = $$(".reveal");

  if (!elements.length) return;

  /* Respect reduced-motion preference */
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   7. ANIMATED COUNTERS
   ========================================================= */

function initCounters() {
  const counters = $$("[data-count]");

  if (!counters.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animateCounter = (element) => {
    const target = Number(element.dataset.count);

    if (!Number.isFinite(target)) return;

    const decimals = Number(element.dataset.decimals || 0);
    const duration = Number(element.dataset.duration || 1600);

    if (reduceMotion) {
      element.textContent = target.toFixed(decimals);
      return;
    }

    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /* Smooth ease-out */
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * eased;

      element.textContent = currentValue.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toFixed(decimals);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (element.dataset.counted === "true") return;

        element.dataset.counted = "true";

        animateCounter(element);

        observerInstance.unobserve(element);
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/* =========================================================
   8. 3D TILT EFFECT
   ========================================================= */

function initTiltCards() {
  const cards = $$(".tilt");

  if (!cards.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (reduceMotion || isTouchDevice) return;

  cards.forEach((card) => {
    let frame = null;

    const resetCard = () => {
      card.style.transform = "";
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    };

    card.addEventListener("mousemove", (event) => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        const mx = (x / rect.width) * 100;
        const my = (y / rect.height) * 100;

        card.style.transform = `
          perspective(900px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-4px)
        `;

        card.style.setProperty("--mx", `${mx}%`);
        card.style.setProperty("--my", `${my}%`);
      });
    });

    card.addEventListener("mouseleave", () => {
      if (frame) cancelAnimationFrame(frame);
      resetCard();
    });

    card.addEventListener("blur", resetCard);
  });
}

/* =========================================================
   9. CURSOR GLOW
   ========================================================= */

function initCursorGlow() {
  const glow = $(".cursor-glow");

  if (!glow) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (reduceMotion || isTouchDevice) {
    glow.style.display = "none";
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    },
    {
      passive: true,
    }
  );

  const animate = () => {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
  };

  animate();
}

/* =========================================================
   10. CERTIFICATE FILTER / SHOW MORE
   ========================================================= */

function initCertificateFilter() {
  const certificateCards = $$(".cert-card");
  const filterButtons = $$("[data-cert-filter]");
  const showMoreButton =
    $("[data-cert-more]") ||
    $("#certMore") ||
    $(".cert-more");

  if (!certificateCards.length) return;

  /* -------------------------------------------------------
     Certificate filtering
     ------------------------------------------------------- */

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = (
          button.dataset.certFilter || "all"
        ).toLowerCase();

        filterButtons.forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-selected", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-selected", "true");

        certificateCards.forEach((card) => {
          const category = (
            card.dataset.category || "all"
          ).toLowerCase();

          const matches =
            filter === "all" ||
            category === filter ||
            category.includes(filter);

          card.classList.toggle("hidden", !matches);
        });
      });
    });
  }

  /* -------------------------------------------------------
     Show more certificates
     ------------------------------------------------------- */

  if (showMoreButton) {
    const initialVisible = Number(
      showMoreButton.dataset.initial ||
        showMoreButton.dataset.visible ||
        8
    );

    let expanded = false;

    const updateCertificates = () => {
      certificateCards.forEach((card, index) => {
        if (expanded || index < initialVisible) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });

      showMoreButton.textContent = expanded
        ? "Show Less"
        : "View More Certificates";

      showMoreButton.setAttribute(
        "aria-expanded",
        String(expanded)
      );
    };

    showMoreButton.addEventListener("click", () => {
      expanded = !expanded;
      updateCertificates();
    });

    updateCertificates();
  }
}

/* =========================================================
   11. SMOOTH SCROLLING
   ========================================================= */

function initSmoothScrolling() {
  const links = $$('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      /* Update URL without jumping */
      try {
        history.pushState(null, "", href);
      } catch (error) {
        /* Ignore browser history errors */
      }
    });
  });
}

/* =========================================================
   12. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {
  const navLinks = $$(".links a");

  if (!navLinks.length) return;

  const sections = [];

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) return;

    const section = document.querySelector(href);

    if (section) {
      sections.push({
        section,
        link,
      });
    }
  });

  if (!sections.length) return;

  const updateActiveLink = () => {
    const scrollPosition =
      window.scrollY + 160;

    let current = sections[0];

    sections.forEach((item) => {
      if (item.section.offsetTop <= scrollPosition) {
        current = item;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });

    if (current) {
      current.link.classList.add("active");
      current.link.setAttribute(
        "aria-current",
        "page"
      );
    }
  };

  window.addEventListener("scroll", updateActiveLink, {
    passive: true,
  });

  window.addEventListener("resize", updateActiveLink);

  updateActiveLink();
}

/* =========================================================
   13. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
  const yearElements = $$("[data-year]");

  if (!yearElements.length) return;

  const year = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = year;
  });
}

/* =========================================================
   14. LAZY IMAGE LOADING
   ========================================================= */

function initLazyImages() {
  const images = $$("img[data-src]");

  if (!images.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const image = entry.target;
          const source = image.dataset.src;

          if (source) {
            image.src = source;
            image.removeAttribute("data-src");
          }

          observerInstance.unobserve(image);
        });
      },
      {
        rootMargin: "200px",
      }
    );

    images.forEach((image) => {
      observer.observe(image);
    });
  } else {
    images.forEach((image) => {
      const source = image.dataset.src;

      if (source) {
        image.src = source;
        image.removeAttribute("data-src");
      }
    });
  }
}

/* =========================================================
   15. IMAGE ERROR HANDLING
   ========================================================= */

$$("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-error");
  });
});

/* =========================================================
   16. EXTERNAL LINKS
   ========================================================= */

$$('a[target="_blank"]').forEach((link) => {
  const currentRel = link.getAttribute("rel") || "";

  const relValues = new Set(
    currentRel.split(/\s+/).filter(Boolean)
  );

  relValues.add("noopener");
  relValues.add("noreferrer");

  link.setAttribute(
    "rel",
    Array.from(relValues).join(" ")
  );
});

/* =========================================================
   17. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;

  document.body.classList.add("keyboard-user");
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-user");
});

/* =========================================================
   18. BACK TO TOP SUPPORT
   ========================================================= */

const backToTop =
  $("[data-back-top]") ||
  $("#backToTop") ||
  $(".back-to-top");

if (backToTop) {
  const toggleBackToTop = () => {
    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleBackToTop, {
    passive: true,
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
    });
  });

  toggleBackToTop();
}

/* =========================================================
   19. RESUME / PDF LINK SAFETY
   ========================================================= */

$$('a[href$=".pdf"]').forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("target", "_blank");
    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  });
});

/* =========================================================
   20. PERFORMANCE — PAUSE EFFECTS WHEN TAB HIDDEN
   ========================================================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.documentElement.classList.add(
      "page-hidden"
    );
  } else {
    document.documentElement.classList.remove(
      "page-hidden"
    );
  }
});

/* =========================================================
   21. CONSOLE MESSAGE
   ========================================================= */

console.log(
  "%cGOKULRAJ G — Portfolio",
  "font-size:18px;font-weight:bold;"
);

console.log(
  "%cAI • ML • IoT • Computer Vision • Research • Innovation",
  "font-size:12px;"
);

/* =========================================================
   END OF SCRIPT
   ========================================================= */
