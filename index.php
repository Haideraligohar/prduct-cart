<!DOCTYPE html>
<html lang="en">

<head>
    <?php include('includes/css.php') ?>
    <title>Home</title>
    <link rel="stylesheet" href="style.css">
</head>

<body class="trans-header">
    <!-- header  -->
    <?php include('includes/header.php') ?>
    <!-- header  -->
    <div id="toast-container" style="
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;">
    </div>
    <div class="clearfix"></div>
    <div class="cart-wrapper">
        <div class="container">
            <h1 class="top-heading">Products You’ll Love</h1>

            <div class="filter-selector">
                <!-- Filters -->
                <div class="product-filters d-flex justify-content-between">
                    <select id="category-filter">
                        <option value="all">All Categories</option>
                        <option value="Men clothing">Men clothing</option>
                        <option value="Women clothing">Women clothing</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Jewelery">Jewelery</option>
                    </select>
                    <input type="text" id="search-input" placeholder="Search products..." />
                    <select id="price-filter">
                        <option value="all">All Prices</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>
                </div>
            </div>

            <!-- Products container -->
            <div class="container">
                <div id="products-cart-wrapper" class="products-cart-wrapper row row-cols-1 row-sm-2 row-cols-3 row-cols-lg-4 justify-content-center">
                </div>
            </div>
        </div>
    </div>

    <div class="clearfix"></div>

    <?php include('includes/footer.php') ?>
    <?php include('includes/js.php') ?>
    <script src="script.js"></script>
</body>

</html>