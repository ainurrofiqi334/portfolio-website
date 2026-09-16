// HAMBURGER MENU
const hamburger = document.querySelector("#hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburger.onclick = () => {
  navLinks.classList.toggle("active");
};

// KLIK DI LUAR SIDEBAR
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// PORTFOLIO TAB
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".portfolio-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // hapus active button
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // hapus active content
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // active button
    button.classList.add("active");

    // tampilkan content
    const tabId = button.dataset.tab;

    document.getElementById(tabId).classList.add("active");
  });
});

//CONTACT
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("GfaqWT_c4rSDN-bK0");

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_9un9urx", "template_o3aimmp", this)
      .then(() => {
        alert("Pesan berhasil dikirim!");
        form.reset();
      })
      .catch((error) => {
        alert("Gagal mengirim pesan!");
        console.log(error);
      });
  });
});
