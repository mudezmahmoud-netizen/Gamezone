const games = [
  {
    id: 1,
    name: "Shadow Realm",
    category: "Action",
    price: 59.99,
    image: "images/shadow realm.jpeg",
    description: "Explore mysterious worlds and fight powerful enemies.",
  },
  {
    id: 2,
    name: "Warzone Ops",
    category: "Action",
    price: 49.99,
    image: "images/military shooting.avif",
    description: "Experience exciting battles and challenging missions.",
  },
  {
    id: 3,
    name: "Turbo Legends",
    category: "Racing",
    price: 39.99,
    image: "images/car race.avif",
    description: "Race through exciting tracks and compete to win.",
  },
  {
    id: 4,
    name: "Block World",
    category: "Adventure",
    price: 29.99,
    image: "images/adventure and building.jpeg",
    description: "Build your own world and discover new adventures.",
  },
  {
    id: 5,
    name: "Phantom Blade",
    category: "Action",
    price: 54.99,
    image: "images/release1.jpeg",
    description: "Enter a world of mystery and powerful warriors.",
  },
  {
    id: 6,
    name: "GTA VI",
    category: "Adventure",
    price: 69.99,
    image: "images/GTA VI.jpg",
    description: "Explore an exciting open-world adventure.",
  },
  {
    id: 7,
    name: "Battle Legends",
    category: "Multiplayer",
    price: 44.99,
    image: "images/release3.jpeg",
    description: "Join friends and compete in exciting battles.",
  },
];
function getStorageData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error("Storage error:", error);
    return [];
  }
}
function saveStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Unable to save data:", error);
    alert("Your browser could not save this data.");
  }
}
function removeStorageData(key) {
  localStorage.removeItem(key);
}
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const gamesContainer = document.getElementById("gamesContainer");

function displayGames(gameList) {
  if (!gamesContainer) return;

  gamesContainer.innerHTML = "";

  if (gameList.length === 0) {
    gamesContainer.innerHTML = "<p>No games found.</p>";

    return;
  }

  gameList.forEach((game) => {
    const card = document.createElement("div");

    card.className = "game-card";

    const wishlist = getWishlist();

    const saved = wishlist.includes(game.id);

    card.innerHTML = `
            <img src="${game.image}" alt="${game.name}">

            <div class="game-info">

                <span class="game-category">${game.category}</span>

                <h3>${game.name}</h3>

                <p>${game.description}</p>

                <div class="game-price">
                    <strong>KES ${game.price.toFixed(2)}</strong>
                </div>

                <button class="wishlist-btn" data-id="${game.id}">
                    ${saved ? "Saved to Wishlist" : "Add to Wishlist"}
                </button>

            </div>
        `;

    gamesContainer.appendChild(card);
  });
}

function handleGames() {
  if (!gamesContainer) return;

  let results = [...games];

  if (searchInput) {
    const search = searchInput.value.toLowerCase().trim();

    results = results.filter((game) =>
      game.name.toLowerCase().includes(search),
    );
  }

  if (categoryFilter) {
    const category = categoryFilter.value;

    if (category !== "all") {
      results = results.filter((game) => game.category === category);
    }
  }
  if (sortSelect) {
    const sort = sortSelect.value;

    if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "low") {
      results.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      results.sort((a, b) => b.price - a.price);
    }
  }

  displayGames(results);
}
if (searchInput) {
  searchInput.addEventListener("input", handleGames);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", handleGames);
}

if (sortSelect) {
  sortSelect.addEventListener("change", handleGames);
}
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const contactMessage = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        const messages = getStorageData("gameZoneMessages");

        messages.push(contactMessage);

        saveStorageData("gameZoneMessages", messages);

        alert("Your message has been saved successfully!");

        contactForm.reset();
    });
}
