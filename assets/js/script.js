// HAMBURGER MENU
const hamburger = document.querySelector("#hamburger-menu");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.onclick = () => {
    navLinks.classList.toggle("active");
  };

  // KLIK DI LUAR SIDEBAR
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
}

// NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT
const navbar = document.querySelector("#navbar");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (navbar) {
    if (scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 160;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// SCROLL REVEAL ANIMATION
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

observeReveals();

// PORTFOLIO TAB
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".portfolio-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");

    const tabId = button.dataset.tab;
    const targetContent = document.getElementById(tabId);

    if (targetContent) {
      targetContent.classList.add("active");
      // Pastikan elemen di dalam tab baru langsung muncul dengan animasi halus
      targetContent.querySelectorAll(".reveal").forEach((el, idx) => {
        el.classList.remove("visible");
        setTimeout(() => {
          el.classList.add("visible");
        }, idx * 70);
      });
    }
  });
});

// CONTACT FORM (EmailJS)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs !== "undefined") {
    emailjs.init("GfaqWT_c4rSDN-bK0");
  }

  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector(".contact-btn");
      const originalText = submitBtn ? submitBtn.innerHTML : "";

      if (submitBtn) {
        submitBtn.innerHTML =
          '<span>Mengirim...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
      }

      emailjs
        .sendForm("service_9un9urx", "template_o3aimmp", this)
        .then(() => {
          alert("Pesan berhasil dikirim!");
          form.reset();
        })
        .catch((error) => {
          alert("Gagal mengirim pesan!");
          console.error(error);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
        });
    });
  }
});
