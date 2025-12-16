function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const burger = document.getElementById("hamburger");

  const isOpen = menu.classList.toggle("active");
  burger.classList.toggle("active", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
}



document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.remove("active");
    const burger = document.getElementById("hamburger");
    burger.innerHTML = "&#9776;";
    burger.classList.remove("active");
  });
});

const productImages = [
  "../assets/original_big.png",
  "../assets/Arose_medium.png",
  "../assets/new_small.png",
  "../assets/Bella_medium.png",
  "../assets/Daises_medium.png",
  "../assets/Arose_medium.png",
  "../assets/new_small.png",
  "../assets/Bella_medium.png",
];

let currentImgIndex = 0;
const mainImgElement = document.getElementById("mainImage");
const dotsContainer = document.querySelector(".dots-indicator");
const thumbsContainer = document.querySelector(".thumbnails-grid");

function initGallery() {
  if (!thumbsContainer) return;

  thumbsContainer.innerHTML = "";
  productImages.forEach((src, idx) => {
    const thumbDiv = document.createElement("div");
    thumbDiv.className = `thumb-box ${idx === 0 ? "active" : ""}`;
    thumbDiv.onclick = () => setSlide(idx);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Thumbnail ${idx + 1}`;

    thumbDiv.appendChild(img);
    thumbsContainer.appendChild(thumbDiv);
  });

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    productImages.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = `dot ${i === 0 ? "active" : ""}`;
      dot.onclick = () => setSlide(i);
      dotsContainer.appendChild(dot);
    });
  }

  updateVisuals();
}

function changeSlide(dir) {
  currentImgIndex += dir;
  if (currentImgIndex < 0) currentImgIndex = productImages.length - 1;
  if (currentImgIndex >= productImages.length) currentImgIndex = 0;
  updateVisuals();
}

function setSlide(index) {
  currentImgIndex = index;
  updateVisuals();
}

function updateVisuals() {
  if (mainImgElement) mainImgElement.src = productImages[currentImgIndex];

  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentImgIndex);
  });

  document.querySelectorAll(".thumb-box").forEach((t, i) => {
    t.classList.toggle("active", i === currentImgIndex);
  });
}

initGallery();

let cartState = {
  type: "single",
  singleScent: "Original",
  doubleScent1: "Original",
  doubleScent2: "Original",
};

function selectOption(type) {
  cartState.type = type;

  const singleGroup = document.getElementById("opt-single");
  const doubleGroup = document.getElementById("opt-double");

  singleGroup.classList.toggle("active", type === "single");
  doubleGroup.classList.toggle("active", type === "double");

  singleGroup
    .closest(".option-card")
    .classList.toggle("active", type === "single");

  doubleGroup
    .closest(".option-card")
    .classList.toggle("active", type === "double");

  updateCartButton();
}

document.addEventListener("DOMContentLoaded", () => {
  selectOption("single");
});

function selectFragrance(fragName, element) {
  const parentContainer = element.parentElement;
  parentContainer
    .querySelectorAll(".fragrance-option")
    .forEach((el) => el.classList.remove("selected"));
  element.classList.add("selected");

  const optionGroup = element.closest(".option-group");

  if (optionGroup.id === "opt-single") {
    cartState.singleScent = fragName;
  } else {
    const allSelectionGroups = optionGroup.querySelectorAll(
      ".fragrance-selection"
    );

    if (parentContainer === allSelectionGroups[0]) {
      cartState.doubleScent1 = fragName;
    } else {
      cartState.doubleScent2 = fragName;
    }
  }

  updateCartButton();
  console.log("Cart State Updated:", cartState);
}

function updateCartButton() {
  const btn = document.querySelector(".btn-add-cart");
  const baseUrl = "https://dummy-store.com/cart";

  let finalUrl = "";

  if (cartState.type === "single") {
    finalUrl = `${baseUrl}?type=single&scent=${cartState.singleScent}`;
  } else {
    finalUrl = `${baseUrl}?type=double&scent1=${cartState.doubleScent1}&scent2=${cartState.doubleScent2}`;
  }

  btn.textContent = "Add to Cart";
  btn.onclick = () => {
    alert(`Add to cart URL:\n${finalUrl}`);
  };
}

updateCartButton();

function toggleAccordion(index) {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach((item, i) => {
    if (i === index) {
      const isActive = item.classList.contains("active");

      items.forEach((el) => {
        el.classList.remove("active");
        el.querySelector(".accordion-icon").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        item.querySelector(".accordion-icon").textContent = "-";
      }
    }
  });
}

const statsSection = document.getElementById("statsSection");
const statsNumbers = document.querySelectorAll(".big-num");
let started = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting && !started) {
      started = true;

      statsNumbers.forEach((stat) => {
        const target = +stat.getAttribute("data-target");
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;

        const updateCount = () => {
          current += increment;

          if (current < target) {
            stat.innerText = Math.ceil(current) + "%";
            requestAnimationFrame(updateCount);
          } else {
            stat.innerText = target + "%";
          }
        };

        updateCount();
      });

      statsObserver.unobserve(statsSection);
    }
  },
  {
    threshold: 0.3,
  }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    document.getElementById("mobileMenu").classList.remove("active");
    const burger = document.getElementById("hamburger");
    burger.innerHTML = "&#9776;";
    burger.setAttribute("aria-expanded", "false");
  }
});
