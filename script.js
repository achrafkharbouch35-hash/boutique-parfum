/* =========================================================
   ÉLIXIR — JAVASCRIPT
   Boutique Parfums Homme & Femme
   ========================================================= */


/* ================= CONFIGURATION ================= */

/*
   IMPORTANT :
   Remplace ce numéro par le vrai WhatsApp de la boutique.

   Exemple Maroc :

   0612345678

   devient :

   212612345678
*/

const WHATSAPP_NUMBER = "212600000000";


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,

        name: "Élixir No. 01",

        category: "femme",

        price: 499,

        badge: "BEST SELLER",

        image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=85",

        description:
        "Une fragrance élégante et sensuelle où la fraîcheur de la bergamote rencontre un cœur floral raffiné et un fond chaleureux.",

        top: "Bergamote",

        heart: "Rose & Jasmin",

        base: "Musc & Vanille",

        reviews: "4.9"

    },


    {
        id: 2,

        name: "Rose Élégance",

        category: "femme",

        price: 449,

        badge: "NOUVEAU",

        image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85",

        description:
        "Une composition féminine délicate construite autour de la rose, du jasmin et d'un fond musqué.",

        top: "Poire & Bergamote",

        heart: "Rose & Jasmin",

        base: "Musc blanc",

        reviews: "4.8"

    },


    {
        id: 3,

        name: "Noir Intense",

        category: "homme",

        price: 549,

        badge: "BEST SELLER",

        image:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85",

        description:
        "Un parfum masculin profond et élégant associant des notes fraîches à un cœur épicé et un fond boisé.",

        top: "Bergamote",

        heart: "Poivre noir",

        base: "Bois de cèdre",

        reviews: "4.9"

    },


    {
        id: 4,

        name: "Bois Royal",

        category: "homme",

        price: 599,

        badge: "",

        image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85",

        description:
        "Une fragrance sophistiquée aux accents boisés, parfaite pour ceux qui recherchent une présence forte.",

        top: "Citron & Gingembre",

        heart: "Vétiver",

        base: "Bois de santal",

        reviews: "4.7"

    },


    {
        id: 5,

        name: "Velours Blanc",

        category: "unisex",

        price: 479,

        badge: "NOUVEAU",

        image:
        "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=85",

        description:
        "Une fragrance douce et contemporaine qui joue sur la pureté des muscs et la chaleur des bois.",

        top: "Néroli",

        heart: "Iris",

        base: "Musc & Ambre",

        reviews: "4.8"

    },


    {
        id: 6,

        name: "Golden Oud",

        category: "unisex",

        price: 649,

        badge: "EXCLUSIF",

        image:
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=85",

        description:
        "Un parfum oriental riche et mystérieux avec un oud profond accompagné d'accords ambrés.",

        top: "Safran",

        heart: "Rose",

        base: "Oud & Ambre",

        reviews: "5.0"

    },


    {
        id: 7,

        name: "Fleur d'Or",

        category: "femme",

        price: 429,

        badge: "",

        image:
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=85",

        description:
        "Une fragrance lumineuse et féminine aux accents floraux et fruités.",

        top: "Fruits rouges",

        heart: "Fleur d'oranger",

        base: "Vanille",

        reviews: "4.7"

    },


    {
        id: 8,

        name: "Aventure",

        category: "homme",

        price: 459,

        badge: "",

        image:
        "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=800&q=85",

        description:
        "Une fragrance fraîche et dynamique pensée pour accompagner les journées actives.",

        top: "Agrumes",

        heart: "Lavande",

        base: "Patchouli",

        reviews: "4.8"

    }

];


/* ================= STATE ================= */

let cart = [];

let favorites = [];

let currentProduct = null;


/* ================= DOM ================= */

const productsGrid =
    document.getElementById("productsGrid");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.querySelector(".cart-count");

const favoriteCount =
    document.querySelector(".favorite-count");


/* ================= LOAD STORAGE ================= */

try {

    cart =
        JSON.parse(localStorage.getItem("elixir_cart")) || [];

    favorites =
        JSON.parse(localStorage.getItem("elixir_favorites")) || [];

} catch (error) {

    cart = [];

    favorites = [];

}


/* ================= SAVE STORAGE ================= */

function saveCart() {

    localStorage.setItem(
        "elixir_cart",
        JSON.stringify(cart)
    );

}

