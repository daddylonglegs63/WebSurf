 // Initialize Lucide icons
 lucide.createIcons();

 // Navbar scroll effect
 window.addEventListener('scroll', () => {
     const navbar = document.getElementById('navbar');
     if (window.scrollY > 50) {
         navbar.classList.add('nav-scrolled');
     } else {
         navbar.classList.remove('nav-scrolled');
     }
 });

 // Theme toggle functionality
 const themeToggle = document.getElementById('themeToggle');
 const themeIcon = document.getElementById('themeIcon');
 const html = document.documentElement;

 // Check for saved theme preference
 const savedTheme = localStorage.getItem('theme') || 'light';
 html.setAttribute('data-theme', savedTheme);
 updateThemeIcon(savedTheme);

 themeToggle.addEventListener('click', () => {
     const currentTheme = html.getAttribute('data-theme');
     const newTheme = currentTheme === 'light' ? 'dark' : 'light';

     html.setAttribute('data-theme', newTheme);
     localStorage.setItem('theme', newTheme);
     updateThemeIcon(newTheme);
 });

 function updateThemeIcon(theme) {
     themeIcon.outerHTML = theme === 'light' ?
         '<i data-lucide="moon" class="w-5 h-5"></i>' :
         '<i data-lucide="sun" class="w-5 h-5"></i>';
     lucide.createIcons();
 }

 document.addEventListener('DOMContentLoaded', () => {
     const heroContent = document.querySelector('.hero-content');

     document.addEventListener('mousemove', (e) => {
         const {
             clientX,
             clientY
         } = e;
         const {
             innerWidth,
             innerHeight
         } = window;

         const xAxis = (clientX - innerWidth / 2) / 50;
         const yAxis = (clientY - innerHeight / 2) / 50;

         heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
     });

     // Reset transform when mouse leaves
     document.addEventListener('mouseleave', () => {
         heroContent.style.transform = 'rotateY(0) rotateX(0)';
     });
 });

 // Intersection Observer for stats animation
 const statsSection = document.querySelector('.stats-section');
 const statNumbers = document.querySelectorAll('.stat-number');
 let animated = false;

 const animateStats = () => {
     statNumbers.forEach(stat => {
         const target = parseInt(stat.getAttribute('data-target'));
         const duration = 2000; // Animation duration in milliseconds
         const steps = 50; // Number of steps in the animation
         const stepValue = target / steps;
         let current = 0;

         const updateNumber = () => {
             current += stepValue;
             if (current < target) {
                 stat.textContent = Math.round(current);
                 requestAnimationFrame(updateNumber);
             } else {
                 stat.textContent = target;
                 // Add "+" symbol if it's not the support hours
                 if (target !== 24) {
                     stat.textContent += "+";
                 }
             }
         };

         updateNumber();
     });
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting && !animated) {
             animated = true;
             animateStats();
         }
     });
 }, {
     threshold: 0.5
 });

 observer.observe(statsSection);

 // Optional: Reset animation when scrolling back to top
 window.addEventListener('scroll', () => {
     if (window.scrollY === 0) {
         animated = false;
         statNumbers.forEach(stat => {
             stat.textContent = "0";
         });
     }
 });

 // Intersection Observer for project cards animation
 const projectObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('animate');
         }
     });
 }, {
     threshold: 0.1
 });

 // Observe all project cards and view all button
 document.querySelectorAll('.project-card, .view-all-btn').forEach(el => {
     projectObserver.observe(el);
 });