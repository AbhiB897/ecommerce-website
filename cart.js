const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * 85;

        cartItems.innerHTML += `
            <div class="product-card">
                <img src="${item.image}">
                <h3>${item.title}</h3>
                <p>₹${Math.floor(item.price * 85)}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartTotal.innerText = Math.floor(total);
}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

loadCart();