function saveFavorites() {

    localStorage.setItem(
        "elixir_favorites",
        JSON.stringify(favorites)
    );

}


/* ================= RENDER PRODUCTS ================= */

function renderProducts(filter = "all") {

    let filtered = products;

    if (filter !== "all") {

        if (filter === "nouveau") {

            filtered =
                products.filter(
                    product =>
                    product.badge === "NOUVEAU"
                );

        } else {

            filtered =
                products.filter(
                    product =>
                    product.category === filter
                );

        }

    }


    productsGrid.innerHTML = "";


    filtered.forEach((product, index) => {

        const isFavorite =
            favorites.includes(product.id);


        const card =
            document.createElement("article");

        card.className = "product-card";

        card.style.animationDelay =
            `${index * 0.06}s`;


        card.innerHTML = `

            <div class="product-image">

                ${product.badge
                    ? `<span class="product-badge">
                        ${product.badge}
                       </span>`
                    : ""
                }

                <div class="product-actions">

                    <button
                        class="favorite-btn ${isFavorite ? "active" : ""}"
                        data-id="${product.id}"
                        aria-label="Ajouter aux favoris">

                        ${isFavorite ? "♥" : "♡"}

                    </button>

                </div>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <button
                    class="product-quick"
                    data-product="${product.id}">

                    VOIR LE PARFUM →

                </button>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${formatCategory(product.category)}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="product-stars">
                    ★★★★★
                    <span>${product.reviews}</span>
                </div>

                <div class="product-price">
                    ${product.price} DH
                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });


    attachProductEvents();

}


/* ================= CATEGORY ================= */

function formatCategory(category) {

    const names = {

        femme: "PARFUM FEMME",

        homme: "PARFUM HOMME",

        unisex: "PARFUM UNISEXE"

    };

    return names[category] || category;

}


/* ================= PRODUCT EVENTS ================= */

function attachProductEvents() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const id =
                        Number(button.dataset.id);

                    toggleFavorite(id);

                }
            );

        });


    document
        .querySelectorAll(".product-quick")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.product);

                    openProductModal(id);

                }
            );

        });

}


/* ================= FAVORITES ================= */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

        showToast(
            "Retiré des favoris",
            "Le parfum a été retiré."
        );

    } else {

        favorites.push(id);

        showToast(
            "Ajouté aux favoris",
            "Le parfum a été enregistré."
        );

    }


    saveFavorites();

    updateCounters();

    const activeFilter =
        document.querySelector(
            ".filter-btn.active"
        );

    renderProducts(
        activeFilter
            ? activeFilter.dataset.filter
            : "all"
    );

}


/* ================= COUNTERS ================= */

function updateCounters() {

    cartCount.textContent =
        cart.reduce(
            (total, item) =>
            total + item.quantity,
            0
        );

    favoriteCount.textContent =
        favorites.length;

}


/* ================= ADD CART ================= */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();

    updateCounters();

    renderCart();

    showToast(
        "Ajouté au panier",
        `${product.name} a été ajouté.`
    );

}


/* ================= REMOVE CART ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveCart();

    updateCounters();

    renderCart();

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item =
        cart.find(
            item => item.id === id
        );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    updateCounters();

    renderCart();

}


/* ================= RENDER CART ================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛍</div>

                <h4>
                    Votre panier est vide
                </h4>

                <p>
                    Découvrez notre collection et ajoutez
                    vos parfums préférés.
                </p>

            </div>

        `;

        cartTotal.textContent = "0";

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                product.id === item.id
            );

        if (!product) return;


        const subtotal =
            product.price * item.quantity;


        total += subtotal;


        const element =
            document.createElement("div");

        element.className = "cart-item";


        element.innerHTML = `

            <div
                class="cart-item-image"
                style="
                    background-image:
                    url('${product.image}')
                "
            ></div>


            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${formatCategory(product.category)}
                </p>

                <div class="cart-item-price">
                    ${subtotal} DH
                </div>


                <div class="quantity">

                    <button
                        data-minus="${product.id}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-plus="${product.id}">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                data-remove="${product.id}">

                ×

            </button>

        `;


        cartItems.appendChild(element);

    });


    cartTotal.textContent =
        total.toLocaleString("fr-FR");


    document
        .querySelectorAll("[data-minus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.minus),
                        -1
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-plus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.plus),
                        1
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-remove]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        Number(button.dataset.remove)
                    );

                }
            );

        });

}


