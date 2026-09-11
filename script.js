/* =====================================================
   ÉLYSÉE PARFUMS
   JAVASCRIPT
===================================================== */


/* =====================================================
   CONFIGURATION
===================================================== */

/*
   IMPORTANT :

   Remplace ce numéro par le WhatsApp du client.

   Exemple :
   0612345678

   devient :

   212612345678
*/

const WHATSAPP_NUMBER = "212600000000";


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,

        name: "Éclat Floral",

        category: "Femme",

        price: 249,

        badge: "Nouveauté",

        description:
            "Une fragrance florale délicate, lumineuse et élégante.",

        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 2,

        name: "Noir Intense",

        category: "Homme",

        price: 299,

        badge: "Best Seller",

        description:
            "Un parfum boisé et intense au caractère affirmé.",

        image:
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 3,

        name: "Velours",

        category: "Femme",

        price: 279,

        badge: "",

        description:
            "Une fragrance douce, sensuelle et enveloppante.",

        image:
            "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 4,

        name: "Éclipse",

        category: "Unisexe",

        price: 319,

        badge: "Nouveauté",

        description:
            "Une signature moderne entre fraîcheur et profondeur.",

        image:
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 5,

        name: "Santal Royal",

        category: "Homme",

        price: 349,

        badge: "",

        description:
            "Un accord boisé chaud, élégant et sophistiqué.",

        image:
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 6,

        name: "Rose Blanche",

        category: "Femme",

        price: 229,

        badge: "",

        description:
            "Une composition florale fraîche et délicatement poudrée.",

        image:
            "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 7,

        name: "Oud Prestige",

        category: "Unisexe",

        price: 399,

        badge: "Premium",

        description:
            "Une fragrance orientale profonde autour du oud.",

        image:
            "https://images.unsplash.com/photo-1608528577891-eb055944f2e8?auto=format&fit=crop&w=900&q=85"
    },


    {
        id: 8,

        name: "Citrus Blanc",

        category: "Unisexe",

        price: 219,

        badge: "Nouveauté",

        description:
            "Un parfum frais, lumineux et énergisant.",

        image:
            "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?auto=format&fit=crop&w=900&q=85"
    }

];


/* =====================================================
   STATE
===================================================== */

let cart = JSON.parse(
    localStorage.getItem("elyseeCart")
) || [];

let favorites = JSON.parse(
    localStorage.getItem("elyseeFavorites")
) || [];

let currentFilter = "Tous";

let currentProduct = null;

let modalQuantity = 1;


/* =====================================================
   DOM
===================================================== */

const productsGrid =
    document.getElementById("productsGrid");

const emptyProducts =
    document.getElementById("emptyProducts");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const productModal =
    document.getElementById("productModal");

const toast =
    document.getElementById("toast");


/* =====================================================
   SAVE
===================================================== */

