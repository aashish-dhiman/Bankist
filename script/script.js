"use strict";

// ///////////////////////////////////
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const allSection = document.querySelectorAll(".section");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLogin = document.querySelectorAll(".btn--login");
const btnScrollTo = document.querySelector(".btn--scroll-to");

////////////////////////////////
// event listeners-->
nav.addEventListener("mouseover", function (e) {
    hoverState(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
    hoverState(e, 1);
});

btnScrollTo.addEventListener("click", function (e) {
    //modern way but not supported by all browsers-->
    section1.scrollIntoView({
        behavior: "smooth",
    });

    //old way to set
    // const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);

    // console.log(e.target.getBoundingClientRect());

    // window.scrollTo(
    //     s1coords.left + window.pageXOffset,
    //     s1coords.top + window.pageYOffset
    // );

    //old way but new method
    // window.scrollTo(
    //     s1coords.left + window.scrollX,
    //     s1coords.top + window.scrollY
    // );

    //old way with passing object with behavior--supported by all browser
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: "smooth",
    // });
});

//smooth scrolling for sections--> but inefficient if there are lot of sections this requires multiple calling of functions
// document.querySelectorAll(".nav__link").forEach(function (el) {
//     el.addEventListener("click", function (e) {
//         e.preventDefault();
//         // console.log(e.target);
//         // const id = e.target.getAttribute('href');
//         const id = this.getAttribute("href");
//         // console.log(id);
//         document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
// });

//better approach using event delegation-->
//event listener on parent element and catch the event on child element at bubbling up time
document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(e.target);
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//login
[...btnLogin].forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        window.open("https://bankist-aashish.netlify.app/");
    });
});

//tabbed component-->using event delegations
tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    // console.log(clicked);
    if (!clicked) return;

    //remove active classes
    tabs.forEach((el) => el.classList.remove("operations__tab--active"));
    tabContent.forEach((el) =>
        el.classList.remove("operations__content--active")
    );
    // console.log(tabContent.classList);

    //add active class
    clicked.classList.add("operations__tab--active");
    //activate content using data-tab
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

/////////////////////////////////////
//functions-->

//nav  hover effect-->
const hoverState = function (e, opacity) {
    // console.log(e.target);
    if (e.target.classList.contains("nav__link")) {
        const clicked = e.target;
        const sibling = e.target.closest(".nav").querySelectorAll(".nav__link");
        const logo = e.target.closest(".nav").querySelector(".nav__logo");
        // console.log(logo);
        sibling.forEach((el) => {
            if (el !== clicked) el.style.opacity = opacity;
        });

        logo.style.opacity = opacity;
    }
};

//sticky nav-->
// const coordinates = section1.getBoundingClientRect();
// // console.log(coordinates);
// window.addEventListener("scroll", function () {
//     if (window.scrollY > coordinates.top) nav.classList.add("sticky");
//     else nav.classList.remove("sticky");
// });

//sticky nav using intersection observer api-->
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const observeHeader = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);
    // console.log(observer);
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};
const options = {
    root: null,
    threshold: 0.1,
    rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(observeHeader, options);
observer.observe(header);

//section visible effects-->
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    // console.log(entry);
    observer.unobserve(entry.target);
};
const SectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSection.forEach((section) => {
    SectionObserver.observe(section);
    section.classList.add("section--hidden");
});

//modal pop up-->
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// cookie section
// const cookie = document.createElement("div");
// cookie.classList.add("cookie-message");
// cookie.style.width = "100vw";
// cookie.style.height = "60px";
// cookie.style.backgroundColor = "#37383d";
// cookie.innerHTML =
//     '<p>We use Cookies for better functionality.</p> <button class="btn btn--close-cookie">Accept</button>';
// header.append(cookie);

// document
//     .querySelector(".btn--close-cookie")
//     .addEventListener("click", function () {
//         cookie.remove();
//     });