/* ================= MODAL ================= */

function openProductModal(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) return;


    currentProduct = product;


    document.getElementById("modalCategory")
        .textContent =
        formatCategory(product.category);


    document.getElementById("modalName")
        .textContent =
        product.name;


    document.getElementById("modalReviews")
        .textContent =
        product.reviews;


    document.getElementById("modalDescription")
        .textContent =
        product.description;


    document.getElementById("modalTop")
        .textContent =
        product.top;


    document.getElementById("modalHeart")
        .textContent =
        product.heart;


    document.getElementById("modalBase")
        .textContent =
        product.base;


    document.getElementById("modalPrice")
        .textContent =
        product.price;


    document.getElementById("modalImage")
        .style.backgroundImage =
        `url("${product.image}")`;


    document
        .querySelector(".product-modal")
        .classList.add("active");


    document.body.classList.add("no-scroll");

}


/* ================= CLOSE MODAL ================= */

function closeProductModal() {

    document
        .querySelector(".product-modal")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* ================= CART DRAWER ================= */

function openCart() {

    document
        .querySelector(".cart-drawer")
        .classList.add("active");

    document
        .querySelector(".overlay")
        .classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCart() {

    document
        .querySelector(".cart-drawer")
        .classList.remove("active");

    document
        .querySelector(".overlay")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* ================= TOAST ================= */

let toastTimer;


function showToast(title, message) {

    const toast =
        document.querySelector(".toast");


    toast.innerHTML = `

        <span class="toast-icon">
            ✓
        </span>

        <div>

            <strong>
                ${title}
            </strong>

            <small>
                ${message}
            </small>

        </div>

    `;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* ================= FILTERS ================= */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                renderProducts(
                    button.dataset.filter
                );

            }
        );

    });


/* ================= CATEGORY LINKS ================= */

document
    .querySelectorAll("[data-category-link]")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const category =
                    link.dataset.categoryLink;


                setTimeout(() => {

                    const filter =
                        document.querySelector(
                            `[data-filter="${category}"]`
                        );

                    if (filter) {

                        filter.click();

                    }

                }, 300);

            }
        );

    });


/* ================= CART BUTTON ================= */

document
    .querySelector(".cart-toggle")
    .addEventListener(
        "click",
        openCart
    );


document
    .querySelector(".close-cart")
    .addEventListener(
        "click",
        closeCart
    );


document
    .querySelector(".overlay")
    .addEventListener(
        "click",
        closeCart
    );


/* ================= MODAL BUTTON ================= */

document
    .querySelector(".close-modal")
    .addEventListener(
        "click",
        closeProductModal
    );


document
    .querySelector(".product-modal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "product-modal"
                )
            ) {

                closeProductModal();

            }

        }
    );


document
    .getElementById("modalAddCart")
    .addEventListener(
        "click",
        () => {

            if (!currentProduct) return;

            addToCart(currentProduct.id);

            closeProductModal();

            openCart();

        }
    );


/* ================= FEATURED ================= */

document
    .querySelector(".featured-product-btn")
    .addEventListener(
        "click",
        () => {

            openProductModal(1);

        }
    );


/* ================= SEARCH ================= */

const searchPanel =
    document.querySelector(".search-panel");


const searchInput =
    document.getElementById("searchInput");


const searchResults =
    document.getElementById("searchResults");


document
    .querySelector(".search-toggle")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.add("active");

            setTimeout(
                () => searchInput.focus(),
                400
            );

        }
    );


document
    .querySelector(".close-search")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.remove(
                "active"
            );

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!query) {

            searchResults.innerHTML = "";

            return;

        }


        const results =
            products.filter(
                product =>
                product.name
                    .toLowerCase()
                    .includes(query) ||

                product.category
                    .toLowerCase()
                    .includes(query) ||

                product.top
                    .toLowerCase()
                    .includes(query) ||

                product.heart
                    .toLowerCase()
                    .includes(query) ||

                product.base
                    .toLowerCase()
                    .includes(query)
            );


        searchResults.innerHTML =
            results.map(product => `

                <button
                    class="search-product"
                    data-search-id="${product.id}"
                    style="
                        background:
                        url('${product.image}')
                        center/cover;
                        min-height:180px;
                        position:relative;
                        overflow:hidden;
                    "
                >

                    <span
                        style="
                            position:absolute;
                            inset:0;
                            background:
                            linear-gradient(
                                transparent,
                                rgba(0,0,0,.75)
                            );
                        "
                    ></span>

                    <strong
                        style="
                            position:absolute;
                            bottom:15px;
                            left:15px;
                            color:white;
                            font-family:
                            Cormorant Garamond;
                            font-size:24px;
                        "
                    >
                        ${product.name}
                    </strong>

                </button>

            `).join("");


        document
            .querySelectorAll("[data-search-id]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.searchId
                            );

                        searchPanel.classList.remove(
                            "active"
                        );

                        openProductModal(id);

                    }
                );

            });

    });


