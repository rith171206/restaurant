document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Menu items data
    const menuItems = [
        {
            id: 1,
            name: "Bruschetta",
            description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
            price: "$8.99",
            category: "starters",
            image: "images/dish1.jpg"
        },
        {
            id: 2,
            name: "Caesar Salad",
            description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
            price: "$10.99",
            category: "starters",
            image: "images/dish2.jpg"
        },
        {
            id: 3,
            name: "Grilled Salmon",
            description: "Fresh salmon fillet with lemon butter sauce and seasonal vegetables",
            price: "$22.99",
            category: "mains",
            image: "images/dish3.jpg"
        },
        {
            id: 4,
            name: "Filet Mignon",
            description: "8oz tender beef filet with red wine reduction and mashed potatoes",
            price: "$29.99",
            category: "mains",
            image: "images/dish4.jpg"
        },
        {
            id: 5,
            name: "Mushroom Risotto",
            description: "Creamy arborio rice with wild mushrooms and parmesan",
            price: "$18.99",
            category: "mains",
            image: "images/dish5.jpg"
        },
        {
            id: 6,
            name: "Tiramisu",
            description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
            price: "$7.99",
            category: "desserts",
            image: "images/dish6.jpg"
        },
        {
            id: 7,
            name: "Chocolate Lava Cake",
            description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
            price: "$8.99",
            category: "desserts",
            image: "images/dish7.jpg"
        },
        {
            id: 8,
            name: "Cheese Platter",
            description: "Selection of artisan cheeses with fruits and crackers",
            price: "$12.99",
            category: "starters",
            image: "images/dish8.jpg"
        }
    ];
    
    // Load menu items
    const menuContainer = document.querySelector('.menu-items');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    function loadMenuItems(category = 'all') {
        menuContainer.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
            
        filteredItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menu-item');
            menuItemElement.innerHTML = `
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="price">${item.price}</span>
                </div>
            `;
            menuContainer.appendChild(menuItemElement);
        });
    }
    
    // Initial load
    loadMenuItems();
    
    // Filter menu items by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Load items
            loadMenuItems(category);
        });
    });
    
    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Form submission
    const reservationForm = document.getElementById('reservation-form');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const reservation = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests')
        };
        
        // In a real app, you would send this to a server
        console.log('Reservation submitted:', reservation);
        
        // Show success message
        alert('Thank you for your reservation! We will confirm shortly.');
        this.reset();
    });
});