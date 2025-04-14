document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const slidingCart = document.getElementById("sliding-cart");
    const cartContent = document.getElementById("sliding-cart-content");
    const cartTotal = document.getElementById("cart-total");
    const cartIcon = document.getElementById("cart-icon");
    const closeCartBtn = document.getElementById("close-cart-btn");

    function renderCart() {
        cartContent.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <p>${item.productName} (x${item.quantity})</p>
                <p>$${item.price * item.quantity}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartContent.appendChild(itemElement);
        });

        cartTotal.textContent = `Total: $${total}`;
    }

    function toggleCart(open) {
        if (open) {
            slidingCart.classList.add("open");
        } else {
            slidingCart.classList.remove("open");
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    cartIcon.addEventListener("click", () => toggleCart(true));
    closeCartBtn.addEventListener("click", () => toggleCart(false));

    renderCart();

    // Expose removeFromCart globally for inline event handlers
    window.removeFromCart = removeFromCart;
});
