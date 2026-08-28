```javascript
/* =========================================================
   G. GOKULRAJ PORTFOLIO
   FINAL SCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     GLOBAL HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     BOOT SCREEN
     IMPORTANT: REMOVE GG SCREEN
     ======================================================= */

  function initBootScreen() {
    const boot = $("#boot");

    if (!boot) return;

    const hideBoot = () => {
      boot.classList.add("hidden");
      boot.setAttribute("aria-hidden", "true");

      setTimeout(() => {
        if (boot && boot.parentNode) {
          boot.remove();
        }
      }, prefersReducedMotion ? 0 : 700);
    };

    /*
     * Hide the boot screen quickly.
     * This prevents the site from being permanently
     * stuck displaying only "GG".
     */

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(hideBoot, prefersReducedMotion ? 0 : 600);
      });
    } else {
      setTimeout(hideBoot, prefersReducedMotion ? 0 : 600);
    }

    /*
     * Emergency fallback.
     * Even if another script/component fails,
     * the boot screen will never remain forever.
     */

    setTimeout(hideBoot, 2500);
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initNavigation() {
    const menuButton = $("#menuButton");
    const navLinks = $("#navLinks");

    if (!menuButton || !navLinks) return;

    const links = $$("a", navLinks);

    const closeMenu = () => {
      navLinks.classList.remove("open");
      menuButton.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    };

    const openMenu = () => {
      navLinks.classList.add("open");
      menuButton.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation");
    };

    menuButton.addEventListener("click", () => {
      const expanded =
        menuButton.getAttribute("aria-expanded") === "true";

      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }


  /* =======================================================
     NAVBAR SCROLL STATE
     ======================================================= */

  function initNavbar() {
    const navbar = $("#navbar");

    if (!navbar) return;

    const update = () => {
      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  function initScrollProgress() {
    const progress = $("#scrollProgress");

    if (!progress) return;

    const update = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        progress.style.width = "0%";
        return;
      }

      const percentage =
        (window.scrollY / documentHeight) * 100;

      progress.style.width =
        `${Math.min(100, Math.max(0, percentage))}%`;
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      { passive: true }
    );
  }


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  function initReveal() {
    const elements = $$(".reveal");

    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });

      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }


  /* =======================================================
     LIVE CLOCK
     ======================================================= */

  function initClock() {
    const clock = $("#clock");

    if (!clock) return;

    const updateClock = () => {
      const now = new Date();

      clock.textContent =
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
    };

    updateClock();

    setInterval(updateClock, 1000);
  }


  /* =======================================================
     FOCUS ROTATION
     ======================================================= */

  function initFocusText() {
    const focusText = $("#focusText");

    if (!focusText) return;

    const focusAreas = [
      "COMPUTER VISION",
      "ARTIFICIAL INTELLIGENCE",
      "SMART AGRICULTURE",
      "ROBOTICS",
      "INTERNET OF THINGS",
      "AGENTIC AI",
      "RESEARCH & INNOVATION"
    ];

    let index = 0;

    const changeFocus = () => {
      index = (index + 1) % focusAreas.length;

      if (prefersReducedMotion) {
        focusText.textContent = focusAreas[index];
        return;
      }

      focusText.style.opacity = "0";

      setTimeout(() => {
        focusText.textContent = focusAreas[index];
        focusText.style.opacity = "1";
      }, 200);
    };

    setInterval(changeFocus, 3500);
  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  function initSmoothLinks() {
    const links = $$('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = $(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth",
          block: "start"
        });
      });
    });
  }


  /* =======================================================
     RESEARCH DOMAIN DATA
     ======================================================= */

  const researchDomains = {
    AI: {
      title: "Artificial Intelligence",
      text:
        "Machine learning, deep learning and intelligent decision systems for practical applications.",
      tags: [
        "Machine Learning",
        "Deep Learning",
        "AI Systems"
      ]
    },

    "Computer Vision": {
      title: "Computer Vision",
      text:
        "Computer vision systems for detection, monitoring, recognition and intelligent automation.",
      tags: [
        "YOLO",
        "Object Detection",
        "Deep Learning"
      ]
    },

    IoT: {
      title: "Internet of Things",
      text:
        "Connected sensing, monitoring and automation systems for practical real-world applications.",
      tags: [
        "Sensors",
        "MQTT",
        "Embedded Systems"
      ]
    },

    Robotics: {
      title: "Robotics",
      text:
        "ROS and ROS2-oriented robotics development, learning systems and autonomous technology.",
      tags: [
        "ROS",
        "ROS2",
        "Robotics"
      ]
    },

    "Smart Agriculture": {
      title: "Smart Agriculture",
      text:
        "IoT-enabled agriculture, hydroponics monitoring, environmental sensing and intelligent farming.",
      tags: [
        "Hydroponics",
        "IoT",
        "Smart Farming"
      ]
    },

    "Agentic AI": {
      title: "Agentic AI",
      text:
        "Exploring intelligent agents capable of reasoning, curation and goal-oriented problem solving.",
      tags: [
        "AI Agents",
        "Reasoning",
        "Automation"
      ]
    }
  };


  /* =======================================================
     RESEARCH DOMAIN UI
     ======================================================= */

  function initResearchDomains() {
    const title = $("#domainTitle");
    const text = $("#domainText");
    const tagsContainer = $("#domainTags");

    const nodes = $$(".graph-node");

    if (!title || !text || !tagsContainer) return;

    const renderDomain = (domainName) => {
      const data =
        researchDomains[domainName] ||
        researchDomains.AI;

      title.textContent = data.title;
      text.textContent = data.text;

      tagsContainer.innerHTML = "";

      data.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });

      nodes.forEach((node) => {
        const active =
          node.dataset.domain === domainName;

        node.classList.toggle("active", active);
        node.setAttribute(
          "aria-pressed",
          active ? "true" : "false"
        );
      });
    };

    nodes.forEach((node) => {
      node.addEventListener("click", () => {
        renderDomain(node.dataset.domain);
      });
    });

    renderDomain("AI");
  }


  /* =======================================================
     RESEARCH CANVAS
     ======================================================= */

  function initResearchCanvas() {
    const canvas = $("#researchCanvas");

    if (!canvas) return;

    const parent = canvas.parentElement;

    if (!parent) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;

    const nodes = [
      { x: 0.5, y: 0.5 },
      { x: 0.22, y: 0.22 },
      { x: 0.78, y: 0.22 },
      { x: 0.18, y: 0.72 },
      { x: 0.82, y: 0.72 },
      { x: 0.5, y: 0.14 },
      { x: 0.5, y: 0.86 }
    ];

    const resize = () => {
      const rect = parent.getBoundingClientRect();

      const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      ctx.lineWidth = 1;

      const points = nodes.map((node) => ({
        x: node.x * width,
        y: node.y * height
      }));

      /*
       * Connection lines
       */

      points.slice(1).forEach((point) => {
        const center = points[0];

        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(point.x, point.y);

        ctx.strokeStyle =
          "rgba(130, 160, 210, 0.22)";

        ctx.stroke();
      });

      /*
       * Secondary connections
       */

      for (let i = 1; i < points.length; i++) {
        for (
          let j = i + 1;
          j < points.length;
          j++
        ) {
          const dx =
            points[i].x - points[j].x;

          const dy =
            points[i].y - points[j].y;

          const distance =
            Math.sqrt(dx * dx + dy * dy);

          if (distance < width * 0.55) {
            ctx.beginPath();

            ctx.moveTo(
              points[i].x,
              points[i].y
            );

            ctx.lineTo(
              points[j].x,
              points[j].y
            );

            ctx.strokeStyle =
              "rgba(130, 160, 210, 0.08)";

            ctx.stroke();
          }
        }
      }

      /*
       * Points
       */

      points.forEach((point, index) => {
        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          index === 0 ? 4 : 2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          index === 0
            ? "rgba(255,255,255,.9)"
            : "rgba(150,180,220,.55)";

        ctx.fill();
      });

      if (!prefersReducedMotion) {
        requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );

    if (prefersReducedMotion) {
      draw();
    }
  }


  /* =======================================================
     NEURAL BACKGROUND CANVAS
     ======================================================= */

  function initNeuralCanvas() {
    const canvas = $("#neuralCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;

    let particles = [];

    const particleCount =
      window.innerWidth < 700 ? 28 : 55;

    const resize = () => {
      const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx:
            (Math.random() - 0.5) * 0.25,
          vy:
            (Math.random() - 0.5) * 0.25,
          radius:
            Math.random() * 1.6 + 0.4
        });
      }
    };

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach((particle) => {
        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (
            particle.x < 0 ||
            particle.x > width
          ) {
            particle.vx *= -1;
          }

          if (
            particle.y < 0 ||
            particle.y > height
          ) {
            particle.vy *= -1;
          }
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(150,180,220,.45)";

        ctx.fill();
      });

      /*
       * Connections
       */

      for (let i = 0; i < particles.length; i++) {
        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance =
            Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const opacity =
              0.12 *
              (1 - distance / 130);

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle =
              `rgba(130,160,210,${opacity})`;

            ctx.lineWidth = 0.7;

            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );
  }


  /* =======================================================
     CURSOR GLOW
     ======================================================= */

  function initCursorGlow() {
    const glow = $(".cursor-glow");

    if (!glow) return;

    /*
     * Disable on touch devices.
     */

    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    ) {
      glow.style.display = "none";
      return;
    }

    if (prefersReducedMotion) {
      glow.style.display = "none";
      return;
    }

    window.addEventListener(
      "pointermove",
      (event) => {
        glow.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      },
      { passive: true }
    );
  }


  /* =======================================================
     TILT EFFECT
     ======================================================= */

  function initTilt() {
    if (prefersReducedMotion) return;

    const elements = $$(".tilt");

    elements.forEach((element) => {
      element.addEventListener(
        "pointermove",
        (event) => {
          if (window.innerWidth < 900) return;

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 8;

          const rotateX =
            ((y / rect.height) - 0.5) * -8;

          element.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;
        }
      );

      element.addEventListener(
        "pointerleave",
        () => {
          element.style.transform = "";
        }
      );
    });
  }


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  function initMagneticButtons() {
    if (prefersReducedMotion) return;

    const buttons = $$(".magnetic");

    buttons.forEach((button) => {
      button.addEventListener(
        "pointermove",
        (event) => {
          if (window.innerWidth < 900) return;

          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            (rect.left + rect.width / 2);

          const y =
            event.clientY -
            (rect.top + rect.height / 2);

          button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;
        }
      );

      button.addEventListener(
        "pointerleave",
        () => {
          button.style.transform = "";
        }
      );
    });
  }


  /* =======================================================
     PROJECT DATA
     ======================================================= */

  const projectData = {
    hydro: {
      title:
        "Hydroponic Nutrition Alert System",
      category:
        "SMART AGRICULTURE",
      description:
        "Sensor-driven monitoring architecture for pH, EC, TDS, temperature and humidity, with intelligent alerts, automation and predictive-analysis possibilities.",
      tags: [
        "IoT",
        "Arduino",
        "ESP32",
        "GSM",
        "Machine Learning"
      ]
    },

    vision: {
      title:
        "AI-Based Detection Systems",
      category:
        "COMPUTER VISION",
      description:
        "YOLO and YOLOv8-oriented computer vision workflows for intelligent detection, monitoring and automation applications.",
      tags: [
        "Python",
        "YOLOv8",
        "Computer Vision",
        "Deep Learning"
      ]
    },

    attendance: {
      title:
        "Faculty Attendance System",
      category:
        "AI AUTOMATION",
      description:
        "A computer-vision project direction focused on person detection and attendance-oriented automation.",
      tags: [
        "Python",
        "YOLO",
        "Computer Vision"
      ]
    },

    timetable: {
      title:
        "SRIT Timetable ERP",
      category:
        "ACADEMIC SOFTWARE",
      description:
        "Academic scheduling platform direction with faculty clash handling, room and lab optimization, continuous-period scheduling and Excel export.",
      tags: [
        "Python",
        "Streamlit",
        "Scheduling",
        "Excel"
      ]
    },

    aura: {
      title:
        "Project AURA — Agentic AI Curator",
      category:
        "AGENTIC AI",
      description:
        "An agentic AI concept focused on intelligent curation, reasoning and human-potential-oriented problem solving.",
      tags: [
        "Agentic AI",
        "AI Agents",
        "Reasoning"
      ]
    },

    ros: {
      title:
        "ROS Robotics Projects",
      category:
        "ROBOTICS",
      description:
        "Practical robotics learning and project development through ROS and ROS2-oriented workflows and student innovation.",
      tags: [
        "ROS",
        "ROS2",
        "Robotics",
        "Autonomous Systems"
      ]
    }
  };


  /* =======================================================
     PROJECT MODAL
     ======================================================= */

  function initProjectModal() {
    const modal = $("#modal");
    const modalContent = $("#modalContent");

    if (!modal || !modalContent) return;

    let lastFocusedElement = null;

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");

      if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
      ) {
        lastFocusedElement.focus();
      }
    };

    const openModal = (projectKey, trigger) => {
      const data = projectData[projectKey];

      if (!data) return;

      lastFocusedElement = trigger;

      modalContent.innerHTML = `
        <span class="label">
          ${escapeHTML(data.category)}
        </span>

        <h2 id="modalTitle">
          ${escapeHTML(data.title)}
        </h2>

        <p>
          ${escapeHTML(data.description)}
        </p>

        <div class="tags">
          ${data.tags
            .map(
              (tag) =>
                `<span>${escapeHTML(tag)}</span>`
            )
            .join("")}
        </div>
      `;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");

      const closeButton =
        $(".modal-close", modal);

      if (closeButton) {
        setTimeout(() => {
          closeButton.focus();
        }, 20);
      }
    };

    $$(".project-open").forEach((button) => {
      button.addEventListener("click", () => {
        openModal(
          button.dataset.project,
          button
        );
      });
    });

    $$("[data-close]", modal).forEach((element) => {
      element.addEventListener(
        "click",
        closeModal
      );
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          modal.classList.contains("open")
        ) {
          closeModal();
        }
      }
    );

    /*
     * Basic focus protection.
     */

    modal.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Tab") return;

        const focusable = $$(
          'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
          modal
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last =
          focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    );
  }


  /* =======================================================
     HTML ESCAPE
     ======================================================= */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =======================================================
     CERTIFICATE DATA
     ======================================================= */

  const certificates = [
    {
      title: "AI & Machine Learning",
      category: "technology",
      description:
        "Technology and artificial intelligence learning credential.",
      file: null
    },

    {
      title: "Computer Vision",
      category: "technology",
      description:
        "Computer vision and intelligent image-analysis learning.",
      file: null
    },

    {
      title: "Research & Publication",
      category: "research",
      description:
        "Research-oriented academic development.",
      file: null
    },

    {
      title: "Academic Development",
      category: "academic",
      description:
        "Academic and professional development credential.",
      file: null
    },

    {
      title: "Hackathon Mentoring",
      category: "mentoring",
      description:
        "Student innovation and hackathon mentoring.",
      file: null
    },

    {
      title: "Drone Technology Internship",
      category: "internship",
      description:
        "45-day Indian Space Lab drone technology internship.",
      file: null
    },

    {
      title: "Reviewer Credential",
      category: "review",
      description:
        "Research review and academic service credential.",
      file: null
    }
  ];


  /* =======================================================
     CERTIFICATE SYSTEM
     ======================================================= */

  function initCertificates() {
    const grid = $("#certGrid");
    const empty = $("#certEmpty");
    const search = $("#certSearch");
    const filters = $$(".filter");

    if (!grid) return;

    let currentFilter = "all";
    let searchTerm = "";

    const render = () => {
      const filtered =
        certificates.filter((certificate) => {
          const categoryMatch =
            currentFilter === "all" ||
            certificate.category === currentFilter;

          const searchable =
            `${certificate.title}
             ${certificate.description}
             ${certificate.category}`
              .toLowerCase();

          const searchMatch =
            !searchTerm ||
            searchable.includes(searchTerm);

          return categoryMatch && searchMatch;
        });

      grid.innerHTML = "";

      filtered.forEach((certificate) => {
        const card =
          document.createElement("article");

        card.className =
          "certificate-card reveal";

        card.innerHTML = `
          <div class="certificate-icon">
            ✓
          </div>

          <small>
            ${escapeHTML(
              certificate.category.toUpperCase()
            )}
          </small>

          <h3>
            ${escapeHTML(certificate.title)}
          </h3>

          <p>
            ${escapeHTML(
              certificate.description
            )}
          </p>
        `;

        if (certificate.file) {
          const link =
            document.createElement("a");

          link.href = certificate.file;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "text-button";
          link.textContent =
            "View credential ↗";

          card.appendChild(link);
        }

        grid.appendChild(card);
      });

      if (empty) {
        empty.hidden = filtered.length !== 0;
      }
    };

    filters.forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          currentFilter =
            button.dataset.filter || "all";

          filters.forEach((item) => {
            const active =
              item === button;

            item.classList.toggle(
              "active",
              active
            );

            item.setAttribute(
              "aria-selected",
              active ? "true" : "false"
            );
          });

          render();
        }
      );
    });

    if (search) {
      search.addEventListener(
        "input",
        () => {
          searchTerm =
            search.value
              .trim()
              .toLowerCase();

          render();
        }
      );
    }

    render();
  }


  /* =======================================================
     YEAR
     ======================================================= */

  function initYear() {
    const year = $("#year");

    if (!year) return;

    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     IMAGE ERROR SAFETY
     ======================================================= */

  function initImageSafety() {
    const images = $$("img");

    images.forEach((image) => {
      image.addEventListener(
        "error",
        () => {
          image.classList.add("image-error");
        }
      );
    });
  }


  /* =======================================================
     RESPONSIVE SAFEGUARDS
     ======================================================= */

  function initResponsiveSafeguards() {
    const check = () => {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`
      );
    };

    check();

    window.addEventListener(
      "resize",
      check,
      { passive: true }
    );
  }


  /* =======================================================
     INITIALIZE EVERYTHING
     ======================================================= */

  function init() {
    /*
     * Boot screen is initialized FIRST.
     * This is the most important fix.
     */

    initBootScreen();

    initNavigation();
    initNavbar();
    initScrollProgress();
    initReveal();
    initClock();
    initFocusText();
    initSmoothLinks();

    initResearchDomains();
    initResearchCanvas();
    initNeuralCanvas();

    initCursorGlow();
    initTilt();
    initMagneticButtons();

    initProjectModal();
    initCertificates();

    initYear();
    initImageSafety();
    initResponsiveSafeguards();

    document.documentElement.classList.add(
      "js-ready"
    );
  }


  /* =======================================================
     START
     ======================================================= */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
```