function saveCart() {

    localStorage.setItem(
        "elyseeCart",
        JSON.stringify(cart)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "elyseeFavorites",
        JSON.stringify(favorites)
    );

}


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return price.toLocaleString("fr-FR");

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

    const search =
        document
            .getElementById("productSearch")
            .value
            .toLowerCase()
            .trim();


    let filtered = products.filter(product => {

        const categoryMatch =
            currentFilter === "Tous" ||
            currentFilter === "Nouveauté"
                ? true
                : product.category === currentFilter;


        const newMatch =
            currentFilter === "Nouveauté"
                ? product.badge === "Nouveauté"
                : true;


        const searchMatch =
            product.name
                .toLowerCase()
                .includes(search) ||
            product.category
                .toLowerCase()
                .includes(search) ||
            product.description
                .toLowerCase()
                .includes(search);


        return categoryMatch &&
               newMatch &&
               searchMatch;

    });


    productsGrid.innerHTML = "";


    if (!filtered.length) {

        emptyProducts.classList.add("show");

        return;

    }


    emptyProducts.classList.remove("show");


    filtered.forEach((product, index) => {

        const favorite =
            favorites.includes(product.id);


        const card =
            document.createElement("article");


        card.className =
            "product-card reveal";


        card.style.transitionDelay =
            `${index * 60}ms`;


        card.innerHTML = `

            <div class="product-image">

                ${
                    product.badge
                    ?
                    `<span class="product-badge">
                        ${product.badge}
                    </span>`
                    :
                    ""
                }

                <button
                    class="product-favorite ${
                        favorite ? "active" : ""
                    }"
                    data-favorite="${product.id}"
                >

                    <i class="${
                        favorite
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-heart"></i>

                </button>


                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatPrice(product.price)} DH
                    </strong>

                    <button
                        class="product-add"
                        data-add="${product.id}"
                        aria-label="Ajouter"
                    >

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".product-favorite"
                    )
                ) return;


                if (
                    event.target.closest(
                        ".product-add"
                    )
                ) {

                    addToCart(product.id);

                    return;
                }


                openProductModal(product.id);

            }
        );


        productsGrid.appendChild(card);

    });


    initReveal();

}


/* =====================================================
   FILTERS
===================================================== */

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


                currentFilter =
                    button.dataset.filter;


                renderProducts();

            }
        );

    });


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById("productSearch")
    .addEventListener(
        "input",
        renderProducts
    );


document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        event => {

            document
                .getElementById("productSearch")
                .value =
                    event.target.value;

            renderProducts();

        }
    );


/* =====================================================
   FAVORITES
===================================================== */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-favorite]"
            );


        if (!button) return;


        const id =
            Number(button.dataset.favorite);


        if (favorites.includes(id)) {

            favorites =
                favorites.filter(
                    item => item !== id
                );

        } else {

            favorites.push(id);

        }


        saveFavorites();

        renderProducts();

    }
);


/* =====================================================
   CART
===================================================== */

function addToCart(
    productId,
    quantity = 1
) {

    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            id: productId,
            quantity: quantity
        });

    }


    saveCart();

    updateCart();

    showToast();

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart();

    updateCart();

}


function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    if (!cart.length) {

        cartItems.innerHTML = `

            <div class="cart-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Votre panier est vide
                </h3>

                <p>
                    Ajoutez quelques parfums
                    pour commencer votre commande.
                </p>

                <button
                    class="btn btn-dark"
                    id="discoverProducts"
                >
                    Découvrir les produits
                </button>

            </div>

        `;


        cartTotal.textContent = "0";

        return;

    }


    let total = 0;


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        if (!product) return;


        total +=
            product.price *
            item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <span>
                    ${product.category}
                </span>


                <div class="cart-qty">

                    <button
                        data-minus="${product.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        data-plus="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>


            <div>

                <div class="cart-item-price">

                    ${
                        formatPrice(
                            product.price *
                            item.quantity
                        )
                    } DH

                </div>

                <button
                    class="remove-item"
                    data-remove="${product.id}"
                >
                    Supprimer
                </button>

            </div>

        `;


        cartItems.appendChild(element);

    });


    cartTotal.textContent =
        formatPrice(total);

}


/* =====================================================
   CART EVENTS
===================================================== */

document.addEventListener(
    "click",
    event => {

        const plus =
            event.target.closest(
                "[data-plus]"
            );


        const minus =
            event.target.closest(
                "[data-minus]"
            );


        const remove =
            event.target.closest(
                "[data-remove]"
            );


        if (plus) {

            changeQuantity(
                Number(plus.dataset.plus),
                1
            );

        }


        if (minus) {

            changeQuantity(
                Number(minus.dataset.minus),
                -1
            );

        }


        if (remove) {

            removeFromCart(
                Number(remove.dataset.remove)
            );

        }


        if (
            event.target.id ===
            "discoverProducts"
        ) {

            closeCart();

            document
                .getElementById("boutique")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


/* =====================================================
   CART OPEN / CLOSE
===================================================== */

document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


cartOverlay.addEventListener(
    "click",
    closeCart
);


function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCart() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal(id) {

    currentProduct =
        products.find(
            product => product.id === id
        );


    if (!currentProduct) return;


    document
        .getElementById("modalImage")
        .src =
            currentProduct.image;


    document
        .getElementById("modalImage")
        .alt =
            currentProduct.name;


    document
        .getElementById("modalCategory")
        .textContent =
            currentProduct.category;


    document
        .getElementById("modalName")
        .textContent =
            currentProduct.name;


    document
        .getElementById("modalPrice")
        .textContent =
            formatPrice(
                currentProduct.price
            );


    document
        .getElementById("modalDescription")
        .textContent =
            currentProduct.description;


    modalQuantity = 1;

    document
        .getElementById("modalQuantity")
        .textContent =
            modalQuantity;


    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeProductModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeProductModal
    );


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeProductModal
    );


/* =====================================================
   MODAL QUANTITY
===================================================== */

document
    .getElementById("plusQuantity")
    .addEventListener(
        "click",
        () => {

            modalQuantity++;

            document
                .getElementById("modalQuantity")
                .textContent =
                    modalQuantity;

        }
    );


document
    .getElementById("minusQuantity")
    .addEventListener(
        "click",
        () => {

            if (modalQuantity <= 1)
                return;

            modalQuantity--;

            document
                .getElementById("modalQuantity")
                .textContent =
                    modalQuantity;

        }
    );


/* =====================================================
   SIZE OPTIONS
===================================================== */

document
    .querySelectorAll(".size-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".size-option")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");

            }
        );

    });


