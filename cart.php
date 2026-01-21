<!DOCTYPE html>
<html lang="en">

<head>
    <?php include 'includes/css.php'; ?>
    <title>Your Cart</title>
</head>

<body class="trans-header">

    <!-- Header -->
    <?php include 'includes/header.php'; ?>
    <!-- Header -->

    <main class="main-wrapper cart-page">

        <!-- PAGE HEADER -->
        <section class="top-header">
            <div class="container">
                <div class="page-header text-center">
                    <h1>Your Cart</h1>
                    <p>
                        Explore our full range of high-quality products, designed for durability,
                        style, and everyday convenience in any lifestyle, anywhere.
                    </p>
                </div>
            </div>
        </section>

        <!-- CART -->
        <section class="cart-products-wrapper">
            <div class="container">
                <div class="cart-section-grid">

                    <!-- LEFT: PRODUCTS -->
                    <div class="cart-products-col">

                        <div class="products-table-titles">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>Product</h5>
                                </div>
                                <div class="col-sm-3">
                                    <h5>Quantity</h5>
                                </div>
                                <div class="col-sm-3">
                                    <h5>Price</h5>
                                </div>
                            </div>
                        </div>

                        <div class="products-list-table">

                            <!-- PRODUCT ITEM -->
                            <div class="products-list-product_item">
                                <div class="product-details">
                                    <div class="row align-items-center">

                                        <div class="col-sm-6">
                                            <div class="product-info-wrapper">
                                                <div class="product-img">
                                                    <img src="public/laptop.png" alt="GCX-S Sit-2-Stand">
                                                </div>
                                                <div class="product-info-content">
                                                    <h2 class="product-name">GCX-S™ Sit-2-Stand</h2>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3 col-6">
                                            <div class="product-qty">
                                                <div class="qty-counter">
                                                    <button class="btn decrement">−</button>
                                                    <input type="text" class="qty-input" value="1" readonly>
                                                    <button class="btn increment">+</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3 col-6">
                                            <div class="product-price-wrapper">
                                                <div class="product-price">
                                                    <h4>$1,300.00</h4>
                                                </div>
                                                <div class="product-delete">
                                                    <div class="delete-btn">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5 7.2H19M17.4444 7.2V18.4C17.4444 19.2 16.6667 20 15.8889 20H8.11111C7.33333 20 6.55556 19.2 6.55556 18.4V7.2M8.88889 7.2V5.6C8.88889 4.8 9.66667 4 10.4444 4H13.5556C14.3333 4 15.1111 4.8 15.1111 5.6V7.2"
                                                                stroke="inherit" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- RIGHT: SUMMARY -->
                    <div class="cart-summary-col">
                        <div class="cart-summary">
                            <h4>Order Summary</h4>
                            <div class="summary-breakdown">
                                <div class="summary-row">
                                    <p>Subtotal</p>
                                    <p><b>$5,300.00</b></p>
                                </div>
                                <div class="summary-row">
                                    <p>Delivery Fee</p>
                                    <p><b>$400</b></p>
                                </div>
                                <div class="summary-row">
                                    <p>Tax (10%)</p>
                                    <p><b>$400</b></p>
                                </div>
                            </div>
                            <div class="summary-divider"></div>
                            <div class="summary-total">
                                <p>Total</p>
                                <h3>$5,700.00</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>


    <?php include 'includes/footer.php'; ?>
    <?php include 'includes/js.php'; ?>

    <!-- Quantity Script -->
    <script>
        document.querySelectorAll('.qty-counter').forEach(counter => {
            const inc = counter.querySelector('.increment');
            const dec = counter.querySelector('.decrement');
            const input = counter.querySelector('.qty-input');

            inc.addEventListener('click', () => input.value++);
            dec.addEventListener('click', () => {
                if (input.value > 1) input.value--;
            });
        });
    </script>

</body>

</html>