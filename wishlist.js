const wishlistItems =
document.getElementById("wishlistItems");

let wishlist =
JSON.parse(
localStorage.getItem("wishlist")
) || [];

wishlist.forEach(item => {

    wishlistItems.innerHTML += `
        <div class="product-card">
            <img src="${item.image}">
            <h3>${item.title}</h3>
            <p>₹${Math.floor(item.price * 85)}</p>
        </div>
    `;
});