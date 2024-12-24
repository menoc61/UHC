// menu animation
const menuBtn = document.querySelector(".menu-button");
const exitBtn = document.querySelector(".exit");

let t1 = gsap.timeline({ paused: true });
t1.to(".menu", { opacity: 1, duration: 1, top: 0, ease: Power2.easeInOut });
t1.to(
  ".nav",
  {
    opacity: 1,
    marginBottom: 0,
    duration: 1,
    ease: Power2.easeInOut,
    stagger: 0.3,
  },
  ">-0.5"
);

menuBtn.addEventListener("click", () => {
  if (t1.isActive()) {
    return;
  }
  if (t1.reversed()) {
    t1.play().timeScale(1);
    menuBtn.classList.add("active");
  } else {
    t1.timeScale(2.5);
    t1.reverse();
    menuBtn.classList.remove("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

exitBtn.addEventListener("click", () => {
  t1.timeScale(2.5);
  t1.reverse();
  menuBtn.classList.remove("active");
});
// mouse trailer animation
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`,
  };

  trailer.animate(keyframes, {
    duration: 800,
    fill: "forwards",
  });
};

const getTrailerClass = (type) => {
  switch (type) {
    case "video":
      return "fa-solid fa-play";
    case "phone":
      return "fa-solid fa-phone";
    case "mail":
      return "fa-solid fa-reply";
    case "link":
      return "fa-solid fa-arrow-up-right-from-square";
    case "download":
      return "fa-solid fa-download";
      case "map":
        return "fa-solid fa-location-dot";
    default:
      return "fa-solid fa-arrow-up-right";
  }
};

window.onmousemove = (e) => {
    // Check if the target element or any of its parents has the 'interactable' class
    const interactable = e.target.closest(".interactable") || e.target.closest(".interactable-divider");
    interacting = interactable !== null;

  const icon = document.getElementById("trailer-icon");

  animateTrailer(e, interacting);

  trailer.dataset.type = interacting ? interactable.dataset.type : "";

  if (interacting) {
    icon.className = getTrailerClass(interactable.dataset.type);
  }
};

