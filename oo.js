document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const mobileCartTotalPrice = document.getElementById('mobile-cart-total-price');
    const cartSidebarTotal = document.getElementById('cart-sidebar-total');
    const checkoutButton = document.querySelector('.btn-checkout');
    const addProductToast = document.getElementById('toast-notification');
    const checkoutNotification = document.getElementById('checkout-notification');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.getElementById('product-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const searchInput = document.getElementById('search-input');

    let cart = [];
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    const productsPerPage = 8;
    let currentPage = 1;
    let currentCategory = 'all';
    let currentSearchTerm = '';

    const allProducts = [
        {
            "id": 1,
            "name": "Lomo Saltado",
            "description": "Jugosos trozos de lomo fino salteados con cebolla, tomate y ají amarillo, acompañados de papas fritas y arroz.",
            "price": 35.00,
            "image": "https://i.ytimg.com/vi/sWXRJbGi6yQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAmzgGJ6J0eLasWLgYE-TcZgyiSJQ",
            "category": "all"
        },
        {
            "id": 2,
            "name": "Ají de Gallina",
            "description": "Gallina deshilachada en una cremosa salsa de ají amarillo, leche y pan, servida con arroz blanco, huevo y aceitunas.",
            "price": 28.00,
            "image": "https://campograndeperu.com/wp-content/uploads/2024/07/aji-de-gallina-de-quinua.jpg",
            "category": "all"
        },
        {
            "id": 3,
            "name": "Ceviche Clásico",
            "description": "Fresco pescado marinado en jugo de limón, ají limo, cebolla roja y cilantro, acompañado de camote y choclo.",
            "price": 32.00,
            "image": "https://www.elespectador.com/resizer/v2/2AVD5Z6Y2ZFWHETPQGCPLMNK4A.jpg?auth=82394bc07906097860918c7a77b6320dbba80a4b67cc293a909e810ae6941229&width=920&height=613&smart=true&quality=60",
            "category": "all"
        },
        {
            "id": 4,
            "name": "Arroz con Pollo",
            "description": "Arroz cocido en cilantro y espinacas con trozos de pollo, arvejas y zanahorias.",
            "price": 26.00,
            "image": "https://i.ytimg.com/vi/H6lgxgEWIs8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTdb3x_uADhlQHLbsZmEgnP9P1-w",
            "category": "all"
        },
        {
            "id": 5,
            "name": "Inca Kola 500ml",
            "description": "Bebida gaseosa de sabor único, 1 litro.",
            "price": 2.00,
            "image": "https://plazavea.vteximg.com.br/arquivos/ids/28516749-418-418/497497.jpg",
            "category": "drinks"
        },
        {
            "id": 6,
            "name": "Chicha Morada (Jarra)",
            "description": "Refrescante bebida tradicional a base de maíz morado, piña y especias.",
            "price": 12.00,
            "image": "https://perucomidas.com/wp-content/uploads/2024/04/chicha-morada-Peru-Comidas.png",
            "category": "drinks"
        },
        {
            "id": 7,
            "name": "Combo Lomo Saltado + Chicha",
            "description": "Disfruta de nuestro Lomo Saltado y una refrescante Chicha Morada a un precio especial.",
            "price": 42.00,
            "image": "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:2048/plain/https://storage.googleapis.com/takeapp/media/cm3i5yisu00030cjq17xc5dqk.jpg",
            "category": "promotions"
        },
        {
            "id": 8,
            "name": "2x1 en Ají de Gallina",
            "description": "Aprovecha esta increíble promoción: ¡dos Ají de Gallina por el precio de uno!",
            "price": 28.00,
            "image": "https://cdn6.recetasdeescandalo.com/wp-content/uploads/2020/06/Aji-de-gallina.-Receta-peruana-tradicional-y-deliciosa.jpg",
            "category": "promotions"
        },
        {
            "id": 9,
            "name": "Pisco Sour",
            "description": "El cóctel bandera del Perú, a base de pisco, limón, jarabe de goma y clara de huevo.",
            "price": 18.00,
            "image": "https://cdn.bolivia.com/gastronomia/2011/08/19/pisco-sour-3007.jpg",
            "category": "drinks"
        },
        {
            "id": 10,
            "name": "Causa Rellena",
            "description": "Capas de papa amarilla prensada y sazonada con limón y ají, rellenas de atún y mayonesa.",
            "price": 22.00,
            "image": "https://cdn0.recetasgratis.net/es/posts/8/6/2/causa_limena_31268_orig.jpg",
            "category": "all"
        },
        {
            "id": 11,
            "name": "Seco de Res con Frijoles",
            "description": "Carne de res cocida lentamente en salsa de cilantro, acompañada de frijoles y arroz.",
            "price": 30.00,
            "image": "https://i.ytimg.com/vi/HkL-dN8v0e8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCaT1CZCL8uPzx5KnQM1IOznT_y6g",
            "category": "all"
        },
        {
            "id": 12,
            "name": "Jugo de Maracuyá",
            "description": "Refrescante jugo natural de maracuyá.",
            "price": 10.00,
            "image": "https://cdn.pixabay.com/photo/2021/07/17/01/03/jugo-de-maracuya-6472043_1280.jpg",
            "category": "drinks"
        },
        {
            "id": 13,
            "name": "Suspiro a la Limeña",
            "description": "Delicioso postre tradicional a base de manjar blanco y merengue de oporto.",
            "price": 15.00,
            "image": "https://es.cravingsjournal.com/wp-content/uploads/2018/07/suspiro-de-limen%CC%83a-1.jpg",
            "category": "all"
        },
        {
            "id": 14,
            "name": "Chocotejas Artesanales",
            "description": "Dulces tradicionales peruanos de chocolate rellenos de manjar blanco y pecanas.",
            "price": 1.00,
            "image": "https://endulzateperu.com/assets/images/chocotejas_800x534.webp",
            "category": "all"
        },
        {
            "id": 15,
            "name": "Promoción Familiar (4 platos + 1 bebida)",
            "description": "Elige 4 de nuestros platos principales y una bebida grande por un precio especial.",
            "price": 120.00,
            "image": "https://images.unsplash.com/photo-1647403273976-06c20bed59bc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "category": "promotions"
        }
    ];

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.remove('transparent');
            mainHeader.classList.add('solid');
        } else {
            mainHeader.classList.remove('solid');
            mainHeader.classList.add('transparent');
        }
    });

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
            mobileNav.classList.remove('open');
        });
    });

    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('visible');
    });

    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('visible');
    });

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('visible');
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            showNotification(checkoutNotification, 'Tu pedido se enviará en unos minutos');
            cart = [];
            updateCartDisplay();
            cartOverlay.classList.remove('visible');
        } else {
            showNotification(addProductToast, 'El carrito está vacío. Agrega productos.');
        }
    });

    function showNotification(element, message) {
        element.textContent = message;
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 3000);
    }

    const displayProducts = () => {
        productGrid.innerHTML = '';

        let productsToDisplay = [...allProducts];

        if (currentCategory === 'favorites') {
            productsToDisplay = allProducts.filter(product => likedProducts.includes(product.id));
        } else if (currentCategory !== 'all') {
            productsToDisplay = allProducts.filter(product => product.category === currentCategory);
        }

        const filteredAndSearchedProducts = productsToDisplay.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                                  product.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesSearch;
        });

        productGrid.classList.remove('drinks-grid', 'promotions-grid');
        if (currentCategory === 'drinks') {
            productGrid.classList.add('drinks-grid');
        }
        else if (currentCategory === 'promotions') {
            productGrid.classList.add('promotions-grid');
        }

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = filteredAndSearchedProducts.slice(startIndex, endIndex);

        if (paginatedProducts.length === 0) {
            productGrid.innerHTML = '<p class="empty-results-message">No se encontraron productos en esta categoría o con tu búsqueda.</p>';
        }

        paginatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            if (product.category === 'promotions') {
                productCard.classList.add('promotion');
            }

            const isLiked = likedProducts.includes(product.id);
            const likeIconClass = isLiked ? 'fas' : 'far';
            const likedButtonClass = isLiked ? 'liked' : '';

            productCard.innerHTML = `
                <div class="product-card-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">S/ ${product.price.toFixed(2)}</span>
                    <div class="product-actions-buttons">
                        <button class="like-button ${likedButtonClass}" data-id="${product.id}">
                            <i class="${likeIconClass} fa-heart"></i>
                        </button>
                        <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Pedido</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
        setupPagination(filteredAndSearchedProducts.length);
    };

    const setupPagination = (totalProducts) => {
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('pagination-btn');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
                window.scrollTo({ top: document.getElementById('products-section').offsetTop, behavior: 'smooth' });
            });
            paginationControls.appendChild(button);
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            currentPage = 1;
            displayProducts();
        });
    });

    searchInput.addEventListener('input', () => {
        currentSearchTerm = searchInput.value.trim();
        currentPage = 1;
        displayProducts();
    });

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = allProducts.find(p => p.id === productId);
            if (productToAdd) {
                addToCart(productToAdd);
                showNotification(addProductToast, `¡"${productToAdd.name}" agregado al carrito!`);
            }
        } else if (e.target.closest('.like-button')) {
            const likeButton = e.target.closest('.like-button');
            const productId = parseInt(likeButton.dataset.id);
            toggleLike(productId, likeButton);
        }
    });

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    };

    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.quantity} x S/ ${item.price.toFixed(2)}</p>
                    </div>
                    <span class="cart-item-price">S/ ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        cartTotalPrice.textContent = `S/ ${total.toFixed(2)}`;
        mobileCartTotalPrice.textContent = `S/ ${total.toFixed(2)}`;
        cartSidebarTotal.textContent = `S/ ${total.toFixed(2)}`;
    };

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        }
    });

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    };

    const toggleLike = (productId, buttonElement) => {
        const icon = buttonElement.querySelector('i');

        if (likedProducts.includes(productId)) {
            likedProducts = likedProducts.filter(id => id !== productId);
            icon.classList.remove('fas', 'liked');
            icon.classList.add('far');
            buttonElement.classList.remove('liked');
        } else {
            likedProducts.push(productId);
            icon.classList.remove('far');
            icon.classList.add('fas', 'liked');
            buttonElement.classList.add('liked');
        }
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));

        if (currentCategory === 'favorites') {
            displayProducts();
        }
    };

    displayProducts();
    updateCartDisplay();
});