/* ================= FAVORITES ================= */

document
    .querySelector(".favorites-toggle")
    .addEventListener(
        "click",
        () => {

            const favoriteProducts =
                products.filter(
                    product =>
                    favorites.includes(product.id)
                );


            if (favoriteProducts.length === 0) {

                showToast(
                    "Aucun favori",
                    "Ajoutez vos parfums préférés."
                );

                return;

            }


            productsGrid.innerHTML = "";


            favoriteProducts.forEach(
                product => {

                    const card =
                        document.createElement("article");

                    card.className =
                        "product-card";

                    card.innerHTML = `

                        <div class="product-image">

                            <div class="product-actions">

                                <button
                                    class="favorite-btn active"
                                    data-id="${product.id}">

                                    ♥

                                </button>

                            </div>

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >

                            <button
                                class="product-quick"
                                data-product="${product.id}">

                                VOIR LE PARFUM →

                            </button>

                        </div>

                        <div class="product-info">

                            <span class="product-category">
                                ${formatCategory(product.category)}
                            </span>

                            <h3 class="product-name">
                                ${product.name}
                            </h3>

                            <div class="product-stars">
                                ★★★★★ ${product.reviews}
                            </div>

                            <div class="product-price">
                                ${product.price} DH
                            </div>

                        </div>

                    `;

                    productsGrid.appendChild(card);

                }
            );


            attachProductEvents();


            document
                .getElementById("collection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ================= WHATSAPP ================= */

document
    .querySelector(".whatsapp-order")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Panier vide",
                    "Ajoutez au moins un parfum."
                );

                return;

            }


            let message =
                "Bonjour, je souhaite commander :%0A%0A";


            let total = 0;


            cart.forEach(item => {

                const product =
                    products.find(
                        product =>
                        product.id === item.id
                    );

                if (!product) return;


                const subtotal =
                    product.price * item.quantity;


                total += subtotal;


                message +=
                    `• ${product.name} x${item.quantity} — ${subtotal} DH%0A`;

            });


            message +=
                `%0A💰 Total : ${total} DH`;


            message +=
                "%0A%0A📦 Je souhaite confirmer ma commande.";


            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* ================= NEWSLETTER ================= */

document
    .querySelector(".newsletter-form")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                event.target.querySelector("input");


            if (!input.value) return;


            showToast(
                "Merci !",
                "Vous êtes maintenant inscrit."
            );


            input.value = "";

        }
    );


/* ================= MOBILE MENU ================= */

const mobileNav =
    document.querySelector(".mobile-nav");


document
    .querySelector(".mobile-menu-btn")
    .addEventListener(
        "click",
        () => {

            mobileNav.classList.add("active");

        }
    );


document
    .querySelector(".mobile-close")
    .addEventListener(
        "click",
        () => {

            mobileNav.classList.remove("active");

        }
    );


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

            }
        );

    });


/* ================= HEADER SCROLL ================= */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(".header");


        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }
);


/* ================= REVEAL ANIMATION ================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* ================= PARALLAX ================= */

window.addEventListener(
    "scroll",
    () => {

        const bottle =
            document.querySelector(".bottle");


        if (!bottle) return;


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            bottle.style.transform =
                `translateY(${
                    scroll * .06
                }px)`;

        }

    }
);


/* ================= ESCAPE KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeProductModal();

            closeCart();

            searchPanel.classList.remove(
                "active"
            );

            mobileNav.classList.remove(
                "active"
            );

        }

    }
);


/* ================= INITIALIZATION ================= */

renderProducts();

renderCart();

updateCounters();


/* ================= PRELOADER ================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .querySelector(".preloader")
                    .classList.add("hide");

            },
            900
        );

    }
);
