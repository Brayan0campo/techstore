// Se obtienen las referencias a los elementos del DOM que se utilizarán en el código
const productGrid = document.querySelector('.product-grid');
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Inicializar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const productsJson = "/json/products.json";

// Renderizar los productos en el grid (fetch)
function renderProducts() {
    fetch(productsJson) 
        .then(response => response.json())
        .then(data => {
            const products = data;

            productGrid.innerHTML = '';
            for (let i = 0; i < products.length; i++) {
                const productHTML = generateProductHTML(products[i]);
                productGrid.appendChild(productHTML);
            }
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Generar elementos HTML para un producto
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

// Mostrar en pantalla producto agregado
function showNotification(message) {
    Swal.fire({
        text: message,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
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

// Evento del botón de compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        showPurchaseInfo();
        cart = [];
        updateCart();
    }
});

// Mostrar la información de compra
function showPurchaseInfo() {
    let totalPrice = 0;
    const purchaseItemsHTML = cart.map(item => {
        totalPrice += item.price;
        return `${item.name} - $${item.price}`;
    });

    Swal.fire({
        title: 'Compra realizada',
        html: `
        <ul>
          ${purchaseItemsHTML.map(item => `<li>${item}</li>`).join('')}
        </ul><br>
        <p>Total: $${totalPrice}</p>
      `,
        icon: 'success',
        showConfirmButton: false
    });
}

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

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        if (category === 'all') {
            productsGrid.classList.remove('filtered');
            productsGrid.querySelectorAll('.product').forEach(product => {
                product.style.display = 'block';
            });
        } else {
            productsGrid.classList.add('filtered');
            productsGrid.querySelectorAll('.product').forEach(product => {
                if (product.classList.contains(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    });
});