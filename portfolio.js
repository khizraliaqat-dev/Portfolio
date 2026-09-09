

let year = document.getElementById("year");

year.textContent = new Date().getFullYear();
// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// ================= MOBILE NAVBAR =================

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

// Open / Close mobile menu
menuBtn.addEventListener("click", function () {

    const isOpen = mobileMenu.classList.contains("hidden");

    // Toggle menu
    mobileMenu.classList.toggle("hidden");

    // Toggle icons
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");

    // Update accessibility
    menuBtn.setAttribute("aria-expanded", isOpen);

});

// Close menu after clicking navigation link
document.querySelectorAll(".mobile-link").forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.add("hidden");

        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");

        menuBtn.setAttribute("aria-expanded", "false");

    });

});


// ================= CONTACT FORM =================

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");
    const formSuccess = document.getElementById("form-success");
    // Clear old errors
  nameError.textContent = "";
  emailError.textContent = ""; 
  subjectError.textContent = "";
  messageError.textContent = "";
  formSuccess.textContent = "";
  formSuccess.classList.add("hidden");

    let isValid = true;

    // Name
    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }

    // Email
    if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    }
    else if (!email.value.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    // Subject
    if (subject.value.trim() === "") {
        subjectError.textContent = "Please enter a subject.";
        isValid = false;
    }

    // Message
    if (message.value.trim() === "") {
        messageError.textContent = "Please enter your message.";
        isValid = false;
    }

    // If everything is correct
    if (isValid) {

    formSuccess.textContent =
        "Thank you, " + name.value.trim() +
        "! Your message has been submitted successfully.";

    formSuccess.classList.remove("hidden");

    form.reset();

}

});

// ================= PROJECT DETAILS MODAL =================

const projectButtons = document.querySelectorAll(".project-details");

const projectModal = document.getElementById("project-modal");
const closeModal = document.getElementById("close-modal");

const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTech = document.getElementById("modal-tech");
const modalFeatures = document.getElementById("modal-features");


// Project information

const projects = {

    blood: {
        title: "🩸 Blood Donation System",
        description: "A web-based blood donation system where users can register as donors, request blood, and manage donations through an admin panel.",
        tech: "HTML, CSS, Python",
        features: "Donor Registration, Blood Request, Admin Panel, Donation Management"
    },

    resqnet: {
        title: "🚑 ResQNet",
        description: "A disaster management system designed to coordinate volunteers, manage shelters, and handle emergency requests.",
        tech: "C#, OOP, SQL Server, WPF",
        features: "Disaster Management, Volunteer Matching, Shelter Management, Emergency Requests"
    },

    portfolio: {
        title: "👩‍💻 Personal Portfolio",
        description: "A responsive personal portfolio website created to showcase my skills, projects, education, and experience.",
        tech: "HTML, Tailwind CSS, JavaScript",
        features: "Responsive Design, Project Showcase, Contact Form, Mobile Navigation"
    },

    ecommerce: {
        title: "🛒 E-Commerce Website",
        description: "A responsive e-commerce website UI featuring product listings, categories, and a modern shopping experience.",
        tech: "HTML, Tailwind CSS, JavaScript",
        features: "Product Listings, Categories, Responsive UI, Shopping Experience"
    }

};


// Open modal

projectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const projectName = button.dataset.project;

        const project = projects[projectName];

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTech.textContent = project.tech;
        modalFeatures.textContent = project.features;

        projectModal.classList.remove("hidden");

    });

});


// Close modal

closeModal.addEventListener("click", function() {

    projectModal.classList.add("hidden");

});


// Close modal when clicking outside

projectModal.addEventListener("click", function(event) {

    if (event.target === projectModal) {

        projectModal.classList.add("hidden");

    }

});

// ================= PROJECT FILTER =================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.filter;

        projectCards.forEach(function(card) {

            const category = card.dataset.category;

            if (selectedCategory === "all" || category === selectedCategory) {
                card.classList.remove("hidden");
            } 
            else {
                card.classList.add("hidden");
            }

        });

    });

});


// ================= ACTIVE NAVBAR LINK =================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("text-yellow-300");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("text-yellow-300");
        }

    });

});
// ================= TYPING ANIMATION =================

const typingText = document.getElementById("typing-text");

const words = [
    "Frontend Developer",
    "Web Developer",
    "JavaScript Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 70 : 120);
}

typeEffect();

