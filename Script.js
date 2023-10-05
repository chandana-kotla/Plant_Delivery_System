const plants = [
    {
        id: 1,
        name: "Succulent",
        image: "images/succulent.jpg",
        price: 10.99,
        description: "A beautiful succulent plant for your home."
    },
    {
        id: 2,
        name: "Fern",
        image: "images/fern.jpg",
        price: 12.99,
        description: "A lush fern to add a touch of greenery to your space."
    },
    {
        id: 3,
        name: "Guava",
        image: "images/guava.jpg",
        price: 12.99,
        description: "A great fruit to grow in your home."
    },
];

// Initialize the shopping cart as an empty array
let shoppingCart = [];

// Function to generate a plant card
function createPlantCard(plant) {
    const card = document.createElement("div");
    card.classList.add("plant-card");

    card.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}">
        <h2>${plant.name}</h2>
        <p>${plant.description}</p>
        <p>Price: $${plant.price.toFixed(2)}</p>
        <button class="add-to-cart-button" data-id="${plant.id}">Add to Cart</button>
    `;

    return card;
}

// Function to add an item to the shopping cart
function addToCart(plantId) {
    const plant = plants.find(p => p.id === plantId);

    if (plant) {
        shoppingCart.push(plant);
        updateCart();
    }
}

// Function to update the shopping cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear previous items

    let total = 0;

    shoppingCart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);

        total += item.price;
    });

    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle the checkout button
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    shoppingCart = []; 
    updateCart();
});

// Populate the plant list
const plantList = document.getElementById("plant-list");
plants.forEach(plant => {
    const card = createPlantCard(plant);
    plantList.appendChild(card);
});
// ...

// Function to show a cart notification
function showCartNotification() {
    const cartNotification = document.querySelector(".cart-notification");
    cartNotification.style.opacity = "1";
    cartNotification.style.visibility = "visible";

    setTimeout(() => {
        cartNotification.style.opacity = "0";
        cartNotification.style.visibility = "hidden";
    }, 2000);
}
// Handle clicks on "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
addToCartButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const plantId = parseInt(event.target.getAttribute("data-id"));
        addToCart(plantId);
        showCartNotification();
    });
});
