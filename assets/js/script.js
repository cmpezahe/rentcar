"use strict";

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}

/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10
    ? header.classList.add("active")
    : header.classList.remove("active");
});

// ==== REVIEWS SECTION =================
const reviewSection = [
  {
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Lauran",
    stars: 4,
    comments:
      "Just rented with YB—effortless reservation on their user-friendly site, transparent pricing, and a spotless car. Quick pickup and return. <br><strong>Highly recommend for hassle-free rentals! Highly recommend for hassle-free rentals!</strong>",
  },
  {
    avatarUrl:
      "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: "Liam",
    stars: 5,
    comments:
      "Just had a stellar rental with YB! Smooth website, no surprises in pricing, and the car was clean and reliable. Super easy return process. <strong>Highly recommended!</strong>",
  },
  {
    avatarUrl:
      "https://cdn.pixabay.com/photo/2020/08/21/08/46/african-5505598_960_720.jpg",
    user: "Kayley",
    stars: 5,
    comments:
      "Just rented from YB and it was fantastic! Easy website, transparent pricing, and a spotless car. Quick return process too.<br> <strong>Highly recommend!</strong>",
  },
];

function createReviewsElement(review) {
  const revcontainer = document.createElement("div");
  revcontainer.classList.add("box");

  revcontainer.innerHTML = `
    <div class="rev-img">
      <img src="${review.avatarUrl}" alt="User Avatar">
    </div>

    <h2>${review.user}</h2>
    <div class="rating">
      ${"<i class='bx bxs-star'></i>".repeat(review.stars)}
    </div>
    <p><i class='bx bxs-quote-alt-left'></i>${
      review.comments
    }<i class='bx bxs-quote-alt-right'></i></p>
  `;

  return revcontainer;
}

const reveContainer = document.getElementById("reviews-container");
reviewSection.forEach((review) =>
  reveContainer.appendChild(createReviewsElement(review))
);

//! Featureed Cars
// Debugging the code
console.log("Debugging the code...");

// Updated featured cars array
const featuredCars = [
  {
    model: "Toyota RAV4",
    year: 2021,
    imageSrc: "./assets/images/woman-choosi.jpg",
    altText: "Toyota RAV4 2021",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "4 People" },
      { icon: "flash-outline", text: "Hybrid" },
      { icon: "speedometer-outline", text: "6.1km / 1-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£40",
  },

  {
    model: "BMW",
    year: 2023,
    imageSrc: "./assets/images/bmw-1.jpg",
    altText: "Toyota RAV4 2021",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "4 People" },
      { icon: "flash-outline", text: "Hybrid" },
      { icon: "speedometer-outline", text: "6.1km / 1-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£100",
  },

  {
    model: "Audi 2023",
    year: 2023,
    imageSrc: "./assets/images/Audi-1.jpg",
    altText: "Toyota RAV4 2021",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "4 People" },
      { icon: "flash-outline", text: "Hybrid" },
      { icon: "speedometer-outline", text: "6.1km / 1-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£80",
  },

  {
    model: "Tesla",
    year: 2023,
    imageSrc: "./assets/images/tesla-1.jpg",
    altText: "Toyota RAV4 2021",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "4 People" },
      { icon: "flash-outline", text: "Hybrid" },
      { icon: "speedometer-outline", text: "6.1km / 1-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£140",
  },

  {
    model: "BMW X2",
    year: 2019,
    imageSrc: "./assets/images/bmw-2.jpg",
    altText: "Toyota RAV4 2021",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "4 People" },
      { icon: "flash-outline", text: "Petrol" },
      { icon: "speedometer-outline", text: "6.1km / 2-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£206",
  },
  {
    model: "Mercedes A-Class",
    year: 2023,
    imageSrc: "./assets/images/mercede-1.jpg",
    altText: "Mercedes A-Class ",
    link: "#", // Add the appropriate link
    features: [
      { icon: "people-outline", text: "5 People" },
      { icon: "flash-outline", text: "Petrol" },
      { icon: "speedometer-outline", text: "6.1km / 2-litre" },
      { icon: "hardware-chip-outline", text: "Automatic" },
    ],
    price: "£186",
  },
  // Add more car objects as needed
];

function createFeaturedCarElement(carDetails) {
  const featuredCarCard = document.createElement("li");
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("featured-car-card");

  cardWrapper.innerHTML = `
  <figure class="card-banner">
  <img src="${carDetails.imageSrc}" alt="${
    carDetails.altText
  }" loading="lazy" width="440" height="300" class="w-100">
</figure>
    <div class="card-content">
      <div class="card-title-wrapper">
        <h3 class="h3 card-title">
          <a href="${carDetails.link}">${carDetails.model}</a>
        </h3>
        <data class="year" value="${carDetails.year}">${carDetails.year}</data>
      </div>

      <ul class="card-list">
        ${carDetails.features
          .map(
            (feature) => `
          <li class="card-list-item">
            <ion-icon name="${feature.icon}"></ion-icon>
            <span class="card-item-text">${feature.text}</span>
          </li>
        `
          )
          .join("")}
      </ul>

      <div class="card-price-wrapper">
        <p class="card-price"><strong>${carDetails.price}</strong> /Day</p>
        <button class="btn fav-btn" aria-label="Add to favourite list">
          <ion-icon name="heart-outline"></ion-icon>
        </button>
        <button class="btn">Rent now</button>
      </div>
    </div>
  `;
  featuredCarCard.appendChild(cardWrapper);
  return featuredCarCard;
}

