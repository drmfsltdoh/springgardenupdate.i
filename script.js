
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('.html', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        } else {
            window.open(this.getAttribute('href'), '_blank'); // Open in new tab
        }
    });
});


const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

   
    showSlide(currentSlide);
}

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message); // Show response message
});

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token); // Save JWT token
        alert("Login successful!");
    } else {
        alert("Login failed: " + data.message);
    }
});

const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll(".slider img");
    slideIndex += step;
    
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    document.querySelector(".slider").style.transform = `translateX(${-slideIndex * 100}%)`;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


// Toggle chat box visibility
function toggleChat() {
    let chatBox = document.getElementById("chat-box");
    chatBox.style.display = (chatBox.style.display === "none" || chatBox.style.display === "") ? "block" : "none";
}

// Send chat message
function sendMessage(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("chat-input");
        let message = input.value.trim();
        if (message !== "") {
            let chatMessages = document.getElementById("chat-messages");
            let newMessage = document.createElement("p");
            newMessage.textContent = "You: " + message;
            chatMessages.appendChild(newMessage);
            input.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}

// Admin - Load Messages
function loadMessages() {
    let chatMessages = document.getElementById("chat-messages");
    database.ref("messages").on("child_added", function(snapshot) {
        let data = snapshot.val();
        let newMessage = document.createElement("p");
        newMessage.textContent = data.user + ": " + data.text;
        chatMessages.appendChild(newMessage);
    });
}

// Admin - Send Reply
function sendAdminMessage(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("admin-input");
        let message = input.value.trim();
        if (message !== "") {
            let chatRef = database.ref("messages").push();
            chatRef.set({
                user: "Admin",
                text: message,
                timestamp: Date.now()
            });
            input.value = "";
        }
    }
}

// Load messages when admin panel opens
if (document.getElementById("chat-messages")) {
    loadMessages();
}

// Hardcoded admin credentials (For now, later move to a database)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

// Admin Login Function
function adminLogin() {
    let username = document.getElementById("admin-username").value;
    let password = document.getElementById("admin-password").value;
    let errorText = document.getElementById("login-error");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";  // Redirect to admin panel
    } else {
        errorText.textContent = "Invalid username or password!";
    }
}

// Check if Admin is Logged In (Protect admin.html)
if (window.location.pathname.includes("admin.html")) {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";  // Redirect to login page
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let lazyImages = document.querySelectorAll("img[data-src]");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => observer.observe(img));
});

// Minimize JavaScript execution time
window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.style.opacity = 1; // Smooth loading effect
    }, 300);
});