/* =====================================================
   ADD FROM MODAL
===================================================== */

document
    .getElementById("modalAdd")
    .addEventListener(
        "click",
        () => {

            if (!currentProduct)
                return;


            addToCart(
                currentProduct.id,
                modalQuantity
            );


            closeProductModal();

            openCart();

        }
    );


/* =====================================================
   WHATSAPP ORDER
===================================================== */

document
    .getElementById("whatsappOrder")
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                showToast(
                    "Panier vide",
                    "Ajoutez un parfum avant de commander."
                );

                return;

            }


            let message =
                "Bonjour, je souhaite commander :%0A%0A";


            let total = 0;


            cart.forEach(item => {

                const product =
                    products.find(
                        p => p.id === item.id
                    );


                if (!product) return;


                const subtotal =
                    product.price *
                    item.quantity;


                total += subtotal;


                message +=
                    `• ${product.name} x${item.quantity} — ${subtotal} DH%0A`;

            });


            message +=
                `%0ATotal : ${total} DH`;


            message +=
                "%0A%0AMerci de me confirmer la disponibilité.";


            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* =====================================================
   CONTACT WHATSAPP
===================================================== */

function setupWhatsAppLinks() {

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}`;


    document
        .getElementById("contactWhatsApp")
        .href =
            url;


    document
        .getElementById("footerWhatsApp")
        .href =
            url;


    const display =
        document.getElementById(
            "displayWhatsapp"
        );


    if (display) {

        display.textContent =
            "+" +
            WHATSAPP_NUMBER
                .replace("212", "212 ");

    }

}


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;


function showToast(
    title = "Produit ajouté",
    message = "Votre parfum a été ajouté au panier."
) {

    toast.innerHTML = `

        <i class="fa-solid fa-check"></i>

        <div>

            <strong>
                ${title}
            </strong>

            <span>
                ${message}
            </span>

        </div>

    `;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove("show");

            },
            3000
        );

}


/* =====================================================
   SEARCH OVERLAY
===================================================== */

const searchOverlay =
    document.getElementById(
        "searchOverlay"
    );


document
    .getElementById("openSearch")
    .addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "active"
            );

            document.body.classList.add(
                "no-scroll"
            );


            setTimeout(
                () => {

                    document
                        .getElementById(
                            "searchInput"
                        )
                        .focus();

                },
                300
            );

        }
    );


document
    .getElementById("closeSearch")
    .addEventListener(
        "click",
        closeSearch
    );


function closeSearch() {

    searchOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


document
    .getElementById("menuBtn")
    .addEventListener(
        "click",
        () => {

            mobileMenu.classList.add(
                "active"
            );

            document.body.classList.add(
                "no-scroll"
            );

        }
    );


document
    .getElementById("closeMobile")
    .addEventListener(
        "click",
        closeMobile
    );


function closeMobile() {

    mobileMenu.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobile
        );

    });


/* =====================================================
   CATEGORY CARDS
===================================================== */

document
    .querySelectorAll(
        ".category-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                currentFilter =
                    category;


                document
                    .querySelectorAll(
                        ".filter-btn"
                    )
                    .forEach(btn => {

                        btn.classList.toggle(
                            "active",
                            btn.dataset.filter ===
                            category
                        );

                    });


                renderProducts();


                document
                    .getElementById(
                        "boutique"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =====================================================
   HEADER SCROLL
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.getElementById(
                "header"
            );


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =====================================================
   REVEAL ANIMATION
===================================================== */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.visible)"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .1
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        closeSearch();

        closeCart();

        closeProductModal();

        closeMobile();

    }
);


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "preloader"
                    )
                    .classList.add("hide");

            },
            500
        );

    }
);


/* =====================================================
   INIT
===================================================== */

renderProducts();

updateCart();

setupWhatsAppLinks();

initReveal();
