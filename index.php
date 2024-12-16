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
            <span class="text">Maya Checkout</span>
            <div id="itemParent"></div>
            <button id="addItemBtn">Add Item</button>
            <button id="payBtn">Pay Now</button>
        </div>
        <div class="window">
            <span class="text">Add Customer</span>
            <label for="phoneField">Enter phone number below:</label>
            <input type="text" class="phoneField" name="phoneField" placeholder="+639991234567">
            <label for="emailField">Enter email below:</label>
            <input type="text" class="emailField" name="emailField" placeholder="maya.juan@gmail.com">
            <label for="fNameField">Enter first name below:</label>
            <input type="text" class="fNameField" name="fNameField" placeholder="Pay">
            <label for="mNameField">Enter middle name below:</label>
            <input type="text" class="mNameField" name="mNameField" placeholder="Maya">
            <label for="lNameField">Enter last name below:</label>
            <input type="text" class="lNameField" name="lNameField" placeholder="Juan">
            <button id="addCustomerBtn">Add customer</button>
        </div>
        <div class="window">
            <span class="text">Add Card</span>
            <label for="cardNumField">Enter card num below:</label>
            <select id="cardNumField" class="styled-select">
                <option value="4123450131001381">4123450131001381</option>
                <option value="4123450131001522">4123450131001522</option>
                <option value="4123450131004443">4123450131004443</option>
            </select>
            <label for="expMonthField">Enter expiry month below:</label>
            <input type="text" class="expMonthField" name="expMonthField" placeholder="Expiry month here">
            <label for="expYearField">Enter expiry year below:</label>
            <input type="text" class="expYearField" name="expYearField" placeholder="Expiry year here">
            <label for="cvcField">Enter cvc below:</label>
            <input type="text" class="cvcField" name="cvcField" placeholder="CVC here">
            <button id="addCardBtn">Add card</button>
        </div>
        <div class="window">
            <label for="totalAmtVault">Enter total amount:</label>
            <input type="text" class="totalAmtVault" name="totalAmtVault" placeholder="Total amount here">
            <button id="payAndSaveBtn">Pay and Save a Card</button>
            <button id="logBtn">Log Tokens</button>
        </div>
    </div>

    <script type="module" src="js/main.js"></script>
</body>

</html>