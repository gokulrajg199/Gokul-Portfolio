```javascript
/* =========================================================
   G. GOKULRAJ — PORTFOLIO
   COMPLETE SCRIPT.JS
   Certificate system + navigation + animations + modal
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const safeText = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");


  /* =======================================================
     CERTIFICATE DATA
     
     IMPORTANT:
     Certificate files are loaded from:
     assets/certificates/
     
     Update only the "file" value when a filename differs.
     ======================================================= */

  const certificates = [
    {
      title: "AI / Machine Learning Certificate",
      issuer: "AI & Research",
      category: "research",
      year: "2026",
      file: "assets/certificates/ai-machine-learning.pdf"
    },

    {
      title: "Artificial Intelligence Certificate",
      issuer: "Artificial Intelligence",
      category: "technology",
      year: "2026",
      file: "assets/certificates/artificial-intelligence.pdf"
    },

    {
      title: "Computer Vision Certificate",
      issuer: "Computer Vision",
      category: "technology",
      year: "2026",
      file: "assets/certificates/computer-vision.pdf"
    },

    {
      title: "Deep Learning Certificate",
      issuer: "Deep Learning",
      category: "research",
      year: "2026",
      file: "assets/certificates/deep-learning.pdf"
    },

    {
      title: "IoT Certificate",
      issuer: "Internet of Things",
      category: "technology",
      year: "2026",
      file: "assets/certificates/iot.pdf"
    },

    {
      title: "Robotics / ROS Certificate",
      issuer: "Robotics",
      category: "technology",
      year: "2026",
      file: "assets/certificates/robotics-ros.pdf"
    },

    {
      title: "Research Certificate",
      issuer: "Research & Innovation",
      category: "research",
      year: "2026",
      file: "assets/certificates/research.pdf"
    },

    {
      title: "Faculty Development Certificate",
      issuer: "Academic Development",
      category: "academic",
      year: "2026",
      file: "assets/certificates/faculty-development.pdf"
    },

    {
      title: "Hackathon Mentoring Certificate",
      issuer: "Hackathon",
      category: "mentoring",
      year: "2026",
      file: "assets/certificates/hackathon-mentoring.pdf"
    },

    {
      title: "Internship Certificate",
      issuer: "Indian Space Lab",
      category: "internship",
      year: "2026",
      file: "assets/certificates/indian-space-lab.pdf"
    },

    {
      title: "Reviewer Certificate",
      issuer: "Academic / Research Review",
      category: "review",
      year: "2026",
      file: "assets/certificates/reviewer.pdf"
    }
  ];


  /* =======================================================
     CERTIFICATE PATH NORMALIZER
     
     This allows filenames containing spaces to work correctly.
     ======================================================= */

  function certificateURL(file) {
    if (!file) return "#";

    const parts = file.split("/");

    const encoded = parts
      .map((part, index) =>
        index === 0
          ? part
          : encodeURIComponent(part)
      )
      .join("/");

    return encoded;
  }


  /* =======================================================
     CERTIFICATE RENDERING
     ======================================================= */

  const certGrid = $("#certGrid");
  const certEmpty = $("#certEmpty");
  const certSearch = $("#certSearch");
  const filterButtons = $$(".filter");

  let activeCertificateFilter = "all";


  function getFilteredCertificates() {
    const searchTerm =
      (certSearch?.value || "")
        .trim()
        .toLowerCase();

    return certificates.filter((cert) => {

      const categoryMatch =
        activeCertificateFilter === "all" ||
        cert.category === activeCertificateFilter;

      const searchMatch =
        !searchTerm ||
        cert.title.toLowerCase().includes(searchTerm) ||
        cert.issuer.toLowerCase().includes(searchTerm) ||
        cert.category.toLowerCase().includes(searchTerm) ||
        cert.year.toLowerCase().includes(searchTerm);

      return categoryMatch && searchMatch;
    });
  }


  function renderCertificates() {

    if (!certGrid) return;

    const results = getFilteredCertificates();

    certGrid.innerHTML = "";

    if (!results.length) {

      if (certEmpty) {
        certEmpty.hidden = false;
      }

      return;
    }

    if (certEmpty) {
      certEmpty.hidden = true;
    }


    results.forEach((cert, index) => {

      const card = document.createElement("article");

      card.className = "cert-card reveal";

      card.style.setProperty(
        "--cert-index",
        index
      );


      const url = certificateURL(cert.file);


      card.innerHTML = `
        <div class="cert-card-top">

          <span class="cert-number">
            ${String(index + 1).padStart(2, "0")}
          </span>

          <span class="cert-category">
            ${safeText(cert.category)}
          </span>

        </div>

        <div class="cert-icon">
          ✦
        </div>

        <div class="cert-content">

          <small>
            ${safeText(cert.year)}
          </small>

          <h3>
            ${safeText(cert.title)}
          </h3>

          <p>
            ${safeText(cert.issuer)}
          </p>

        </div>

        <a
          class="cert-open"
          href="${url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${safeText(cert.title)}"
        >
          View Certificate ↗
        </a>
      `;


      certGrid.appendChild(card);
    });


    requestAnimationFrame(() => {
      $$(".cert-card", certGrid)
        .forEach(card => card.classList.add("visible"));
    });
  }


  /* =======================================================
     CERTIFICATE FILTERS
     ======================================================= */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      activeCertificateFilter =
        button.dataset.filter || "all";


      filterButtons.forEach(btn => {

        const active =
          btn === button;

        btn.classList.toggle(
          "active",
          active
        );

        btn.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );
      });


      renderCertificates();
    });
  });


  /* =======================================================
     CERTIFICATE SEARCH
     ======================================================= */

  if (certSearch) {

    certSearch.addEventListener(
      "input",
      renderCertificates
    );
  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuButton = $("#menuButton");
  const navLinks = $("#navLinks");

  if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      navLinks.classList.toggle(
        "open",
        !isOpen
      );

      document.body.classList.toggle(
        "menu-open",
        !isOpen
      );
    });


    $$("#navLinks a").forEach(link => {

      link.addEventListener("click", () => {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        navLinks.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );
      });
    });
  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const scrollProgress =
    $("#scrollProgress");


  function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;
  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );


  /* =======================================================
     NAVBAR SCROLL STATE
     ======================================================= */

  const navbar = $("#navbar");

  function updateNavbar() {

    if (!navbar) return;

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  const revealElements =
    $$(".reveal");


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      element =>
        revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add("visible")
    );
  }


  /* =======================================================
     LIVE CLOCK
     ======================================================= */

  const clock = $("#clock");

  function updateClock() {

    if (!clock) return;

    const now = new Date();

    clock.textContent =
      now.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }
      );
  }


  updateClock();

  setInterval(
    updateClock,
    1000
  );


  /* =======================================================
     ROTATING RESEARCH FOCUS
     ======================================================= */

  const focusText =
    $("#focusText");

  const focusWords = [
    "COMPUTER VISION",
    "ARTIFICIAL INTELLIGENCE",
    "SMART AGRICULTURE",
    "ROBOTICS",
    "INTERNET OF THINGS",
    "AGENTIC AI"
  ];

  let focusIndex = 0;


  function rotateFocus() {

    if (!focusText) return;

    focusIndex =
      (focusIndex + 1) %
      focusWords.length;

    focusText.classList.add(
      "focus-changing"
    );

    setTimeout(() => {

      focusText.textContent =
        focusWords[focusIndex];

      focusText.classList.remove(
        "focus-changing"
      );

    }, 180);
  }


  setInterval(
    rotateFocus,
    3200
  );


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
        "AI-powered visual understanding, object detection and intelligent monitoring systems.",
      tags: [
        "YOLOv8",
        "Object Detection",
        "Deep Learning"
      ]
    },

    IoT: {
      title: "Internet of Things",
      text:
        "Connected sensing, automation and intelligent monitoring for real-world systems.",
      tags: [
        "ESP32",
        "Arduino",
        "Sensors"
      ]
    },

    Robotics: {
      title: "Robotics",
      text:
        "ROS and ROS2-oriented robotics development, learning and student innovation.",
      tags: [
        "ROS",
        "ROS2",
        "Autonomous Systems"
      ]
    },

    "Smart Agriculture": {
      title: "Smart Agriculture",
      text:
        "IoT-enabled agriculture systems combining sensors, automation and predictive intelligence.",
      tags: [
        "Hydroponics",
        "IoT",
        "Smart Farming"
      ]
    },

    "Agentic AI": {
      title: "Agentic AI",
      text:
        "Intelligent agents capable of reasoning, orchestration and goal-oriented problem solving.",
      tags: [
        "Agents",
        "Reasoning",
        "Automation"
      ]
    }
  };


  const domainTitle =
    $("#domainTitle");

  const domainText =
    $("#domainText");

  const domainTags =
    $("#domainTags");


  function updateResearchDomain(
    domain
  ) {

    const data =
      researchDomains[domain];

    if (!data) return;

    if (domainTitle)
      domainTitle.textContent =
        data.title;

    if (domainText)
      domainText.textContent =
        data.text;

    if (domainTags) {

      domainTags.innerHTML =
        data.tags
          .map(tag =>
            `<span>${safeText(tag)}</span>`
          )
          .join("");
    }
  }


  $$(".graph-node").forEach(node => {

    node.addEventListener(
      "click",
      () => {

        const domain =
          node.dataset.domain;

        updateResearchDomain(
          domain
        );

        $$(".graph-node")
          .forEach(item =>
            item.classList.toggle(
              "active",
              item === node
            )
          );
      }
    );
  });


  /* =======================================================
     PROJECT MODAL
     ======================================================= */

  const modal =
    $("#modal");

  const modalContent =
    $("#modalContent");


  const projects = {

    hydro: {
      title:
        "Hydroponic Nutrition Alert System",
      category:
        "SMART AGRICULTURE",
      text:
        "Sensor-driven monitoring architecture for pH, EC, TDS, temperature and humidity with intelligent alerts, automation and predictive analysis.",
      tags: [
        "IoT",
        "Arduino",
        "GSM",
        "Machine Learning"
      ]
    },

    vision: {
      title:
        "AI-Based Detection Systems",
      category:
        "COMPUTER VISION",
      text:
        "YOLO/YOLOv8-oriented computer vision workflows for intelligent detection, monitoring and automation applications.",
      tags: [
        "YOLOv8",
        "Python",
        "Computer Vision",
        "Deep Learning"
      ]
    },

    attendance: {
      title:
        "Faculty Attendance System",
      category:
        "AI AUTOMATION",
      text:
        "Computer-vision-based person detection and attendance-oriented automation.",
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
      text:
        "Smart scheduling system designed around faculty clash handling, room/lab optimization, continuous-period scheduling and Excel export.",
      tags: [
        "Python",
        "Streamlit",
        "Scheduling"
      ]
    },

    aura: {
      title:
        "Project AURA — Agentic AI Curator",
      category:
        "AGENTIC AI",
      text:
        "Agentic AI concept focused on intelligent curation, reasoning and human-potential-oriented problem solving.",
      tags: [
        "Agents",
        "AI",
        "Reasoning"
      ]
    },

    ros: {
      title:
        "ROS Robotics Projects",
      category:
        "ROBOTICS",
      text:
        "Practical robotics learning and project development through ROS/ROS2-oriented workflows and student innovation.",
      tags: [
        "ROS",
        "ROS2",
        "Robotics"
      ]
    }
  };


  function openModal(projectKey) {

    if (!modal || !modalContent) return;

    const project =
      projects[projectKey];

    if (!project) return;


    modalContent.innerHTML = `

      <span class="label">
        ${safeText(project.category)}
      </span>

      <h2 id="modalTitle">
        ${safeText(project.title)}
      </h2>

      <p>
        ${safeText(project.text)}
      </p>

      <div class="tags">
        ${project.tags
          .map(tag =>
            `<span>${safeText(tag)}</span>`
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


    const closeButton =
      $(".modal-close", modal);

    closeButton?.focus();
  }


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );
  }


  $$(".project-open").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        openModal(
          button.dataset.project
        );
      }
    );
  });


  $$("[data-close]").forEach(
    element => {

      element.addEventListener(
        "click",
        closeModal
      );
    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal?.classList.contains("open")
      ) {
        closeModal();
      }
    }
  );


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (!prefersReducedMotion) {

    $$(".magnetic").forEach(button => {

      button.addEventListener(
        "pointermove",
        event => {

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

          button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;
        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform =
            "";
        }
      );
    });
  }


  /* =======================================================
     TILT CARDS
     ======================================================= */

  if (!prefersReducedMotion) {

    $$(".tilt").forEach(card => {

      card.addEventListener(
        "pointermove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) *
            -5;

          const rotateY =
            ((x / rect.width) - 0.5) *
            5;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateZ(0)`;
        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";
        }
      );
    });
  }


  /* =======================================================
     CURSOR GLOW
     ======================================================= */

  const cursorGlow =
    $(".cursor-glow");


  if (
    cursorGlow &&
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    window.addEventListener(
      "pointermove",
      event => {

        cursorGlow.style.left =
          `${event.clientX}px`;

        cursorGlow.style.top =
          `${event.clientY}px`;
      },
      { passive: true }
    );
  }


  /* =======================================================
     NEURAL CANVAS
     ======================================================= */

  const neuralCanvas =
    $("#neuralCanvas");


  function initializeNeuralCanvas() {

    if (!neuralCanvas) return;

    const ctx =
      neuralCanvas.getContext("2d");

    if (!ctx) return;


    const particles = [];

    const particleCount =
      window.innerWidth < 700
        ? 28
        : 55;


    function resize() {

      const ratio =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      neuralCanvas.width =
        window.innerWidth * ratio;

      neuralCanvas.height =
        window.innerHeight * ratio;

      neuralCanvas.style.width =
        `${window.innerWidth}px`;

      neuralCanvas.style.height =
        `${window.innerHeight}px`;

      ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    }


    resize();

    window.addEventListener(
      "resize",
      resize
    );


    for (
      let i = 0;
      i < particleCount;
      i++
    ) {

      particles.push({
        x:
          Math.random() *
          window.innerWidth,

        y:
          Math.random() *
          window.innerHeight,

        vx:
          (Math.random() - 0.5) *
          0.25,

        vy:
          (Math.random() - 0.5) *
          0.25,

        r:
          Math.random() * 1.6 +
          0.5
      });
    }


    function draw() {

      if (
        prefersReducedMotion
      ) {
        return;
      }


      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );


      particles.forEach(
        particle => {

          particle.x +=
            particle.vx;

          particle.y +=
            particle.vy;


          if (
            particle.x < -20 ||
            particle.x >
              window.innerWidth + 20
          ) {
            particle.vx *= -1;
          }


          if (
            particle.y < -20 ||
            particle.y >
              window.innerHeight + 20
          ) {
            particle.vy *= -1;
          }


          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.r,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(120,180,255,.35)";

          ctx.fill();
        }
      );


      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {

          const a =
            particles[i];

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


          if (distance < 120) {

            const opacity =
              (1 - distance / 120) *
              0.12;

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
              `rgba(120,180,255,${opacity})`;

            ctx.lineWidth =
              0.7;

            ctx.stroke();
          }
        }
      }


      requestAnimationFrame(
        draw
      );
    }


    draw();
  }


  /* =======================================================
     RESEARCH CANVAS
     ======================================================= */

  const researchCanvas =
    $("#researchCanvas");


  function initializeResearchCanvas() {

    if (!researchCanvas) return;

    const ctx =
      researchCanvas.getContext("2d");

    if (!ctx) return;


    function resize() {

      const rect =
        researchCanvas.getBoundingClientRect();

      const ratio =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      researchCanvas.width =
        rect.width * ratio;

      researchCanvas.height =
        rect.height * ratio;

      ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    }


    resize();

    window.addEventListener(
      "resize",
      resize
    );


    function draw() {

      const rect =
        researchCanvas.getBoundingClientRect();

      ctx.clearRect(
        0,
        0,
        rect.width,
        rect.height
      );


      const cx =
        rect.width / 2;

      const cy =
        rect.height / 2;


      const nodes = [
        [cx * 0.55, cy * 0.45],
        [cx * 1.45, cy * 0.45],
        [cx * 0.38, cy * 1.35],
        [cx * 1.62, cy * 1.35],
        [cx * 0.70, cy * 1.70],
        [cx * 1.30, cy * 1.70]
      ];


      nodes.forEach(
        ([x, y]) => {

          ctx.beginPath();

          ctx.moveTo(
            cx,
            cy
          );

          ctx.lineTo(
            x,
            y
          );

          ctx.strokeStyle =
            "rgba(120,180,255,.12)";

          ctx.lineWidth =
            1;

          ctx.stroke();


          ctx.beginPath();

          ctx.arc(
            x,
            y,
            3,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(160,210,255,.5)";

          ctx.fill();
        }
      );
    }


    draw();
  }


  /* =======================================================
     BOOT SCREEN
     ======================================================= */

  const boot =
    $("#boot");


  function hideBoot() {

    if (!boot) return;

    setTimeout(() => {

      boot.classList.add(
        "hidden"
      );

      boot.setAttribute(
        "aria-hidden",
        "true"
      );

    }, 650);
  }


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const year =
    $("#year");

  if (year) {

    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  renderCertificates();

  updateScrollProgress();

  updateNavbar();

  initializeNeuralCanvas();

  initializeResearchCanvas();

  hideBoot();

})();
```
