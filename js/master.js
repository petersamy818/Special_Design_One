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

// Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Remove Class Active From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

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
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
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