const createFeaturedCarCards = document.getElementById("featured-car-list");
featuredCars.forEach((carDetails) =>
  createFeaturedCarCards.appendChild(createFeaturedCarElement(carDetails))
);
//================================================
// NEW CODE STARTS HERE --> BLOGS
//================================================

const createBlogs = [
  {
    image: {
      src: "./assets/images/blog-1.jpg",
      alt: "Opening of new offices of the company",
      loading: "lazy",
      class: "w-100",
    },
    badge: {
      href: "#",
      text: "Company",
      class: "btn card-badge",
    },
    title: {
      href: "#",
      text: "Opening of new offices of the company",
      class: "h3 card-title",
    },
    meta: {
      publishDate: {
        icon: "time-outline",
        datetime: "2022-01-14",
        text: "January 14, 2022",
      },
      comments: {
        icon: "chatbubble-ellipses-outline",
        value: 114,
      },
    },
  },
  {
    image: {
      src: "./assets/images/blog-1.jpg",
      alt: "Opening of new offices of the company",
      loading: "lazy",
      class: "w-100",
    },
    badge: {
      href: "#",
      text: "Company",
      class: "btn card-badge",
    },
    title: {
      href: "#",
      text: "Opening of new offices of the company",
      class: "h3 card-title",
    },
    meta: {
      publishDate: {
        icon: "time-outline",
        datetime: "2022-01-14",
        text: "January 14, 2022",
      },
      comments: {
        icon: "chatbubble-ellipses-outline",
        value: 114,
      },
    },
  },
  {
    image: {
      src: "./assets/images/blog-1.jpg",
      alt: "Opening of new offices of the company",
      loading: "lazy",
      class: "w-100",
    },
    badge: {
      href: "#",
      text: "Company",
      class: "btn card-badge",
    },
    title: {
      href: "#",
      text: "Opening of new offices of the company",
      class: "h3 card-title",
    },
    meta: {
      publishDate: {
        icon: "time-outline",
        datetime: "2022-01-14",
        text: "January 14, 2022",
      },
      comments: {
        icon: "chatbubble-ellipses-outline",
        value: 114,
      },
    },
  },
  {
    image: {
      src: "./assets/images/blog-1.jpg",
      alt: "Opening of new offices of the company",
      loading: "lazy",
      class: "w-100",
    },
    badge: {
      href: "#",
      text: "Company",
      class: "btn card-badge",
    },
    title: {
      href: "#",
      text: "Opening of new offices of the company",
      class: "h3 card-title",
    },
    meta: {
      publishDate: {
        icon: "time-outline",
        datetime: "2022-01-14",
        text: "January 14, 2022",
      },
      comments: {
        icon: "chatbubble-ellipses-outline",
        value: 114,
      },
    },
  },
];

function createBlogElement(blogCard) {
  const liElement = document.createElement("li");
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("blog-card"); // add the class to cardWrapper

  const blogWrapper = document.createElement("div");
  blogWrapper.innerHTML = `
    <figure class="card-banner">
      <a href="#">
        <img src="${blogCard.image.src}" alt="${blogCard.image.alt}" loading="${blogCard.image.loading}" class="${blogCard.image.class}" />
      </a>
      <a href="${blogCard.badge.href}" class="${blogCard.badge.class}">${blogCard.badge.text}</a>
    </figure>
    <div class="card-content">
      <h3 class="${blogCard.title.class}">
        <a href="${blogCard.title.href}">${blogCard.title.text}</a>
      </h3>
      <div class="card-meta">
        <div class="publish-date">
          <ion-icon name="${blogCard.meta.publishDate.icon}"></ion-icon>
          <time datetime="${blogCard.meta.publishDate.datetime}">${blogCard.meta.publishDate.text}</time>
        </div>
        <div class="comments">
          <ion-icon name="${blogCard.meta.comments.icon}"></ion-icon>
          <data value="${blogCard.meta.comments.value}">${blogCard.meta.comments.value}</data>
        </div>
      </div>
    </div>
  `;
  cardWrapper.appendChild(blogWrapper); // append blogWrapper to cardWrapper
  liElement.appendChild(cardWrapper); // append cardWrapper to liElement
  return liElement;
}

const createBlogContainer = document.getElementById("blog-list-id");
createBlogs.forEach((blogDetails) =>
  createBlogContainer.appendChild(createBlogElement(blogDetails))
);

// // Assuming you have a container to append this content to
// const container = document.getElementById("blog-container");
// container.innerHTML = blogCardHTML;

// === Intro Text Animations ======

("use strict");

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // rotate out letters of current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  // reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);

// ===== End Intro Text Animations =====
