(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initVideoHover();
    initAnimatedCounters();
    initRollingImages();
    initPillButtons();
    initQuoteFormSubmit();
    initSmoothScroll();
    initLeadFunnel();
  });

  function initMobileMenu() {
    var toggle = document.getElementById("mobile-menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var openIcon = document.getElementById("menu-icon-open");
    var closeIcon = document.getElementById("menu-icon-close");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("open");
      if (isOpen) {
        menu.classList.remove("open");
        if (openIcon) openIcon.style.display = "";
        if (closeIcon) closeIcon.style.display = "none";
      } else {
        menu.classList.add("open");
        if (openIcon) openIcon.style.display = "none";
        if (closeIcon) closeIcon.style.display = "";
      }
    });

    var links = menu.querySelectorAll("a, button");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        if (openIcon) openIcon.style.display = "";
        if (closeIcon) closeIcon.style.display = "none";
      });
    });
  }

  function initVideoHover() {
    var containers = document.querySelectorAll(".leader-video-container");
    containers.forEach(function (container) {
      var video = container.querySelector("video");
      if (!video) return;

      container.addEventListener("mouseenter", function () {
        video.muted = false;
        video.play().catch(function () {
          video.muted = true;
          video.play().catch(function () {});
        });
        var overlay = container.querySelector(".leader-video-overlay");
        if (overlay) overlay.style.opacity = "0";
      });

      container.addEventListener("mouseleave", function () {
        video.muted = true;
        video.pause();
        video.currentTime = 0;
        var overlay = container.querySelector(".leader-video-overlay");
        if (overlay) overlay.style.opacity = "1";
      });
    });

    var aboutVideo = document.querySelector(".about-video");
    if (aboutVideo) {
      aboutVideo.addEventListener("mouseenter", function () {
        aboutVideo.muted = false;
        aboutVideo.play().catch(function () {
          aboutVideo.muted = true;
          aboutVideo.play().catch(function () {});
        });
      });
      aboutVideo.addEventListener("mouseleave", function () {
        aboutVideo.muted = true;
        aboutVideo.pause();
        aboutVideo.currentTime = 0;
      });
    }

    var overviewVideo = document.querySelector(".overview-video");
    if (overviewVideo) {
      overviewVideo.addEventListener("mouseenter", function () {
        overviewVideo.muted = false;
        overviewVideo.play().catch(function () {
          overviewVideo.muted = true;
          overviewVideo.play().catch(function () {});
        });
      });
      overviewVideo.addEventListener("mouseleave", function () {
        overviewVideo.muted = true;
        overviewVideo.pause();
        overviewVideo.currentTime = 0;
      });
    }

    var bgVideos = document.querySelectorAll("[data-keep-playing]");
    bgVideos.forEach(function (video) {
      video.muted = true;
      video.play().catch(function () {});
    });
  }

  function initAnimatedCounters() {
    var counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    var target = parseInt(element.getAttribute("data-counter"), 10);
    var suffix = element.getAttribute("data-suffix") || "";
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);
      element.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initRollingImages() {
    var containers = document.querySelectorAll(".rolling-images, .rolling-images-container");
    containers.forEach(function (container) {
      var items = container.querySelectorAll(".rolling-image-item, .rolling-image");
      if (items.length < 2) return;

      var currentIndex = 0;
      setInterval(function () {
        items[currentIndex].classList.remove("active");
        items[currentIndex].style.opacity = "0";
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add("active");
        items[currentIndex].style.opacity = "1";
      }, 3000);
    });
  }

  function initPillButtons() {
    var pillBtns = document.querySelectorAll(".pill-btn");
    pillBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (this.closest(".pill-group-multi")) return;
      });
    });
  }

  function initQuoteFormSubmit() {
    var submitBtn = document.getElementById("quote-submit-btn");
    if (!submitBtn) return;

    submitBtn.addEventListener("click", function () {
      submitQuoteForm();
    });
  }

  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (!href || href === "#") return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }

  window.toggleMobileMenu = function () {
    var menu = document.getElementById("mobile-menu");
    var openIcon = document.getElementById("menu-icon-open");
    var closeIcon = document.getElementById("menu-icon-close");
    if (!menu) return;
    var isOpen = menu.classList.contains("open");
    if (isOpen) {
      menu.classList.remove("open");
      if (openIcon) openIcon.style.display = "";
      if (closeIcon) closeIcon.style.display = "none";
    } else {
      menu.classList.add("open");
      if (openIcon) openIcon.style.display = "none";
      if (closeIcon) closeIcon.style.display = "";
    }
  };

  window.openContactPopup = function () {
    var popup = document.getElementById("contact-popup");
    if (popup) popup.style.display = "flex";
  };

  window.closeContactPopup = function () {
    var popup = document.getElementById("contact-popup");
    if (popup) popup.style.display = "none";
  };

  window.openQuoteModal = function () {
    var modal = document.getElementById("quote-modal");
    if (modal) modal.style.display = "flex";
  };

  window.closeQuoteModal = function () {
    var modal = document.getElementById("quote-modal");
    if (modal) modal.style.display = "none";
    var formContent = document.getElementById("quote-form-content");
    var successContent = document.getElementById("quote-success");
    if (formContent) formContent.style.display = "";
    if (successContent) successContent.style.display = "none";
  };

  window.selectPill = function (groupId, btn, value) {
    var group = document.getElementById(groupId);
    if (!group) return;
    var buttons = group.querySelectorAll(".pill-btn");
    buttons.forEach(function (b) { b.classList.remove("selected"); });
    btn.classList.add("selected");
    btn.setAttribute("data-value", value);
  };

  window.togglePill = function (btn) {
    btn.classList.toggle("selected");
  };

  window.submitQuoteForm = function () {
    var fullname = document.getElementById("quote-fullname");
    var email = document.getElementById("quote-email");

    if (!fullname || !fullname.value.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!email || !email.value.trim()) {
      alert("Please enter your email address.");
      return;
    }

    var submitBtn = document.getElementById("quote-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    var formData = new FormData();
    formData.append("action", "cahit_submit_quote");
    if (typeof cahitData !== "undefined" && cahitData.nonce) {
      formData.append("nonce", cahitData.nonce);
    }
    formData.append("budget", document.getElementById("quote-budget") ? document.getElementById("quote-budget").value : "");
    formData.append("nonNegotiables", document.getElementById("quote-non-negotiables") ? document.getElementById("quote-non-negotiables").value : "");
    formData.append("siteChallenges", document.getElementById("quote-site-challenges") ? document.getElementById("quote-site-challenges").value : "");
    formData.append("timeline", document.getElementById("quote-timeline") ? document.getElementById("quote-timeline").value : "");
    formData.append("deadlines", document.getElementById("quote-deadlines") ? document.getElementById("quote-deadlines").value : "");
    formData.append("decisionMaker", document.getElementById("quote-decision-maker") ? document.getElementById("quote-decision-maker").value : "");
    formData.append("fullName", fullname.value);
    formData.append("email", email.value);
    formData.append("phone", document.getElementById("quote-phone") ? document.getElementById("quote-phone").value : "");

    var ajaxUrl = (typeof cahitData !== "undefined" && cahitData.ajaxUrl) ? cahitData.ajaxUrl : "/api/ajax";

    fetch(ajaxUrl, {
      method: "POST",
      body: formData
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          var formContent = document.getElementById("quote-form-content");
          var successContent = document.getElementById("quote-success");
          if (formContent) formContent.style.display = "none";
          if (successContent) successContent.style.display = "flex";
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(function () {
        alert("Network error. Please try again.");
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Submit Quote Request';
        }
      });
  };

  var arTranslations = {
    "Home": "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    "About Us": "\u0645\u0646 \u0646\u062D\u0646",
    "Services": "\u0627\u0644\u062E\u062F\u0645\u0627\u062A",
    "Projects": "\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    "Clients": "\u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    "Blog": "\u0627\u0644\u0645\u062F\u0648\u0646\u0629",
    "Careers": "\u0627\u0644\u0648\u0638\u0627\u0626\u0641",
    "Contact": "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    "Get Quote": "\u0637\u0644\u0628 \u0639\u0631\u0636 \u0633\u0639\u0631",
    "CAHIT CONTRACTING": "\u0634\u0631\u0643\u0629 \u062C\u0627\u0647\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062A",
    "A Solid Ground": "\u0623\u0633\u0627\u0633 \u0645\u062A\u064A\u0646",
    "For Your Project": "\u0644\u0645\u0634\u0631\u0648\u0639\u0643",
    "Marine & Coastal Construction Experts": "\u062E\u0628\u0631\u0627\u0621 \u0627\u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u0628\u062D\u0631\u064A \u0648\u0627\u0644\u0633\u0627\u062D\u0644\u064A",
    "Schedule Consultation": "\u062D\u062C\u0632 \u0627\u0633\u062A\u0634\u0627\u0631\u0629",
    "View Portfolio": "\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
    "Years Experience": "\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629",
    "Projects Completed": "\u0645\u0634\u0627\u0631\u064A\u0639 \u0645\u0643\u062A\u0645\u0644\u0629",
    "Client Satisfaction": "\u0631\u0636\u0627 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    "Trusted by Leading Organizations": "\u0645\u0648\u062B\u0648\u0642 \u0628\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A \u0627\u0644\u0631\u0627\u0626\u062F\u0629",
    "Engineering the Foundations of Tomorrow": "\u0647\u0646\u062F\u0633\u0629 \u0623\u0633\u0627\u0633\u0627\u062A \u0627\u0644\u063A\u062F",
    "Our Services": "\u062E\u062F\u0645\u0627\u062A\u0646\u0627",
    "Our Projects": "\u0645\u0634\u0627\u0631\u064A\u0639\u0646\u0627",
    "Selected Projects": "\u0645\u0634\u0627\u0631\u064A\u0639 \u0645\u062E\u062A\u0627\u0631\u0629",
    "Leadership": "\u0627\u0644\u0642\u064A\u0627\u062F\u0629",
    "Our Commitment": "\u0627\u0644\u062A\u0632\u0627\u0645\u0646\u0627",
    "Best Quality": "\u0623\u0641\u0636\u0644 \u062C\u0648\u062F\u0629",
    "On-Time Delivery": "\u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062D\u062F\u062F",
    "Experience": "\u0627\u0644\u062E\u0628\u0631\u0629",
    "Ready to Start Your Next Project?": "\u0647\u0644 \u0623\u0646\u062A \u0645\u0633\u062A\u0639\u062F \u0644\u0628\u062F\u0621 \u0645\u0634\u0631\u0648\u0639\u0643 \u0627\u0644\u0642\u0627\u062F\u0645\u061F",
    "Company Overview": "\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0634\u0631\u0643\u0629",
    "View Our Services": "\u0639\u0631\u0636 \u062E\u062F\u0645\u0627\u062A\u0646\u0627",
    "Our Mission": "\u0645\u0647\u0645\u062A\u0646\u0627",
    "Our Vision": "\u0631\u0624\u064A\u062A\u0646\u0627",
    "About Cahit Trading & Contracting": "\u0639\u0646 \u0634\u0631\u0643\u0629 \u062C\u0627\u0647\u062A \u0644\u0644\u062A\u062C\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0627\u062A",
    "Contact Us": "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    "Call Us": "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    "Email Us": "\u0631\u0627\u0633\u0644\u0646\u0627",
    "WhatsApp": "\u0648\u0627\u062A\u0633\u0627\u0628",
    "Address": "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
    "Request a Quote": "\u0637\u0644\u0628 \u0639\u0631\u0636 \u0633\u0639\u0631",
    "Submit Quote Request": "\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0639\u0631\u0636 \u0627\u0644\u0633\u0639\u0631",
    "Company": "\u0627\u0644\u0634\u0631\u0643\u0629",
    "Marine & Coastal Construction": "\u0627\u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u0628\u062D\u0631\u064A \u0648\u0627\u0644\u0633\u0627\u062D\u0644\u064A",
    "Infrastructure Development": "\u062A\u0637\u0648\u064A\u0631 \u0627\u0644\u0628\u0646\u064A\u0629 \u0627\u0644\u062A\u062D\u062A\u064A\u0629",
    "Earthworks": "\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062D\u0641\u0631 \u0648\u0627\u0644\u0631\u062F\u0645",
    "Dewatering & Shoring": "\u0646\u0632\u062D \u0627\u0644\u0645\u064A\u0627\u0647 \u0648\u0627\u0644\u062A\u062F\u0639\u064A\u0645",
    "MEP Works": "\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627",
    "Cahit Assistant": "\u0645\u0633\u0627\u0639\u062F \u062C\u0627\u0647\u062A",
    "Ask us anything": "\u0627\u0633\u0623\u0644\u0646\u0627 \u0623\u064A \u0634\u064A\u0621",
    "Managing Director": "\u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0645",
    "General Coordinator": "\u0627\u0644\u0645\u0646\u0633\u0642 \u0627\u0644\u0639\u0627\u0645",
    "Learn More": "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064A\u062F",
    "A Solid Ground For Your Project": "\u0623\u0633\u0627\u0633 \u0645\u062A\u064A\u0646 \u0644\u0645\u0634\u0631\u0648\u0639\u0643"
  };

  var enOriginals = {};

  window.switchLang = function (lang) {
    var enBtn = document.getElementById("lang-en");
    var arBtn = document.getElementById("lang-ar");
    if (!enBtn || !arBtn) return;

    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
      enBtn.classList.remove("lang-btn-active");
      arBtn.classList.add("lang-btn-active");
      translateToArabic();
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
      arBtn.classList.remove("lang-btn-active");
      enBtn.classList.add("lang-btn-active");
      restoreEnglish();
    }
    localStorage.setItem("cahit-lang", lang);
  };

  function translateToArabic() {
    var textNodes = document.querySelectorAll(
      ".nav-link, .mobile-nav-link, .hero-title, .hero-subtitle, .hero-counter-label, " +
      ".section-title, .section-subtitle, .section-label, .stat-label, " +
      ".service-card-title, .service-card-link, .marine-pill-text, .marine-title, .marine-subtitle, " +
      ".leader-name, .leader-role, .commitment-title, .commitment-desc, " +
      ".cta-title, .cta-subtitle, .hero-banner-title, .hero-banner-subtitle, " +
      ".footer-heading, .footer-links a, .footer-links button, .footer-tagline, .footer-copyright, " +
      ".btn, .card-title, .modal-title, .quote-modal-title, .contact-label, " +
      ".chatbot-header-title, .chatbot-header-subtitle, " +
      ".detail-label, .quote-section-label, h1, h2, h3"
    );
    textNodes.forEach(function (el) {
      var children = el.childNodes;
      for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
          var text = children[i].textContent.trim();
          if (text && arTranslations[text]) {
            if (!el.getAttribute("data-en-text")) {
              el.setAttribute("data-en-text", text);
            }
            children[i].textContent = arTranslations[text];
          }
        }
      }
    });
  }

  function restoreEnglish() {
    var translated = document.querySelectorAll("[data-en-text]");
    translated.forEach(function (el) {
      var original = el.getAttribute("data-en-text");
      var children = el.childNodes;
      for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3 && children[i].textContent.trim()) {
          children[i].textContent = original;
          break;
        }
      }
      el.removeAttribute("data-en-text");
    });
  }

  var funnelData = {};
  var funnelGlobalStep = 0;
  var funnelInactivityTimer = null;
  var funnelSectionMap = { hero: 1, about: 2, projects: 3 };

  function initLeadFunnel() {
    var sections = document.querySelectorAll("[data-funnel-section]");
    if (!sections.length) return;

    function handleSectionInteraction(section) {
      var sectionName = section.getAttribute("data-funnel-section");
      var stepForSection = funnelSectionMap[sectionName];
      if (funnelGlobalStep >= 4) return;
      if (stepForSection !== funnelGlobalStep + 1) return;
      showFunnelStep(stepForSection);
      resetFunnelInactivity(stepForSection);
    }

    sections.forEach(function (section) {
      section.addEventListener("mousemove", function () {
        handleSectionInteraction(section);
      });
      section.addEventListener("touchstart", function () {
        handleSectionInteraction(section);
      }, { passive: true });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          handleSectionInteraction(entry.target);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function showFunnelStep(step) {
    for (var i = 1; i <= 4; i++) {
      var panel = document.getElementById("funnel-step-" + i);
      if (panel) panel.style.display = i === step ? "block" : "none";
    }
  }

  function resetFunnelInactivity(step) {
    clearTimeout(funnelInactivityTimer);
    var panel = document.getElementById("funnel-step-" + step);
    if (!panel) return;
    var focused = panel.querySelector("input:focus");
    if (focused) return;
    funnelInactivityTimer = setTimeout(function () {
      panel.style.display = "none";
    }, 30000);
  }

  window.selectFunnelOption = function (groupId, btn) {
    var group = document.getElementById(groupId);
    if (!group) return;
    var buttons = group.querySelectorAll(".funnel-option");
    buttons.forEach(function (b) { b.classList.remove("selected"); });
    btn.classList.add("selected");
    funnelData[groupId] = btn.textContent.trim();
    clearTimeout(funnelInactivityTimer);
  };

  window.closeFunnel = function (step) {
    var panel = document.getElementById("funnel-step-" + step);
    if (panel) panel.style.display = "none";
    clearTimeout(funnelInactivityTimer);
  };

  window.submitFunnelStep = function (step) {
    if (step === 1) {
      var projectType = funnelData["funnel-project-type"];
      var goal = funnelData["funnel-primary-goal"];
      if (!projectType || !goal) {
        alert("Please select both a project type and primary goal.");
        return;
      }
      funnelGlobalStep = 1;
      showFunnelStep(0);
      var aboutSection = document.getElementById("about-section");
      if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
    } else if (step === 2) {
      var timeline = funnelData["funnel-timeline"];
      var budget = funnelData["funnel-budget"];
      var location = document.getElementById("funnel-location");
      if (!timeline || !budget) {
        alert("Please select timeline and budget range.");
        return;
      }
      if (location) funnelData["location"] = location.value;
      funnelGlobalStep = 2;
      showFunnelStep(0);
      var projectsSection = document.getElementById("projects-section");
      if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
    } else if (step === 3) {
      var name = document.getElementById("funnel-name");
      var email = document.getElementById("funnel-email");
      var phone = document.getElementById("funnel-phone");
      if (!name || !name.value.trim() || !email || !email.value.trim()) {
        alert("Please fill in your name and email.");
        return;
      }
      funnelData["name"] = name.value.trim();
      funnelData["email"] = email.value.trim();
      funnelData["phone"] = phone ? phone.value.trim() : "";
      funnelData["role"] = funnelData["funnel-role"] || "";
      funnelData["decision"] = funnelData["funnel-decision"] || "";
      funnelData["time"] = funnelData["funnel-time"] || "";

      var scope = [
        "Type: " + (funnelData["funnel-project-type"] || ""),
        "Goal: " + (funnelData["funnel-primary-goal"] || ""),
        "Timeline: " + (funnelData["funnel-timeline"] || ""),
        "Budget: " + (funnelData["funnel-budget"] || ""),
        "Location: " + (funnelData["location"] || ""),
        "Role: " + funnelData["role"],
        "Decision Maker: " + funnelData["decision"],
        "Preferred Time: " + funnelData["time"]
      ].join("; ");

      var formData = new FormData();
      formData.append("action", "cahit_submit_lead");
      formData.append("nonce", (typeof cahitData !== "undefined" && cahitData.nonce) || "");
      formData.append("service_type", funnelData["funnel-project-type"] || "");
      formData.append("details", scope);
      formData.append("name", funnelData["name"]);
      formData.append("email", funnelData["email"]);
      formData.append("phone", funnelData["phone"]);

      var ajaxUrl = (typeof cahitData !== "undefined" && cahitData.ajaxUrl) || "/api/ajax";
      var submitBtn = document.querySelector('[data-testid="funnel-submit-3"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting..."; }

      fetch(ajaxUrl, { method: "POST", body: formData })
        .then(function (res) {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then(function (data) {
          if (data.success === false) throw new Error(data.data || "Submission failed");
          funnelGlobalStep = 4;
          showFunnelStep(4);
        })
        .catch(function (err) {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Request"; }
          alert("Something went wrong. Please try again or contact us directly at ctc@cahitcontracting.com");
        });
    }
  };

  (function initLang() {
    var saved = localStorage.getItem("cahit-lang");
    if (saved === "ar") {
      document.addEventListener("DOMContentLoaded", function () {
        window.switchLang("ar");
      });
    }
  })();
})();
