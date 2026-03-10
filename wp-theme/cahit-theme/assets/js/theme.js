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
})();
