// ====== Contact details (yahan change kar sakte hain) ======
const EMAIL = "maaz99210@gmail.com";
const WA_NUMBER = "923431897570"; // country code ke sath, bina + ya 0 ke
const WA_DEFAULT = "Assalam o Alaikum Maaz, mujhe aap ki graphic design services chahiye.";

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// Active nav link
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === page) a.classList.add("active");
});

// Floating WhatsApp button + all WhatsApp links
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = waLink(el.dataset.msg || WA_DEFAULT);
  el.target = "_blank";
  el.rel = "noopener";
});
document.querySelectorAll("[data-mail]").forEach(el => {
  el.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Graphic Design Inquiry")}`;
});

// Scroll reveal + skill bars
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      e.target.querySelectorAll(".bar span").forEach(b => (b.style.width = b.dataset.w + "%"));
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Contact form -> Email or WhatsApp
const form = document.getElementById("contactForm");
if (form) {
  const getData = () => {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const msg = form.message.value.trim();
    return { name, phone, msg };
  };
  const valid = ({ name, msg }) => {
    if (!name || !msg) { alert("Meherbani karke naam aur message likhen."); return false; }
    return true;
  };
  document.getElementById("sendMail").addEventListener("click", () => {
    const d = getData(); if (!valid(d)) return;
    const body = `Name: ${d.name}\nPhone: ${d.phone}\n\n${d.msg}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio Inquiry from " + d.name)}&body=${encodeURIComponent(body)}`;
  });
  document.getElementById("sendWa").addEventListener("click", () => {
    const d = getData(); if (!valid(d)) return;
    const text = `Assalam o Alaikum, mera naam ${d.name} hai.\n${d.msg}\nPhone: ${d.phone}`;
    window.open(waLink(text), "_blank", "noopener");
  });
}

// Footer year
document.querySelectorAll(".year").forEach(y => (y.textContent = new Date().getFullYear()));
