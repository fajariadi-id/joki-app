import { benefits, pricelist, testimonials, teams } from "./data/dataArrays.js";

// *=======  SELECTOR =======
// TOGGLE NAV SELECTOR
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".fixed-nav .links-container");

// NAV SELECTOR
const fixedNav = document.querySelector(".fixed-nav");
const links = document.querySelectorAll(".link");

// BENEFITS SELECTOR
const benefitsEl = document.querySelector(".benefits");

// CARDS SELECTOR
const cardPricelist = document.querySelector(".pricelist .card-container");

// CAROUSEL SELECTOR
const carousel = document.querySelector(".carousel");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

// CARD TEAM SELECTOR
const cardTeam = document.querySelector(".profile .card-container");

// *=======  GLOBAL VAR =======
// NAV HEIGHT
// 40 -> selisih height 120px - 80px
const navHeight = fixedNav.clientHeight - 40;

// CAROUSEL ACTIVE
let activeCarousel = 0;

// *=======  EVENT LISTENER =======
window.addEventListener("DOMContentLoaded", () => {
  showBenefits(benefits);
  showPricelist(pricelist);
  showTestimonial(testimonials);
  showTeams(teams);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const id = e.target.getAttribute("href").slice(1);
      const linkEl = document.getElementById(id);

      let position = linkEl.offsetTop - navHeight;
      window.scrollTo({
        top: position,
      });

      linksContainer.style.height = 0;
    });
  });
});

// TOGGLE EVENT
navToggle.addEventListener("click", () => {
  linksContainer.classList.toggle("show-link");

  const containerHeight = linksContainer.clientHeight;

  if (containerHeight === 0) {
    linksContainer.style.height = "280px";
  } else {
    linksContainer.style.height = 0;
  }
});

// NAV EVENT
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  navTransition(scrollHeight);
});

// *=======  FUNCTION =======
// NAV FUNC
function navTransition(scroll) {
  if (scroll > navHeight) {
    fixedNav.classList.add("nav-bg");
  } else {
    fixedNav.classList.remove("nav-bg");
  }
}

// BENEFITS FUNC
function showBenefits(benefits) {
  benefits.forEach((benefit) => {
    const { img, title } = benefit;
    const benefitEl = document.createElement("div");
    benefitEl.classList.add("benefit");

    benefitEl.innerHTML = `
    <img src="${img}" alt="" />
    <h2 class="title">${title}</h2>`;

    benefitsEl.appendChild(benefitEl);
  });
}

// PRICELIST FUNC
function showPricelist(pricelist) {
  pricelist.forEach((priceEl) => {
    const { title, price, features1, features2 } = priceEl;
    const cardPrice = document.createElement("div");
    cardPrice.classList.add("card");

    cardPrice.innerHTML = `
    <h2 class="card-title">${title}</h2>
    <p class="body-text">Mulai dari</p>
    <h2 class="price">${price}<span>IDR</span></h2>
    <div class="featured">
      <p class="body-text">
        <i class="far fa-check-circle"></i> ${features1}
      </p>
      <p class="body-text">
        <i class="far fa-check-circle"></i> ${features2}
      </p>
    </div>
    <button class="btn">Sikat?</button>`;

    cardPricelist.appendChild(cardPrice);
  });

  const cardTitle = document.querySelectorAll(".card-title");
  cardTitle.forEach((title) => {
    if (title.innerText == "Semua Kalangan") {
      title.parentElement.classList.add("best");
    }
  });
}

// TESTIMONIALS FUNC
function showTestimonial(testimonial) {
  testimonial.forEach((testi) => {
    const { img, title, body, name, job } = testi;
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.innerHTML = `
    <img
      src="${img}"
      alt="users"
      class="picture"
    />

    <div class="testimonial-text">
      <h2 class="title">“${title}”</h2>
      <p class="body-text">
        ${body}
      </p>
      <small>- ${name}, ${job}</small>
    </div>`;

    carousel.appendChild(carouselItem);
  });

  const carousels = carousel.querySelectorAll(".carousel-item");

  // CAROUSEL BUTTON EVENT
  next.addEventListener("click", () => changeCarousel(carousels, "next"));
  prev.addEventListener("click", () => changeCarousel(carousels, "prev"));
}

// CAROUSEL FUNC
function changeCarousel(carousels, action) {
  const carouselLength = carousels.length;

  // 18 -> 600 - 582 -> translateY yang pas
  const carouselWidth = carousel.clientWidth + 18;

  if (action == "next") {
    activeCarousel++;
    if (activeCarousel > carouselLength - 1) {
      activeCarousel = 0;
    }
  } else if (action == "prev") {
    activeCarousel--;
    if (activeCarousel < 0) {
      activeCarousel = carouselLength - 1;
    }
  }

  carousels.forEach(
    (carousel) =>
      (carousel.style.transform = `translateX(-${
        activeCarousel * carouselWidth
      }px)`)
  );
}

// OUR TEAM FUNC
function showTeams(teams) {
  teams.forEach((team) => {
    const { img, name, majoring, university, desc } = team;
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");

    cardEl.innerHTML = `
    <img
      src="${img}"
      alt="team"
      class="profile-pic"
    />
    <h2 class="name">${name}</h2>
    <small>${majoring} <br />${university}</small>
    <p class="body-text">
      ${desc}
    </p>`;

    cardTeam.appendChild(cardEl);
  });
}
