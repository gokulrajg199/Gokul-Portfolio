```javascript
/* =========================================================
   G. GOKULRAJ PORTFOLIO
   FINAL INTERACTION ENGINE
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {
    bootDuration: 950,
    clockInterval: 1000,
    focusInterval: 2600,
    neuralParticlesDesktop: 55,
    neuralParticlesMobile: 28,
    neuralConnectionDistance: 135,
    tiltMax: 7,
    cursorEnabledWidth: 900
  };


  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


  /* =======================================================
     GLOBAL STATE
     ======================================================= */

  const state = {
    reducedMotion: prefersReducedMotion.matches,
    activeFilter: "all",
    searchTerm: "",
    activeModal: null,
    lastFocusedElement: null,
    animationFrame: null,
    resizeTimer: null
  };


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  function updateMotionPreference() {
    state.reducedMotion = prefersReducedMotion.matches;

    document.documentElement.classList.toggle(
      "reduced-motion",
      state.reducedMotion
    );
  }

  updateMotionPreference();

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener(
      "change",
      updateMotionPreference
    );
  }


  /* =======================================================
     BOOT SCREEN
     ======================================================= */

  function initBoot() {
    const boot = $("#boot");

    if (!boot) return;

    if (state.reducedMotion) {
      boot.classList.add("is-hidden");
      boot.setAttribute("aria-hidden", "true");
      return;
    }

    window.setTimeout(() => {
      boot.classList.add("is-hidden");

      window.setTimeout(() => {
        boot.setAttribute("aria-hidden", "true");
      }, 500);
    }, CONFIG.bootDuration);
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initNavigation() {
    const menuButton = $("#menuButton");
    const navLinks = $("#navLinks");

    if (!menuButton || !navLinks) return;

    const navItems = $$("a", navLinks);

    const closeMenu = () => {
      navLinks.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );
    };

    const toggleMenu = () => {
      const isOpen =
        navLinks.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );
    };

    menuButton.addEventListener(
      "click",
      toggleMenu
    );

    navItems.forEach((link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 900) {
          closeMenu();
        }
      }
    );
  }


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = $(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: state.reducedMotion
            ? "auto"
            : "smooth",
          block: "start"
        });

        history.replaceState(
          null,
          "",
          href
        );
      });
    });
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  function initScrollProgress() {
    const progress = $("#scrollProgress");

    if (!progress) return;

    let ticking = false;

    const update = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        documentHeight > 0
          ? (window.scrollY / documentHeight) * 100
          : 0;

      progress.style.width =
        `${clamp(percentage, 0, 100)}%`;

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }


  /* =======================================================
     NAVBAR SCROLL STATE
     ======================================================= */

  function initNavbarScroll() {
    const navbar = $("#navbar");

    if (!navbar) return;

    let ticking = false;

    const update = () => {
      navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
      );

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  function initRevealAnimations() {
    const elements = $$(".reveal");

    if (!elements.length) return;

    if (
      state.reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            obs.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px"
        }
      );

    elements.forEach((element) => {
      observer.observe(element);
    });
  }


  /* =======================================================
     CURSOR GLOW
     ======================================================= */

  function initCursorGlow() {
    const glow = $(".cursor-glow");

    if (!glow) return;

    const finePointer =
      window.matchMedia(
        "(pointer: fine)"
      ).matches;

    if (
      state.reducedMotion ||
      !finePointer ||
      window.innerWidth < CONFIG.cursorEnabledWidth
    ) {
      glow.style.display = "none";
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;

    window.addEventListener(
      "pointermove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      },
      { passive: true }
    );

    const animate = () => {
      currentX +=
        (mouseX - currentX) * 0.12;

      currentY +=
        (mouseY - currentY) * 0.12;

      glow.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate();
  }


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  function initMagneticButtons() {
    if (
      state.reducedMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    $$(".magnetic").forEach((button) => {
      button.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            button.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          const moveX =
            clamp(
              x / 7,
              -8,
              8
            );

          const moveY =
            clamp(
              y / 7,
              -8,
              8
            );

          button.style.transform =
            `translate3d(${moveX}px, ${moveY}px, 0)`;
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
     3D TILT CARDS
     ======================================================= */

  function initTiltCards() {
    if (
      state.reducedMotion ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    $$(".tilt").forEach((card) => {
      card.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;

          const rotateY =
            (x - 0.5) *
            CONFIG.tiltMax;

          const rotateX =
            (0.5 - y) *
            CONFIG.tiltMax;

          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateZ(0)`;
        }
      );

      card.addEventListener(
        "pointerleave",
        () => {
          card.style.transform = "";
        }
      );
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
        now.toLocaleTimeString(
          "en-IN",
          {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }
        );
    };

    updateClock();

    window.setInterval(
      updateClock,
      CONFIG.clockInterval
    );
  }


  /* =======================================================
     FOCUS ROTATOR
     ======================================================= */

  function initFocusRotator() {
    const target = $("#focusText");

    if (!target) return;

    const focusItems = [
      "COMPUTER VISION",
      "ARTIFICIAL INTELLIGENCE",
      "SMART AGRICULTURE",
      "INTERNET OF THINGS",
      "ROBOTICS",
      "AGENTIC AI",
      "RESEARCH & INNOVATION"
    ];

    if (state.reducedMotion) {
      target.textContent = focusItems[0];
      return;
    }

    let index = 0;

    window.setInterval(() => {
      index =
        (index + 1) %
        focusItems.length;

      target.classList.add(
        "focus-changing"
      );

      window.setTimeout(() => {
        target.textContent =
          focusItems[index];

        target.classList.remove(
          "focus-changing"
        );
      }, 180);

    }, CONFIG.focusInterval);
  }


  /* =======================================================
     NEURAL BACKGROUND CANVAS
     ======================================================= */

  function initNeuralCanvas() {
    const canvas =
      $("#neuralCanvas");

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d", {
        alpha: true
      });

    if (!ctx) return;

    const particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const getParticleCount = () =>
      window.innerWidth <= 700
        ? CONFIG.neuralParticlesMobile
        : CONFIG.neuralParticlesDesktop;

    function resize() {
      dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        Math.floor(width * dpr);

      canvas.height =
        Math.floor(height * dpr);

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      createParticles();
    }

    function createParticles() {
      particles.length = 0;

      const count =
        getParticleCount();

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx:
            (Math.random() - 0.5) *
            0.28,
          vy:
            (Math.random() - 0.5) *
            0.28,
          radius:
            Math.random() * 1.5 +
            0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      if (state.reducedMotion) {
        drawStaticParticles();
        return;
      }

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          particle.x < -20 ||
          particle.x > width + 20
        ) {
          particle.vx *= -1;
        }

        if (
          particle.y < -20 ||
          particle.y > height + 20
        ) {
          particle.vy *= -1;
        }
      }

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const a = particles[i];

        ctx.beginPath();

        ctx.arc(
          a.x,
          a.y,
          a.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(150, 180, 255, 0.35)";

        ctx.fill();

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const b =
            particles[j];

          const dx =
            a.x - b.x;

          const dy =
            a.y - b.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            CONFIG.neuralConnectionDistance
          ) {
            const opacity =
              1 -
              distance /
              CONFIG.neuralConnectionDistance;

            ctx.beginPath();

            ctx.moveTo(
              a.x,
              a.y
            );

            ctx.lineTo(
              b.x,
              b.y
            );

            ctx.strokeStyle =
              `rgba(120, 160, 255, ${opacity * 0.10})`;

            ctx.lineWidth = 0.7;

            ctx.stroke();
          }
        }
      }

      state.animationFrame =
        requestAnimationFrame(draw);
    }

    function drawStaticParticles() {
      for (const particle of particles) {
        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(150, 180, 255, 0.25)";

        ctx.fill();
      }
    }

    resize();

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(
          state.resizeTimer
        );

        state.resizeTimer =
          setTimeout(
            resize,
            150
          );
      }
    );

    draw();
  }


  /* =======================================================
     RESEARCH GRAPH
     ======================================================= */

  const researchDomains = {
    AI: {
      title:
        "Artificial Intelligence",
      text:
        "Machine learning, deep learning and intelligent decision systems for practical applications.",
      tags: [
        "Machine Learning",
        "Deep Learning",
        "AI Systems"
      ]
    },

    "Computer Vision": {
      title:
        "Computer Vision",
      text:
        "Computer vision workflows for object detection, person detection, monitoring and intelligent automation.",
      tags: [
        "YOLOv8",
        "Object Detection",
        "Deep Learning"
      ]
    },

    IoT: {
      title:
        "Internet of Things",
      text:
        "Connected sensing, monitoring and automation architectures for practical smart-system applications.",
      tags: [
        "Sensors",
        "MQTT",
        "Automation"
      ]
    },

    Robotics: {
      title:
        "Robotics",
      text:
        "ROS and ROS2-oriented robotics learning, development and student project experimentation.",
      tags: [
        "ROS",
        "ROS2",
        "Autonomous Systems"
      ]
    },

    "Smart Agriculture": {
      title:
        "Smart Agriculture",
      text:
        "IoT-enabled agriculture research focused on hydroponics, environmental monitoring and intelligent alerts.",
      tags: [
        "Hydroponics",
        "Smart Farming",
        "IoT"
      ]
    },

    "Agentic AI": {
      title:
        "Agentic AI",
      text:
        "Emerging work around intelligent agents, reasoning, curation and human-potential-oriented problem solving.",
      tags: [
        "Agents",
        "Reasoning",
        "AI"
      ]
    }
  };


  function initResearchGraph() {
    const canvas =
      $("#researchCanvas");

    const graph =
      $(".research-graph");

    if (!canvas || !graph) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    const nodes =
      $$(".graph-node", graph);

    let width = 0;
    let height = 0;

    function resize() {
      const rect =
        graph.getBoundingClientRect();

      width =
        Math.max(
          rect.width,
          300
        );

      height =
        Math.max(
          rect.height,
          500
        );

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      canvas.width =
        Math.floor(width * dpr);

      canvas.height =
        Math.floor(height * dpr);

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      draw();
    }

    function getNodeCenter(node) {
      const graphRect =
        graph.getBoundingClientRect();

      const rect =
        node.getBoundingClientRect();

      return {
        x:
          rect.left -
          graphRect.left +
          rect.width / 2,

        y:
          rect.top -
          graphRect.top +
          rect.height / 2
      };
    }

    function getCoreCenter() {
      const core =
        $(".graph-core", graph);

      if (!core) {
        return {
          x: width / 2,
          y: height / 2
        };
      }

      const graphRect =
        graph.getBoundingClientRect();

      const rect =
        core.getBoundingClientRect();

      return {
        x:
          rect.left -
          graphRect.left +
          rect.width / 2,

        y:
          rect.top -
          graphRect.top +
          rect.height / 2
      };
    }

    function draw() {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      const core =
        getCoreCenter();

      nodes.forEach((node) => {
        const point =
          getNodeCenter(node);

        ctx.beginPath();

        ctx.moveTo(
          core.x,
          core.y
        );

        ctx.lineTo(
          point.x,
          point.y
        );

        ctx.strokeStyle =
          "rgba(130, 160, 255, 0.13)";

        ctx.lineWidth = 1;

        ctx.stroke();
      });

      nodes.forEach((node) => {
        const point =
          getNodeCenter(node);

        ctx.beginPath();

        ctx.arc(
          point.x,
          point.y,
          3,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(160, 190, 255, 0.55)";

        ctx.fill();
      });
    }

    function updateDomain(domain) {
      const data =
        researchDomains[domain];

      if (!data) return;

      const title =
        $("#domainTitle");

      const text =
        $("#domainText");

      const tags =
        $("#domainTags");

      if (title) {
        title.textContent =
          data.title;
      }

      if (text) {
        text.textContent =
          data.text;
      }

      if (tags) {
        tags.innerHTML = "";

        data.tags.forEach((tag) => {
          const element =
            document.createElement(
              "span"
            );

          element.textContent =
            tag;

          tags.appendChild(
            element
          );
        });
      }

      nodes.forEach((node) => {
        node.classList.toggle(
          "active",
          node.dataset.domain === domain
        );

        node.setAttribute(
          "aria-pressed",
          String(
            node.dataset.domain ===
            domain
          )
        );
      });
    }

    nodes.forEach((node) => {
      node.setAttribute(
        "aria-pressed",
        "false"
      );

      node.addEventListener(
        "click",
        () => {
          updateDomain(
            node.dataset.domain
          );

          node.animate(
            [
              {
                transform:
                  "scale(1)"
              },
              {
                transform:
                  "scale(1.12)"
              },
              {
                transform:
                  "scale(1)"
              }
            ],
            {
              duration:
                state.reducedMotion
                  ? 0
                  : 420,
              easing:
                "ease-out"
            }
          );
        }
      );
    });

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(
          state.resizeTimer
        );

        state.resizeTimer =
          setTimeout(
            resize,
            120
          );
      }
    );

    resize();

    updateDomain("AI");
  }


  /* =======================================================
     PROJECT MODAL DATA
     ======================================================= */

  const projects = {

    hydro: {
      category:
        "SMART AGRICULTURE",
      title:
        "Hydroponic Nutrition Alert System",
      description:
        "A smart agriculture research system focused on monitoring hydroponic plant-growth conditions using connected sensors and intelligent alerts.",
      details: [
        "pH monitoring",
        "EC and TDS monitoring",
        "Temperature and humidity sensing",
        "Arduino / ESP32-oriented architecture",
        "GSM alerting",
        "Relay and pump automation",
        "Dashboard visualization",
        "Proposed predictive-analysis layer"
      ],
      tags: [
        "IoT",
        "Arduino",
        "ESP32",
        "GSM",
        "Machine Learning"
      ]
    },

    vision: {
      category:
        "COMPUTER VISION",
      title:
        "AI-Based Detection Systems",
      description:
        "Computer vision workflows using YOLO/YOLOv8 concepts for object and person detection, monitoring and automation.",
      details: [
        "YOLO / YOLOv8",
        "Object detection",
        "Person detection",
        "Python-based workflows",
        "Deep learning",
        "Real-time monitoring direction"
      ],
      tags: [
        "YOLOv8",
        "Python",
        "Computer Vision",
        "Deep Learning"
      ]
    },

    attendance: {
      category:
        "AI AUTOMATION",
      title:
        "Faculty Attendance System",
      description:
        "An AI/computer-vision project direction for person detection and attendance-oriented automation.",
      details: [
        "Person detection",
        "Computer vision",
        "YOLO-oriented workflow",
        "Attendance automation",
        "AI-assisted monitoring"
      ],
      tags: [
        "AI",
        "YOLO",
        "Python",
        "Computer Vision"
      ]
    },

    timetable: {
      category:
        "ACADEMIC SOFTWARE",
      title:
        "SRIT Timetable ERP",
      description:
        "An academic scheduling system direction designed around practical timetable-management challenges.",
      details: [
        "Faculty clash engine",
        "Room and lab optimization",
        "Continuous period scheduling",
        "Academic timetable management",
        "Excel export",
        "Streamlit-oriented application"
      ],
      tags: [
        "Python",
        "Streamlit",
        "Scheduling",
        "ERP"
      ]
    },

    aura: {
      category:
        "AGENTIC AI",
      title:
        "Project AURA — Agentic AI Curator",
      description:
        "An agentic AI concept centered around intelligent curation, reasoning and human-potential-oriented problem solving.",
      details: [
        "Agentic AI",
        "Intelligent curation",
        "Reasoning workflows",
        "Human-potential focus",
        "Innovation-oriented problem solving"
      ],
      tags: [
        "Agents",
        "AI",
        "Reasoning",
        "Innovation"
      ]
    },

    ros: {
      category:
        "ROBOTICS",
      title:
        "ROS Robotics Projects",
      description:
        "Robotics learning and project development using ROS/ROS2-oriented workflows and practical student innovation.",
      details: [
        "ROS",
        "ROS2",
        "Robotics development",
        "Autonomous-system concepts",
        "Student project mentoring"
      ],
      tags: [
        "ROS",
        "ROS2",
        "Robotics"
      ]
    }
  };


  /* =======================================================
     MODAL
     ======================================================= */

  function initModal() {
    const modal =
      $("#modal");

    const content =
      $("#modalContent");

    if (!modal || !content) return;

    const closeButton =
      $(".modal-close", modal);

    const backdrop =
      $(".modal-backdrop", modal);

    function openModal(key) {
      const data =
        projects[key];

      if (!data) return;

      state.activeModal =
        key;

      state.lastFocusedElement =
        document.activeElement;

      content.innerHTML = `
        <span class="label">
          ${escapeHTML(data.category)}
        </span>

        <h2 id="modalTitle">
          ${escapeHTML(data.title)}
        </h2>

        <p>
          ${escapeHTML(data.description)}
        </p>

        <div class="modal-details">
          ${data.details
            .map(
              (item) =>
                `<div>
                  <span>✓</span>
                  <b>${escapeHTML(item)}</b>
                </div>`
            )
            .join("")}
        </div>

        <div class="tags modal-tags">
          ${data.tags
            .map(
              (tag) =>
                `<i>${escapeHTML(tag)}</i>`
            )
            .join("")}
        </div>
      `;

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "modal-open"
      );

      if (closeButton) {
        window.setTimeout(
          () => closeButton.focus(),
          50
        );
      }
    }

    function closeModal() {
      if (!modal.classList.contains("open")) {
        return;
      }

      modal.classList.remove(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.classList.remove(
        "modal-open"
      );

      state.activeModal =
        null;

      if (
        state.lastFocusedElement &&
        typeof state.lastFocusedElement.focus ===
          "function"
      ) {
        state.lastFocusedElement.focus();
      }
    }

    $$(".project-open").forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            openModal(
              button.dataset.project
            );
          }
        );
      }
    );

    $$(
      ".project-card[data-project]"
    ).forEach((card) => {
      card.addEventListener(
        "click",
        (event) => {
          if (
            event.target.closest(
              "button, a"
            )
          ) {
            return;
          }

          const key =
            card.dataset.project;

          if (key) {
            openModal(key);
          }
        }
      );
    });

    $$(
      "[data-close]",
      modal
    ).forEach((element) => {
      element.addEventListener(
        "click",
        closeModal
      );
    });

    if (closeButton) {
      closeButton.addEventListener(
        "click",
        closeModal
      );
    }

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape"
        ) {
          closeModal();
        }

        if (
          event.key === "Tab" &&
          modal.classList.contains("open")
        ) {
          trapFocus(
            modal,
            event
          );
        }
      }
    );
  }


  /* =======================================================
     HTML ESCAPE
     ======================================================= */

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  /* =======================================================
     MODAL FOCUS TRAP
     ======================================================= */

  function trapFocus(
    container,
    event
  ) {
    const focusable =
      $$(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        container
      ).filter(
        (element) =>
          !element.hasAttribute(
            "disabled"
          ) &&
          element.offsetParent !==
            null
      );

    if (!focusable.length) return;

    const first =
      focusable[0];

    const last =
      focusable[
        focusable.length - 1
      ];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    }

    if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }


  /* =======================================================
     CERTIFICATE DATA
     ======================================================= */

  /*
    IMPORTANT:
    Static GitHub Pages cannot automatically list every file
    inside assets/certificates/.

    The array below is intentionally empty unless certificate
    metadata is supplied. This prevents the portfolio from
    inventing certificate names or broken file paths.

    Add each real certificate here when its exact filename is
    known.
  */

  const certificates = [

    /*
    Example:

    {
      title: "Certificate Name",
      organization: "Organization",
      year: "2026",
      category: "technology",
      file: "assets/certificates/example.pdf"
    }

    Valid categories:
    research
    technology
    academic
    mentoring
    internship
    review
    */

  ];


  /* =======================================================
     CERTIFICATE RENDERING
     ======================================================= */

  function initCertificates() {
    const grid =
      $("#certGrid");

    const empty =
      $("#certEmpty");

    const search =
      $("#certSearch");

    const filters =
      $$(".filter");

    if (!grid) return;

    function normalize(value) {
      return String(value || "")
        .trim()
        .toLowerCase();
    }

    function matchesCertificate(
      certificate
    ) {
      const filterMatches =
        state.activeFilter ===
          "all" ||
        normalize(
          certificate.category
        ) ===
          normalize(
            state.activeFilter
          );

      if (!filterMatches) {
        return false;
      }

      if (!state.searchTerm) {
        return true;
      }

      const searchable = [
        certificate.title,
        certificate.organization,
        certificate.year,
        certificate.category
      ]
        .map(normalize)
        .join(" ");

      return searchable.includes(
        state.searchTerm
      );
    }

    function render() {
      const visible =
        certificates.filter(
          matchesCertificate
        );

      grid.innerHTML = "";

      visible.forEach(
        (certificate, index) => {
          const card =
            document.createElement(
              "article"
            );

          card.className =
            "certificate-card reveal visible";

          card.innerHTML = `
            <div class="certificate-index">
              ${String(
                index + 1
              ).padStart(2, "0")}
            </div>

            <div class="certificate-content">

              <small>
                ${escapeHTML(
                  String(
                    certificate.category ||
                      "CREDENTIAL"
                  ).toUpperCase()
                )}
              </small>

              <h3>
                ${escapeHTML(
                  certificate.title
                )}
              </h3>

              <p>
                ${escapeHTML(
                  certificate.organization ||
                    ""
                )}
              </p>

              <div class="certificate-meta">

                ${
                  certificate.year
                    ? `<span>${escapeHTML(
                        certificate.year
                      )}</span>`
                    : ""
                }

                ${
                  certificate.category
                    ? `<span>${escapeHTML(
                        certificate.category
                      )}</span>`
                    : ""
                }

              </div>

              ${
                certificate.file
                  ? `
                    <a
                      class="text-button"
                      href="${escapeAttribute(
                        certificate.file
                      )}"
                      target="_blank"
                      rel="noopener"
                    >
                      View credential ↗
                    </a>
                  `
                  : ""
              }

            </div>
          `;

          grid.appendChild(card);
        }
      );

      if (empty) {
        empty.hidden =
          visible.length !== 0;
      }
    }

    function updateFilterButtons() {
      filters.forEach(
        (button) => {
          const active =
            button.dataset.filter ===
            state.activeFilter;

          button.classList.toggle(
            "active",
            active
          );

          button.setAttribute(
            "aria-selected",
            String(active)
          );
        }
      );
    }

    filters.forEach(
      (button) => {
        button.setAttribute(
          "role",
          "tab"
        );

        button.addEventListener(
          "click",
          () => {
            state.activeFilter =
              button.dataset.filter ||
              "all";

            updateFilterButtons();
            render();
          }
        );
      }
    );

    if (search) {
      search.addEventListener(
        "input",
        () => {
          state.searchTerm =
            normalize(
              search.value
            );

          render();
        }
      );
    }

    updateFilterButtons();
    render();
  }


  /* =======================================================
     ATTRIBUTE ESCAPE
     ======================================================= */

  function escapeAttribute(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }


  /* =======================================================
     ACTIVE SECTION NAVIGATION
     ======================================================= */

  function initActiveNavigation() {
    const sections =
      $$("main section[id]");

    const navLinks =
      $$(".links a[href^='#']");

    if (
      !sections.length ||
      !navLinks.length ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;

              navLinks.forEach(
                (link) => {
                  const active =
                    link.getAttribute(
                      "href"
                    ) === `#${id}`;

                  link.classList.toggle(
                    "active",
                    active
                  );
                }
              );
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );

    sections.forEach(
      (section) =>
        observer.observe(section)
    );
  }


  /* =======================================================
     IMAGE ERROR SAFEGUARD
     ======================================================= */

  function initImageSafeguards() {
    $$("img").forEach(
      (image) => {
        image.addEventListener(
          "error",
          () => {
            image.classList.add(
              "image-error"
            );

            image.setAttribute(
              "data-load-error",
              "true"
            );
          }
        );
      }
    );
  }


  /* =======================================================
     EXTERNAL LINK SAFEGUARD
     ======================================================= */

  function initExternalLinks() {
    $$(
      'a[target="_blank"]'
    ).forEach((link) => {
      const rel =
        link.getAttribute(
          "rel"
        ) || "";

      const values =
        new Set(
          rel
            .split(/\s+/)
            .filter(Boolean)
        );

      values.add("noopener");
      values.add("noreferrer");

      link.setAttribute(
        "rel",
        Array.from(values).join(" ")
      );
    });
  }


  /* =======================================================
     YEAR
     ======================================================= */

  function initYear() {
    const year =
      $("#year");

    if (!year) return;

    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     PAGE VISIBILITY
     ======================================================= */

  function initVisibilityOptimization() {
    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.hidden &&
          state.animationFrame
        ) {
          cancelAnimationFrame(
            state.animationFrame
          );

          state.animationFrame =
            null;
        }
      }
    );
  }


  /* =======================================================
     PERFORMANCE SAFEGUARDS
     ======================================================= */

  function initPerformanceGuards() {
    if (
      window.innerWidth <= 700
    ) {
      document.documentElement.classList.add(
        "mobile-device"
      );
    }

    if (
      navigator.connection &&
      navigator.connection.saveData
    ) {
      document.documentElement.classList.add(
        "save-data"
      );
    }
  }


  /* =======================================================
     INITIALIZATION
     ======================================================= */

  function init() {

    initBoot();

    initNavigation();

    initSmoothAnchors();

    initScrollProgress();

    initNavbarScroll();

    initRevealAnimations();

    initCursorGlow();

    initMagneticButtons();

    initTiltCards();

    initClock();

    initFocusRotator();

    initNeuralCanvas();

    initResearchGraph();

    initModal();

    initCertificates();

    initActiveNavigation();

    initImageSafeguards();

    initExternalLinks();

    initYear();

    initVisibilityOptimization();

    initPerformanceGuards();

    document.documentElement.classList.add(
      "js-ready"
    );
  }


  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }

})();
```
