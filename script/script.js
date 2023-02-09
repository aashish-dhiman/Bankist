"use strict";

const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector("#section--1");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLogin = document.querySelectorAll(".btn--login");
const btnScrollTo = document.querySelector(".btn--scroll-to");

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

//modal pop up
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
const cookie = document.createElement("div");
cookie.classList.add("cookie-message");
cookie.style.width = "100vw";
cookie.style.height = "60px";
cookie.style.backgroundColor = "#37383d";
cookie.innerHTML =
    '<p>We use Cookies for better functionality.</p> <button class="btn btn--close-cookie">Accept</button>';
header.append(cookie);

document
    .querySelector(".btn--close-cookie")
    .addEventListener("click", function () {
        cookie.remove();
    });
