"use strict";

const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnLogin = document.querySelectorAll(".btn--login");

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
cookie.style.width = "105%";
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
