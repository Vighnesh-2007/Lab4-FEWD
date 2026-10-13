
const products = [
    {
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Smart Watch",
        price: 2299,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Running Shoes",
        price: 1999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Travel Backpack",
        price: 999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Classic Sunglasses",
        price: 799,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Casual Sneakers",
        price: 1799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Digital Camera",
        price: 4999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "Leather Handbag",
        price: 1599,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "All";
const cart = [];

function displayProducts() {
    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchText);
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    productGrid.innerHTML = filteredProducts.map(product => {
        const index = products.indexOf(product);

        return `
            <article class="product">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <p class="category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="price">₹${product.price.toLocaleString("en-IN")}</p>

                <button class="add-btn" data-index="${index}">
                    Add to Cart
                </button>
            </article>
        `;
    }).join("");

    emptyMessage.hidden = filteredProducts.length !== 0;
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter.active")
            ?.classList.remove("active");

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        displayProducts();
    });
});

searchInput.addEventListener("input", displayProducts);

productGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-btn");
    if (!button) return;

    const product = products[Number(button.dataset.index)];
    cart.push(product);

    cartCount.textContent = cart.length;
    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 800);
});

cartButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce((sum, product) => {
        return sum + product.price;
    }, 0);

    const items = cart.map(product => {
        return `${product.name} - ₹${product.price}`;
    }).join("\n");

    alert(
        "YOUR SHOPPING CART\n\n" +
        items +
        "\n\nTotal: ₹" + total.toLocaleString("en-IN")
    );
});

displayProducts();
