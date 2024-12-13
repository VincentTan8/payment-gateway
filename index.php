<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Payment Test</title>

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div class="flex">
        <div class="window">
            <span class="text">Payment Test</span>
            <div id="itemParent">
                <div class="flex column item">
                    <label for="itemName">Enter item name below:</label>
                    <input type="text" class="itemName" name="itemName" placeholder="Item name here">
                    <label for="itemAmt">Enter item amount below:</label>
                    <input type="text" class="itemAmt" name="itemAmt" placeholder="Item amount here">
                    <label for="itemQty">Enter item quantity below:</label>
                    <input type="text" class="itemQty" name="itemQty" placeholder="Item quantity here">
                    <button class="remove-entry">Remove Item</button>
                </div>
            </div>
            <button id="addItemBtn">Add Item</button>
            <button id="payBtn">Pay Now</button>
        </div>
    </div>

    <script type="module" src="js/main.js"></script>
</body>

</html>