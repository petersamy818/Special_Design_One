// Check If There's Local Storage Color Option-----------------------------------
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"));
    // Remove Active Class From All Colors List Items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        //Add Active Class On Element With Data-Color === Local Storage Item
        if (element.dataset.color === mainColor) {
            // Add Active Class
            element.classList.add("active");
        }
    });
}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;

// Toggle Spin Class On Icon-----------------------------------------------------
document.querySelector(".toggle-settings .settings-gear").onclick = function () {
    // Toggle Class fa-spin For Rotation On Self
    this.classList.toggle("fa-spin");
    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors-----------------------------------------------------------------
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach(li => {
    // Click On Every List Item
    li.addEventListener("click", (e) => {
        // Set Color On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color-option", e.target.dataset.color);
        // Remove Class Active From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // Add Active Class On The Active Element
        e.target.classList.add("active");
    });
});

// Switch Random Backgrounds Option----------------------------------------------
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach(span => {
    // Click On Every span
    span.addEventListener("click", (e) => {
        // Remove Class Active From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        // Add Active Class On The Active Element
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    });
});

// Select Landing Page Element---------------------------------------------------
let landingPage = document.querySelector(".landing-page");
// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval =  setInterval(() => {
        // Get Random Number
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        // Change Background Img URL
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber]+ '")';
        }, 10000);
    }
}