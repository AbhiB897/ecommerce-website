// =========================
// DOM Elements
// =========================

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const cartCount = document.getElementById("cartCount");
const darkModeBtn = document.getElementById("darkModeBtn");

// =========================
// Data
// =========================

let allProducts = [];

// =========================
// Load Cart Count
// =========================

function updateCartCount() {

    const cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cartCount.innerText = cart.length;
}

updateCartCount();

// =========================
// Fetch Products
// =========================

async function fetchProducts() {

    try {

        const response = await fetch(
            "https://fakestoreapi.com/products"
        );

        const data = await response.json();

        allProducts = data;

        displayProducts(allProducts);

    } catch (error) {

        productsContainer.innerHTML =
        `
            <h2>
                Failed To Load Products
            </h2>
        `;

        console.log(error);
    }
}

fetchProducts();

// =========================
// Display Products
// =========================

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `
        
            <img src="${product.image}" alt="${product.title}">

            <div class="product-info">

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-price">
                    ₹${Math.floor(product.price * 85)}
                </p>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                    </button>

                    <button
                        class="wishlist-btn"
                        onclick="addToWishlist(${product.id})"
                    >
                        ❤
                    </button>

                </div>

            </div>

        `;

        productsContainer.appendChild(card);

    });

}

// =========================
// Add To Cart
// =========================

function addToCart(id) {

    const product = allProducts.find(
        item => item.id === id
    );

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert("Product Added To Cart");
}

// =========================
// Wishlist
// =========================

function addToWishlist(id) {

    const product = allProducts.find(
        item => item.id === id
    );

    let wishlist = JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

    const exists = wishlist.find(
        item => item.id === id
    );

    if(exists){

        alert("Already In Wishlist");

        return;
    }

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Added To Wishlist");
}

// =========================
// Search
// =========================

searchInput.addEventListener(
    "keyup",
    () => {

        const keyword =
        searchInput.value.toLowerCase();

        const filteredProducts =
        allProducts.filter(product =>
            product.title
            .toLowerCase()
            .includes(keyword)
        );

        displayProducts(filteredProducts);

    }
);

// =========================
// Category Filter
// =========================

categoryFilter.addEventListener(
    "change",
    () => {

        const selectedCategory =
        categoryFilter.value;

        if(selectedCategory === "all"){

            displayProducts(allProducts);

            return;
        }

        const filteredProducts =
        allProducts.filter(
            product =>
            product.category === selectedCategory
        );

        displayProducts(filteredProducts);

    }
);

// =========================
// Price Sort
// =========================

sortPrice.addEventListener(
    "change",
    () => {

        const productsCopy =
        [...allProducts];

        if(
            sortPrice.value ===
            "low-high"
        ){

            productsCopy.sort(
                (a,b) =>
                a.price - b.price
            );
        }

        if(
            sortPrice.value ===
            "high-low"
        ){

            productsCopy.sort(
                (a,b) =>
                b.price - a.price
            );
        }

        displayProducts(productsCopy);

    }
);

// =========================
// Dark Mode
// =========================

if(
    localStorage.getItem("theme")
    === "dark"
){
    document.body.classList.add(
        "dark-mode"
    );
}

darkModeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){

            localStorage.setItem(
                "theme",
                "dark"
            );

        }else{

            localStorage.setItem(
                "theme",
                "light"
            );
        }
    }
);