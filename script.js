/* =========================================================
   GOKULRAJ G — PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const navShell = document.querySelector(".nav-shell");
  const menu = document.querySelector(".menu");
  const links = document.querySelector(".links");
  const scrollProgress = document.querySelector(".scroll-progress");
  const cursorGlow = document.querySelector(".cursor-glow");
  const neuralCanvas = document.getElementById("neuralCanvas");

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  if (menu && links) {
    menu.addEventListener("click", () => {
      links.classList.toggle("open");

      const expanded = links.classList.contains("open");
      menu.setAttribute("aria-expanded", expanded);
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  const updateNavbar = () => {
    if (!navShell) return;

    if (window.scrollY > 40) {
      navShell.classList.add("scrolled");
    } else {
      navShell.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();

  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const updateScrollProgress = () => {
    if (!scrollProgress) return;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0
        ? (window.scrollY / documentHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  window.addEventListener("resize", updateScrollProgress);

  updateScrollProgress();

  /* =======================================================
     ACTIVE NAVIGATION LINK
     ======================================================= */

  const navLinks = document.querySelectorAll(".links a");
  const sections = document.querySelectorAll("section[id]");

  const updateActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (
        currentSection &&
        href === `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  updateActiveLink();

  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }

  /* =======================================================
     MOUSE CURSOR GLOW
     ======================================================= */

  if (cursorGlow && window.matchMedia(
    "(pointer: fine)"
  ).matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    const animateGlow = () => {

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  }

  /* =======================================================
     3D TILT EFFECT
     ======================================================= */

  const tiltElements =
    document.querySelectorAll(".tilt");

  const enableTilt =
    window.matchMedia(
      "(pointer: fine)"
    ).matches &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (enableTilt) {

    tiltElements.forEach((element) => {

      element.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX =
            ((y - centerY) / centerY) * -4;

          const rotateY =
            ((x - centerX) / centerX) * 4;

          element.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          element.style.transform = "";
        }
      );

    });
  }

  /* =======================================================
     COUNTER ANIMATION
     ======================================================= */

  const counters =
    document.querySelectorAll("[data-count]");

  const animateCounter = (element) => {

    const target =
      Number(element.dataset.count);

    if (!Number.isFinite(target)) return;

    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        Math.floor(target * eased);

      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.5
        }
      );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });

  } else {

    counters.forEach((counter) => {
      counter.textContent =
        counter.dataset.count;
    });

  }

  /* =======================================================
     MENTORSHIP BAR ANIMATION
     ======================================================= */

  const mentorshipDashboard =
    document.querySelector(
      ".mentorship-dashboard"
    );

  if (
    mentorshipDashboard &&
    "IntersectionObserver" in window
  ) {

    const dashboardObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.25
        }
      );

    dashboardObserver.observe(
      mentorshipDashboard
    );

  } else if (mentorshipDashboard) {

    mentorshipDashboard.classList.add(
      "visible"
    );
  }

  /* =======================================================
     CERTIFICATE FILTER / SHOW MORE
     ======================================================= */

  const certificateButton =
    document.querySelector(
      "[data-cert-toggle]"
    );

  const hiddenCertificates =
    document.querySelectorAll(
      ".cert-card.hidden"
    );

  if (
    certificateButton &&
    hiddenCertificates.length
  ) {

    certificateButton.addEventListener(
      "click",
      () => {

        const currentlyHidden =
          document.querySelectorAll(
            ".cert-card.hidden"
          );

        currentlyHidden.forEach((card) => {
          card.classList.remove("hidden");
        });

        certificateButton.textContent =
          "Show Less";

        certificateButton.dataset.expanded =
          "true";

        certificateButton.onclick = () => {

          document
            .querySelectorAll(
              ".cert-card"
            )
            .forEach((card, index) => {

              if (index >= 4) {
                card.classList.add("hidden");
              }

            });

          certificateButton.textContent =
            "View All Certificates";

          certificateButton.dataset.expanded =
            "false";

          certificateButton.onclick = null;
        };
      }
    );
  }

  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener(
        "click",
        (event) => {

          const targetId =
            anchor.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );
    });

  /* =======================================================
     NEURAL NETWORK CANVAS
     ======================================================= */

  if (neuralCanvas) {

    const canvas =
      neuralCanvas;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const isMobile =
      window.innerWidth < 700;

    const particleCount =
      reduceMotion
        ? 0
        : isMobile
          ? 28
          : 55;

    const resizeCanvas = () => {

      const ratio =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        width * ratio;

      canvas.height =
        height * ratio;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );
    };

    class Particle {

      constructor() {

        this.x =
          Math.random() * width;

        this.y =
          Math.random() * height;

        this.vx =
          (Math.random() - 0.5) * 0.35;

        this.vy =
          (Math.random() - 0.5) * 0.35;

        this.radius =
          Math.random() * 1.4 + 0.5;
      }

      update() {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
          this.x = width;
        }

        if (this.x > width) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = height;
        }

        if (this.y > height) {
          this.y = 0;
        }
      }

      draw() {

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(82,245,208,.55)";

        ctx.fill();
      }
    }

    const createParticles = () => {

      particles = [];

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        particles.push(
          new Particle()
        );
      }
    };

    const drawConnections = () => {

      const maxDistance =
        isMobile
          ? 105
          : 135;

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
              dx * dx + dy * dy
            );

          if (
            distance < maxDistance
          ) {

            const opacity =
              (1 - distance / maxDistance) *
              0.16;

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
              `rgba(85,168,255,${opacity})`;

            ctx.lineWidth = 0.7;

            ctx.stroke();
          }
        }
      }
    };

    const animateNetwork = () => {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach(
        (particle) => {
          particle.update();
          particle.draw();
        }
      );

      drawConnections();

      if (!reduceMotion) {
        requestAnimationFrame(
          animateNetwork
        );
      }
    };

    resizeCanvas();
    createParticles();

    if (!reduceMotion) {
      animateNetwork();
    }

    window.addEventListener(
      "resize",
      () => {
        resizeCanvas();
        createParticles();
      }
    );
  }

  /* =======================================================
     IMAGE ERROR HANDLING
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.classList.add(
            "image-error"
          );

        }
      );

    });

  /* =======================================================
     EXTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach((link) => {

      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  document
    .querySelectorAll(
      "[data-year]"
    )
    .forEach((element) => {

      element.textContent =
        new Date().getFullYear();

    });

  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        links
      ) {

        links.classList.remove(
          "open"
        );

        if (menu) {
          menu.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      }

    }
  );

  /* =======================================================
     PAGE READY
     ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

});
