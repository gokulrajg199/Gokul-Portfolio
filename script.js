/* =========================================================
   GOKULRAJ G — ADVANCED PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  /* =========================================================
     NAVIGATION — SCROLL EFFECT
     ========================================================= */

  const navShell = $(".nav-shell");

  const handleNavScroll = () => {
    if (!navShell) return;

    if (window.scrollY > 40) {
      navShell.classList.add("scrolled");
    } else {
      navShell.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavScroll, {
    passive: true
  });

  handleNavScroll();


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuButton = $(".menu");
  const links = $(".links");

  if (menuButton && links) {

    menuButton.addEventListener("click", () => {

      links.classList.toggle("open");

      const isOpen = links.classList.contains("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

    });

    // Close menu after clicking a navigation link
    $$(".links a").forEach(link => {

      link.addEventListener("click", () => {

        links.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  const navLinks = $$(".links a");

  const sections = $$("section[id]");

  if (navLinks.length && sections.length) {

    const updateActiveLink = () => {

      const scrollPosition =
        window.scrollY + window.innerHeight * 0.35;

      let currentSection = "";

      sections.forEach(section => {

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          currentSection = section.id;
        }

      });

      navLinks.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
          "active",
          href === `#${currentSection}`
        );

      });

    };

    window.addEventListener(
      "scroll",
      updateActiveLink,
      { passive: true }
    );

    updateActiveLink();

  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================================
     SCROLL PROGRESS BAR
     ========================================================= */

  const progressBar = $(".scroll-progress");

  const updateProgress = () => {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress =
      Math.min(
        100,
        Math.max(
          0,
          (scrollTop / documentHeight) * 100
        )
      );

    progressBar.style.width = `${progress}%`;

  };

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =========================================================
     CURSOR GLOW
     ========================================================= */

  const cursorGlow = $(".cursor-glow");

  if (
    cursorGlow &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", event => {

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


  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */

  const revealElements = $$(".reveal");

  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =========================================================
     STAGGER REVEAL ANIMATION
     ========================================================= */

  const animatedGroups = [
    ".role-grid .role-card",
    ".cert-grid .cert-card",
    ".featured-projects .project-card",
    ".publication-stack .publication-card",
    ".timeline-grid .timeline-card",
    ".profile-grid > *",
    ".academic-grid > *"
  ];

  animatedGroups.forEach(selector => {

    const elements = $$(selector);

    elements.forEach((element, index) => {

      element.style.transitionDelay =
        `${Math.min(index * 80, 500)}ms`;

      element.classList.add("reveal");

    });

  });


  /* =========================================================
     3D TILT EFFECT
     ========================================================= */

  const tiltElements = $$(".tilt");

  if (
    tiltElements.length &&
    window.matchMedia("(pointer:fine)").matches &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    tiltElements.forEach(element => {

      element.addEventListener("mousemove", event => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) / centerY) * -5;

        const rotateY =
          ((x - centerX) / centerX) * 5;

        element.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;

      });

      element.addEventListener("mouseleave", () => {

        element.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

      });

    });

  }


  /* =========================================================
     PORTRAIT CARD PARALLAX
     ========================================================= */

  const portraitCard = $(".portrait-card");

  if (
    portraitCard &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    window.addEventListener("mousemove", event => {

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);

      const rotateY = x * 5;
      const rotateX = y * -4;

      portraitCard.style.transform =
        `rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    });

    portraitCard.addEventListener(
      "mouseleave",
      () => {
        portraitCard.style.transform =
          "rotateX(0deg) rotateY(0deg)";
      }
    );

  }


  /* =========================================================
     COUNTER ANIMATION
     ========================================================= */

  const counters = $$("[data-count]");

  const animateCounter = element => {

    const target =
      parseFloat(
        element.dataset.count
      );

    if (Number.isNaN(target)) return;

    const duration = 1600;

    const startTime = performance.now();

    const suffix =
      element.dataset.suffix || "";

    const prefix =
      element.dataset.prefix || "";

    const decimals =
      target % 1 !== 0 ? 1 : 0;

    const update = currentTime => {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      // Smooth easing
      const eased =
        1 - Math.pow(1 - progress, 3);

      const value =
        target * eased;

      element.textContent =
        `${prefix}${value.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }

    };

    requestAnimationFrame(update);

  };


  if (
    counters.length &&
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              animateCounter(entry.target);

              counterObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.5
        }
      );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

  }


  /* =========================================================
     MENTORSHIP PROGRESS BARS
     ========================================================= */

  const dashboard =
    $(".mentorship-dashboard");

  if (
    dashboard &&
    "IntersectionObserver" in window
  ) {

    const dashboardObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              dashboard.classList.add(
                "visible"
              );

              dashboardObserver.unobserve(
                dashboard
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );

    dashboardObserver.observe(
      dashboard
    );

  }


  /* =========================================================
     CERTIFICATE FILTER / SHOW MORE
     ========================================================= */

  const certificateCards =
    $$(".cert-card");

  const certificateButton =
    $("[data-certificates-toggle]");

  if (
    certificateCards.length &&
    certificateButton
  ) {

    const hiddenCertificates =
      certificateCards.filter(
        card =>
          card.classList.contains("hidden")
      );

    certificateButton.addEventListener(
      "click",
      () => {

        const isExpanded =
          certificateButton.dataset.expanded ===
          "true";

        hiddenCertificates.forEach(card => {

          card.classList.toggle(
            "hidden",
            isExpanded
          );

        });

        certificateButton.dataset.expanded =
          isExpanded ? "false" : "true";

        certificateButton.innerHTML =
          isExpanded
            ? "View All Certificates <span>↗</span>"
            : "Show Less <span>↑</span>";

      }
    );

  }


  /* =========================================================
     IMAGE FALLBACK
     ========================================================= */

  $$("img").forEach(img => {

    img.addEventListener("error", () => {

      img.classList.add("image-error");

      /*
       * Prevent broken-image icon from
       * making the design look damaged.
       */

      img.style.opacity = "0";

    });

  });


  /* =========================================================
     PROFILE IMAGE
     ========================================================= */

  const profileImage =
    document.querySelector(
      'img[src*="profile.jpg"]'
    );

  if (profileImage) {

    profileImage.addEventListener(
      "load",
      () => {
        profileImage.style.opacity = "1";
      }
    );

  }


  /* =========================================================
     BUTTON RIPPLE EFFECT
     ========================================================= */

  $$(".btn").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        const rect =
          button.getBoundingClientRect();

        const ripple =
          document.createElement("span");

        const size =
          Math.max(
            rect.width,
            rect.height
          );

        ripple.style.position = "absolute";
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left =
          `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top =
          `${event.clientY - rect.top - size / 2}px`;
        ripple.style.borderRadius = "50%";
        ripple.style.background =
          "rgba(255,255,255,.22)";
        ripple.style.transform =
          "scale(0)";
        ripple.style.pointerEvents =
          "none";

        ripple.style.transition =
          "transform .6s ease, opacity .6s ease";

        button.appendChild(ripple);

        requestAnimationFrame(() => {

          ripple.style.transform =
            "scale(1.8)";

          ripple.style.opacity = "0";

        });

        setTimeout(() => {
          ripple.remove();
        }, 650);

      }
    );

  });


  /* =========================================================
     EXTERNAL LINKS
     ========================================================= */

  $$("a[href]").forEach(link => {

    const href =
      link.getAttribute("href");

    if (
      href &&
      (
        href.startsWith("http://") ||
        href.startsWith("https://")
      )
    ) {

      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    }

  });


  /* =========================================================
     EMAIL COPY BUTTON
     ========================================================= */

  const emailLinks =
    $$(".email-link");

  emailLinks.forEach(emailLink => {

    emailLink.addEventListener(
      "contextmenu",
      async event => {

        const href =
          emailLink.getAttribute("href");

        if (
          !href ||
          !href.startsWith("mailto:")
        ) {
          return;
        }

        event.preventDefault();

        const email =
          href.replace(
            "mailto:",
            ""
          );

        try {

          await navigator.clipboard.writeText(
            email
          );

          showToast(
            "Email address copied!"
          );

        } catch {
          // Clipboard may be unavailable
        }

      }
    );

  });


  /* =========================================================
     TOAST NOTIFICATION
     ========================================================= */

  function showToast(message) {

    let toast =
      document.querySelector(
        ".portfolio-toast"
      );

    if (!toast) {

      toast =
        document.createElement("div");

      toast.className =
        "portfolio-toast";

      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.bottom = "30px";
      toast.style.transform =
        "translateX(-50%) translateY(20px)";
      toast.style.padding =
        "12px 18px";
      toast.style.border =
        "1px solid rgba(82,245,208,.25)";
      toast.style.borderRadius =
        "999px";
      toast.style.background =
        "rgba(7,15,31,.94)";
      toast.style.backdropFilter =
        "blur(18px)";
      toast.style.color =
        "#edf5ff";
      toast.style.fontSize =
        ".78rem";
      toast.style.fontWeight =
        "600";
      toast.style.zIndex =
        "9999";
      toast.style.opacity =
        "0";
      toast.style.transition =
        ".35s ease";

      document.body.appendChild(
        toast
      );

    }

    toast.textContent = message;

    requestAnimationFrame(() => {

      toast.style.opacity = "1";

      toast.style.transform =
        "translateX(-50%) translateY(0)";

    });

    clearTimeout(
      toast._timeout
    );

    toast._timeout =
      setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
          "translateX(-50%) translateY(20px)";

      }, 2200);

  }


  /* =========================================================
     NEURAL NETWORK CANVAS
     ========================================================= */

  const canvas =
    document.getElementById(
      "neuralCanvas"
    );

  if (canvas) {

    const ctx =
      canvas.getContext("2d");

    let width;
    let height;
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
          : 65;

    const resizeCanvas = () => {

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );

      width =
        window.innerWidth;

      height =
        window.innerHeight;

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

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

    };


    class Particle {

      constructor() {

        this.x =
          Math.random() * width;

        this.y =
          Math.random() * height;

        this.vx =
          (Math.random() - 0.5) *
          0.35;

        this.vy =
          (Math.random() - 0.5) *
          0.35;

        this.radius =
          Math.random() * 1.7 +
          0.5;

      }


      update() {

        this.x += this.vx;
        this.y += this.vy;

        if (
          this.x < -20 ||
          this.x > width + 20
        ) {
          this.vx *= -1;
        }

        if (
          this.y < -20 ||
          this.y > height + 20
        ) {
          this.vy *= -1;
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
          "rgba(82,245,208,.65)";

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


    const connectParticles = () => {

      const maxDistance =
        isMobile
          ? 105
          : 145;

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

          if (
            distance < maxDistance
          ) {

            const opacity =
              (1 -
                distance /
                maxDistance) *
              0.18;

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
              `rgba(82,245,208,${opacity})`;

            ctx.lineWidth =
              0.6;

            ctx.stroke();

          }

        }

      }

    };


    const animateCanvas = () => {

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach(
        particle => {
          particle.update();
          particle.draw();
        }
      );

      connectParticles();

      if (!reduceMotion) {
        requestAnimationFrame(
          animateCanvas
        );
      }

    };


    resizeCanvas();
    createParticles();

    if (!reduceMotion) {
      animateCanvas();
    }

    window.addEventListener(
      "resize",
      () => {

        resizeCanvas();
        createParticles();

      }
    );

  }


  /* =========================================================
     IMAGE PARALLAX ON HERO
     ========================================================= */

  const visualStage =
    $(".visual-stage");

  if (
    visualStage &&
    window.matchMedia("(pointer:fine)").matches &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    visualStage.addEventListener(
      "mousemove",
      event => {

        const rect =
          visualStage.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        const orbits =
          $$(".orbit", visualStage);

        orbits.forEach(
          (orbit, index) => {

            const amount =
              (index + 1) * 5;

            orbit.style.marginLeft =
              `${x * amount}px`;

            orbit.style.marginTop =
              `${y * amount}px`;

          }
        );

      }
    );

  }


  /* =========================================================
     KEYBOARD ACCESSIBILITY
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      // ESC closes mobile menu
      if (
        event.key === "Escape" &&
        links
      ) {

        links.classList.remove(
          "open"
        );

        if (menuButton) {

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );


  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  const yearElements =
    $$("[data-current-year]");

  yearElements.forEach(
    element => {

      element.textContent =
        new Date().getFullYear();

    }
  );


  /* =========================================================
     PAGE READY
     ========================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );

  console.log(
    "%cGOKULRAJ G — PORTFOLIO",
    "color:#52f5d0;font-size:18px;font-weight:bold;"
  );

  console.log(
    "%cAI • IoT • Research • Innovation • Leadership",
    "color:#91a3bd;font-size:12px;"
  );

});
