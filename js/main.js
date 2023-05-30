// Sección para animaciones de pagina
var element = document.querySelector('.products-content');
var windowHeight = window.innerHeight;
var isVisible = false;

function checkVisibility() {
    var position = element.getBoundingClientRect().top;

    if (position - windowHeight <= 0 && !isVisible) {
        element.classList.add('show');
        element.classList.remove('hide');
        isVisible = true;
    } else if (position > windowHeight && isVisible) {
        element.classList.add('hide');
        element.classList.remove('show');
        isVisible = false;
    }
}

window.addEventListener('scroll', checkVisibility);

// Lista de productos
const products = [
    {
        name: "MacBook Pro M2",
        price: 13399000,
        image: "../assets/images/store/img_product9.png",
        category: "mac"
    },
    {
        name: "MacBook Pro",
        price: 8099000,
        image: "../assets/images/store/img_product10.png",
        category: "mac"
    },
    {
        name: "MacBook Air",
        price: 4799000,
        image: "../assets/images/store/img_product11.png",
        category: "mac"
    },
    {
        name: "iPhone 14 Pro",
        price: 6249000,
        image: "../assets/images/store/img_product1.png",
        category: "iphone"
    },
    {
        name: "iPhone 14",
        price: 5569000,
        image: "../assets/images/store/img_product2.png",
        category: "iphone"
    },
    {
        name: "iPhone 13 Pro",
        price: 5099000,
        image: "../assets/images/store/img_product3.png",
        category: "iphone"
    },
    {
        name: "iPhone 12",
        price: 3669000,
        image: "../assets/images/store/img_product4.png",
        category: "iphone"
    },
    {
        name: "iPhone 11",
        price: 2399000,
        image: "../assets/images/store/img_product5.png",
        category: "iphone"
    },
    {
        name: "iPad Pro",
        price: 5749000,
        image: "../assets/images/store/img_product6.png",
        category: "ipad"
    },
    {
        name: "iPad Air",
        price: 3399000,
        image: "../assets/images/store/img_product7.png",
        category: "ipad"
    },
    {
        name: "iPad",
        price: 1839000,
        image: "../assets/images/store/img_product13.png",
        category: "ipad"
    },
    {
        name: "iPad mini",
        price: 3099000,
        image: "../assets/images/store/img_product8.png",
        category: "ipad"
    },
    {
        name: "Apple Watch Series 8",
        price: 2399000,
        image: "../assets/images/store/img_product14.png",
        category: "applewatch"
    },
    {
        name: "Apple Watch SE",
        price: 1499000,
        image: "../assets/images/store/img_product15.png",
        category: "applewatch"
    },
    {
        name: "Apple Watch Series 7",
        price: 1699000,
        image: "../assets/images/store/img_product16.png",
        category: "applewatch"
    }
];

// Obtener elementos del DOM
const productGrid = document.querySelector('.product-grid');
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar los productos en el grid
function renderProducts() {
    productGrid.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        const productHTML = generateProductHTML(products[i]);
        productGrid.appendChild(productHTML);
    }
}

// Generar el HTML para un producto
function generateProductHTML(product) {
    const productHTML = document.createElement('div');
    productHTML.classList.add('product', product.category);

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;
    productHTML.appendChild(image);

    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productHTML.appendChild(productName);

    const price = document.createElement('p');
    price.textContent = `Precio: $${product.price}`;
    productHTML.appendChild(price);

    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.textContent = 'Agregar al carrito ';
    addToCartButton.addEventListener('click', () => addToCart(product));

    addToCartButton.classList.add('custom-button');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-shopping-cart');
    addToCartButton.appendChild(icon);

    productHTML.appendChild(addToCartButton);

    return productHTML;
}

//  Mostrar en pantalla producto agregado
function showNotification(message) {
    const notificationContainer = document.getElementById('notification');
    notificationContainer.textContent = message;
    notificationContainer.classList.add('show');

    setTimeout(() => {
        notificationContainer.textContent = '';
        notificationContainer.classList.remove('show');
    }, 3000);
}

// Agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.name} ha sido agregado al carrito`);
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Producto eliminado del carrito');
}

// Actualizar el carrito y el localStorage
function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = item.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => removeFromCart(index));
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);
        totalPrice += item.price;
    });
    totalAmount.textContent = totalPrice;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Obtener elementos del DOM para el popup
const popupContainer = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');
const purchaseItems = document.getElementById('purchase-items');
const purchaseTotal = document.getElementById('purchase-total');

// Evento del botón de compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        showPurchaseInfo();
        cart = [];
        updateCart();
    }
});

// Mostrar la información de compra en el popup
function showPurchaseInfo() {
    purchaseItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        purchaseItems.appendChild(listItem);
        totalPrice += item.price;
    });
    purchaseTotal.textContent = totalPrice;
    showPopup();
}

function showPopup() {
    popupContainer.classList.add('show');
}

function closePopup() {
    popupContainer.classList.remove('show');
}

closePopupBtn.addEventListener('click', closePopup);

// Mantener datos del localStorage al cargar pagina
document.addEventListener('DOMContentLoaded', () => {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
});

renderProducts();

// Sección para filtrado de productos
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.querySelector('.product-grid');
const allProducts = productsGrid.querySelectorAll('.product');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;

        if (category === 'all') {
            productsGrid.classList.remove('filtered');
            allProducts.forEach(product => {
                product.style.display = 'block';
            });
        } else {
            productsGrid.classList.add('filtered');
            allProducts.forEach(product => {
                if (product.classList.contains(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    });
});