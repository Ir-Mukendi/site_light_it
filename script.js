// Année dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menu burger mobile
const burger = document.getElementById("navBurger");
const navLinks = document.querySelector(".nav-links");
burger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Rotation de mots dans le hero
const words = ["votre infrastructure", "votre réseau", "votre sécurité", "votre projet"];
let wi = 0;
const swapEl = document.getElementById("heroSwap");
if (swapEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    wi = (wi + 1) % words.length;
    swapEl.style.opacity = 0;
    setTimeout(() => {
      swapEl.textContent = words[wi];
      swapEl.style.opacity = 1;
    }, 220);
  }, 2600);
  swapEl.style.transition = "opacity 0.22s ease";
}

// Formulaire de contact — envoi natif via FormSubmit (redirection avec confirmation)
const note = document.getElementById("formNote");
if (new URLSearchParams(location.search).get("sent") === "1") {
  note.textContent = "Message envoyé — nous revenons vers vous sous 24-48h.";
  history.replaceState(null, "", location.pathname + location.hash);
}

// Reveal au scroll
const revealTargets = document.querySelectorAll(".service-card, .portfolio-card, .process-list li, .why-item, .faq-item");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "riseIn 0.6s cubic-bezier(.16,.84,.44,1) forwards";
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = "0";
  io.observe(el);
});

const style = document.createElement("style");
style.textContent = `@keyframes riseIn{ from{ opacity:0; transform: translateY(18px);} to{ opacity:1; transform: translateY(0);} }`;
document.head.appendChild(style);
