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
            <label for="itemInput">Enter item amount below:</label>
            <input type="text" id="itemInput" name="itemInput" placeholder="Amount here">
            <label for="payInput">Enter amount below:</label>
            <input type="text" id="payInput" name="payInput" placeholder="Amount here">
            <button id="payBtn">Pay Now</button>
        </div>
    </div>

    <script type="module" src="js/main.js"></script>
</body>

</html>