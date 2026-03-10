(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initVideoHover();
    initAnimatedCounters();
    initRollingImages();
    initContactPopup();
    initQuoteModal();
    initSmoothScroll();
  });

  function initMobileMenu() {
    var toggle = document.getElementById("mobile-menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var closeBtn = document.getElementById("mobile-menu-close");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      menu.classList.toggle("hidden");
      document.body.classList.toggle("overflow-hidden");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        menu.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      });
    }

    var menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  function initVideoHover() {
    var videoSections = document.querySelectorAll("[data-video-hover]");

    videoSections.forEach(function (section) {
      var video = section.querySelector("video");
      if (!video) return;

      var keepPlaying = section.getAttribute("data-video-keep-playing") === "true";

      video.muted = true;
      video.playsInline = true;

      if (keepPlaying) {
        video.autoplay = true;
        video.loop = true;
        video.play().catch(function () {});
      }

      section.addEventListener("mouseenter", function () {
        video.muted = false;
        video.play().catch(function () {
          video.muted = true;
          video.play().catch(function () {});
        });
      });

      section.addEventListener("mouseleave", function () {
        video.muted = true;
        if (!keepPlaying) {
          video.pause();
          video.currentTime = 0;
        }
      });
    });

    var standaloneVideos = document.querySelectorAll("[data-video-standalone]");
    standaloneVideos.forEach(function (video) {
      video.muted = true;
      video.playsInline = true;

      video.addEventListener("mouseenter", function () {
        video.muted = false;
        video.play().catch(function () {
          video.muted = true;
          video.play().catch(function () {});
        });
      });

      video.addEventListener("mouseleave", function () {
        video.muted = true;
        video.pause();
        video.currentTime = 0;
      });
    });
  }

  function initAnimatedCounters() {
    var counterSections = document.querySelectorAll("[data-counter-section]");

    if (!counterSections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var section = entry.target;
            var counters = section.querySelectorAll("[data-counter]");
            counters.forEach(function (counter) {
              animateCounter(counter);
            });
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterSections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function animateCounter(element) {
    var target = parseInt(element.getAttribute("data-counter"), 10);
    var suffix = element.getAttribute("data-counter-suffix") || "";
    var prefix = element.getAttribute("data-counter-prefix") || "";
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(target * eased);
      element.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initRollingImages() {
    var carousels = document.querySelectorAll("[data-rolling-images]");

    carousels.forEach(function (carousel) {
      var images = carousel.querySelectorAll("[data-rolling-image]");
      if (images.length === 0) return;

      var currentIndex = 0;

      images.forEach(function (img, idx) {
        img.style.position = "absolute";
        img.style.inset = "0";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.transition = "opacity 1s ease";
        img.style.opacity = idx === 0 ? "1" : "0";
      });

      setInterval(function () {
        images[currentIndex].style.opacity = "0";
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.opacity = "1";
      }, 3000);
    });
  }

  function initContactPopup() {
    var openBtns = document.querySelectorAll("[data-open-contact]");
    var popup = document.getElementById("contact-popup");
    var closeBtn = document.getElementById("contact-popup-close");
    var overlay = document.getElementById("contact-popup-overlay");

    if (!popup) return;

    function openPopup() {
      popup.classList.remove("hidden");
      popup.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }

    function closePopup() {
      popup.classList.add("hidden");
      popup.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openPopup();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closePopup);
    }

    if (overlay) {
      overlay.addEventListener("click", closePopup);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !popup.classList.contains("hidden")) {
        closePopup();
      }
    });
  }

  function initQuoteModal() {
    var openBtns = document.querySelectorAll("[data-open-quote]");
    var modal = document.getElementById("quote-modal");
    var closeBtn = document.getElementById("quote-modal-close");
    var overlay = document.getElementById("quote-modal-overlay");
    var form = document.getElementById("quote-form");

    if (!modal) return;

    function openModal() {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (overlay) {
      overlay.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var submitBtn = form.querySelector("[type='submit']");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
        }

        var formData = new FormData(form);
        formData.append("action", "cahit_submit_quote");

        if (typeof cahitData !== "undefined" && cahitData.nonce) {
          formData.append("nonce", cahitData.nonce);
        }

        var ajaxUrl =
          typeof cahitData !== "undefined" && cahitData.ajaxUrl
            ? cahitData.ajaxUrl
            : "/wp-admin/admin-ajax.php";

        fetch(ajaxUrl, {
          method: "POST",
          body: formData,
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            if (data.success) {
              var successMsg = document.getElementById("quote-success");
              if (successMsg) {
                form.style.display = "none";
                successMsg.classList.remove("hidden");
              } else {
                alert("Thank you! Your quote request has been submitted.");
                closeModal();
              }
              form.reset();
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
              submitBtn.textContent = "Submit Request";
            }
          });
      });
    }
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
          var headerHeight = 80;
          var targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }
})();
