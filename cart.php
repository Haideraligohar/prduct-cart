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
    <div id="toast-container" style="
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;">
    </div>
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

                        </div>
                    </div>
                    <!-- RIGHT: SUMMARY -->
                    <div class="cart-summary-col">
                        <div class="cart-summary">
                            <h4>Order Summary</h4>
                            <div class="summary-breakdown">
                                <div class="summary-row">
                                    <p>Subtotal</p>
                                    <p><b id="subtotal-amount">$0.00</b></p>
                                </div>
                                <div class="summary-row">
                                    <p>Delivery Fee</p>
                                    <p><b id="delivery-amount">$00</b></p>
                                </div>
                                <div class="summary-row">
                                    <p>Tax (10%)</p>
                                    <p><b id="tax-amount">$0.00</b></p>
                                </div>
                            </div>
                            <div class="summary-divider"></div>
                            <div class="summary-total">
                                <p>Total</p>
                                <h3 id="total-amount">$0.00</h3>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main>


    <?php include 'includes/footer.php'; ?>
    <?php include 'includes/js.php'; ?>


</body>

</html>