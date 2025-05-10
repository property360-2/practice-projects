const cart = [];

function addToCart(product, price) {
    const existingItem = cart.find((item) => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(product) {
    const index = cart.findIndex((item) => item.product === product);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    renderCart();
}

function updateQuantity(product, quantity) {
    const item = cart.find((item) => item.product === product);
    if (item) {
        item.quantity = quantity;
    }
    renderCart();
}

function calculateTotal() {
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}

function renderCart() {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = "";

    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.product} - $${item.price} x ${item.quantity} `;

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = () => updateQuantity(item.product, parseInt(quantityInput.value));

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(item.product);

        listItem.appendChild(quantityInput);
        listItem.appendChild(removeButton);
        cartElement.appendChild(listItem);
    });

    document.getElementById("total").innerText = calculateTotal();
}
