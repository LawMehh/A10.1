document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to add item to the cart
    function addToCart(event) {
        const productElement = event.target.closest('.product');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        // Check if item is already in the cart
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    // Function to remove item from the cart
    function removeFromCart(event) {
        const itemName = event.target.closest('.cart-item').getAttribute('data-name');

        const itemIndex = cartItems.findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity--;
            if (cartItems[itemIndex].quantity === 0) {
                cartItems.splice(itemIndex, 1);
            }
        }

        updateCart();
    }

    // Function to update the cart display
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.className = 'cart-item';
            cartItemElement.setAttribute('data-name', item.name);
            cartItemElement.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button class="remove-from-cart">Remove</button>
            `;
            cartItemsElement.appendChild(cartItemElement);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        setRemoveEventListeners();
    }

    // Function to set event listeners for remove buttons
    function setRemoveEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }

    // Function to handle checkout
    function checkout() {
        alert(`Checked out with total price: $${totalPriceElement.textContent.split('$')[1]}`);
        cartItems.length = 0;
        updateCart();
    }

    // Event listeners for add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Event listener for checkout button
    document.getElementById('checkout-btn').addEventListener('click', checkout);
});
