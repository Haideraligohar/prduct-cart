<header>
    <div class="container">
        <nav class="navbar d-flex justify-content-between align-items-center">
            <div class="nav-wrap-left d-inline-flex align-items-center">
                <a href="./">
                    <img class="logo" alt="Forecast LOGO" src="./public/shop.jpg">
                </a>

                <ul class="nav-list">
                    <li class="nav-item dropdown">
                        <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            About
                        </button>
                    </li>
                    <li class="nav-item">
                        <a href="" class="nav-link">Shop</a>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" id="productsMenuLink" onclick="toggleProductsMegaMenu(event);" aria-haspopup="true" aria-expanded="false">Products
                        </button>
                    </li>

                    <li class="nav-item">
                        <a href="" class="nav-link">Contact</a>
                    </li>
                </ul>
            </div>

            <div class="header-icons">
                <div class="header-icon">
                    <a href="#" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 21L16.65 16.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>
                <div class="header-icon">
                    <a href="#" aria-label="Profile" data-bs-toggle="dropdown">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16Z"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 21.25C4.81594 18.1122 8.11406 16 12 16C15.8859 16 19.1841 18.1122 21 21.25"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>

                </div>
                <div class="header-icon">
                    <a href="cart.php" aria-label="Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.75 8.25C15.75 9.24456 15.3549 10.1984 14.6517 10.9017C13.9484 11.6049 12.9946 12 12 12C11.0054 12 10.0516 11.6049 9.34835 10.9017C8.64509 10.1984 8.25 9.24456 8.25 8.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </div>

                <button class="mobile-menu-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </nav>
        <!-- Mobile Menu Offcanvas -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
            <div class="offcanvas-header">
                <a href="./">
                    <img class="logo" alt="Forecast LOGO" src="public/assets/forecast-2020-logo-stack-cmyk-300x71-1.png" style="width: 120px; height: auto;">
                </a>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <ul class="mobile-nav-list">

                    <!-- About (with collapse submenu) -->
                    <li>
                        <a class="d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            href="#aboutSubmenu"
                            role="button"
                            aria-expanded="false"
                            aria-controls="aboutSubmenu">
                            About
                        </a>
                    </li>

                    <!-- Other menu items -->
                    <li><a href="shop.php">Shop</a></li>
                    <!-- Products (with collapse submenu) -->
                    <li>
                        <a class="d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            href="#productsSubmenu"
                            role="button"
                            aria-expanded="false"
                            aria-controls="productsSubmenu">
                            Products
                        </a>

                    </li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
            </div>
        </div>

    </div>
</header>