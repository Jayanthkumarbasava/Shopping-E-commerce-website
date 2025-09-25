// Product data
const products = [
    {
        id: 1,
        name: "Vintage Linen Shirt",
        category: "shirt",
        price: 3500,
        image: "./images/vintage lennin shirt.png",
        description: "A comfortable and stylish linen shirt with a relaxed fit, perfect for casual outings.",
        specs: {
            "Brand": "Urban Threads",
            "Material": "100% Linen",
            "Sizes": "S, M, L, XL",
            "Color": "Off-white",
            "Style": "Casual"
        }
    },
    {
        id: 2,
        name: "Classic Denim Jeans",
        category: "pants",
        price: 6500,
        image: "./images/classic denim jeans.png",
        description: "Timeless straight-fit denim jeans that are durable and versatile for any look.",
        specs: {
            "Brand": "Denim Co.",
            "Material": "98% Cotton, 2% Spandex",
            "Sizes": "28-38",
            "Color": "Dark Blue",
            "Fit": "Straight"
        }
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        category: "dress",
        price: 5000,
        image: "./images/foral summer design.png",
        description: "A lightweight, flowy dress with a vibrant floral pattern, ideal for warm weather.",
        specs: {
            "Brand": "Spring Bloom",
            "Material": "Polyester Blend",
            "Sizes": "XS, S, M, L",
            "Color": "Multicolor",
            "Length": "Knee-length"
        }
    },
    {
        id: 4,
        name: "Striped Cotton T-Shirt",
        category: "shirt",
        price: 2500,
        image: "./images/stripped cotton tshirt.png",
        description: "A classic crew-neck t-shirt with a subtle stripe pattern, made from soft cotton.",
        specs: {
            "Brand": "Basic Wear",
            "Material": "100% Cotton",
            "Sizes": "XS, S, M, L, XL",
            "Color": "Navy/White",
            "Fit": "Regular"
        }
    },
    {
        id: 5,
        name: "High-Waisted Trousers",
        category: "pants",
        price: 7500,
        image: "./images/high waisted.png",
        description: "Elegant high-waisted trousers with a wide-leg cut for a sophisticated silhouette.",
        specs: {
            "Brand": "Formal Edit",
            "Material": "Wool Blend",
            "Sizes": "26-34",
            "Color": "Charcoal Grey",
            "Waist": "High"
        }
    },
    {
        id: 6,
        name: "Elegant Evening Gown",
        category: "dress",
        price: 12000,
        image: "./images/elegant Evening Gown.png",
        description: "A floor-length gown with intricate detailing, perfect for formal events and parties.",
        specs: {
            "Brand": "Luxe Attire",
            "Material": "Silk Chiffon",
            "Sizes": "S, M, L",
            "Color": "Burgundy",
            "Occasion": "Formal"
        }
    },
    {
        id: 7,
        name: "Printed Graphic Tee",
        category: "shirt",
        price: 3000,
        image: "./images/Printed Graphic Tee.png",
        description: "A comfortable and expressive graphic tee with a unique, artistic print.",
        specs: {
            "Brand": "Artful Style",
            "Material": "Cotton-Poly Blend",
            "Sizes": "S, M, L, XL",
            "Color": "Black",
            "Design": "Abstract Print"
        }
    },
    {
        id: 8,
        name: "Cargo Jogger Pants",
        category: "pants",
        price: 5500,
        image: "./images/Cargo Jogger Pants.png",
        description: "Stylish and functional cargo joggers with multiple pockets, perfect for street style.",
        specs: {
            "Brand": "Street Ready",
            "Material": "Durable Canvas",
            "Sizes": "S, M, L",
            "Color": "Khaki",
            "Style": "Utility"
        }
    }
];

// Shopping cart state
let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('product-modal');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.getElementById('modal-image');
const modalPrice = document.querySelector('.modal-price');
const modalCategory = document.querySelector('.modal-category');
const modalDescription = document.querySelector('.modal-description');
const modalSpecs = document.getElementById('modal-specs');
const modalClose = document.querySelector('.modal-close');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const cartCountElement = document.querySelector('.cart-count');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Render products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const priceBadgeColor = product.price < 4000 ? 'warm-pink' :
                                product.price < 8000 ? 'dusty-blue' : 'forest-green';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="price-badge ${priceBadgeColor}">${product.price}</span>
            </div>
            <div class="content">
                <h4>${product.name}</h4>
                <p>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <button class="btn btn-primary view-details" data-id="${product.id}">View Details</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Event listeners
function setupEventListeners() {
    // Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
            renderProducts(filtered);
        });
    });

    // View details and Add to Cart (delegation)
    document.addEventListener('click', e => {
        if (e.target.classList.contains('view-details')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) showProductModal(product);
        } else if (e.target.closest('.btn-add-to-cart')) {
            const productId = parseInt(modal.dataset.productId);
            const productToAdd = products.find(p => p.id === productId);
            if (productToAdd) {
                cart.push(productToAdd);
                updateCartCount();
                alert(`${productToAdd.name} has been added to your cart.`);
                closeModal();
            }
        }
    });

    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Here you would typically send the data to a server
                console.log('Form submitted:', { name, email, message });
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                contactForm.reset();
            } else {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.style.color = 'red';
            }
        });
    }
}

// Show modal
function showProductModal(product) {
    modal.dataset.productId = product.id;
    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalPrice.textContent = product.price;
    modalCategory.textContent = product.category;
    modalDescription.textContent = product.description;

    modalSpecs.innerHTML = '';
    for (const [key, value] of Object.entries(product.specs)) {
        const spec = document.createElement('div');
        spec.className = 'spec-item';
        spec.innerHTML = `<span>${key}:</span><span>${value}</span>`;
        modalSpecs.appendChild(spec);
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Update the cart count
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}