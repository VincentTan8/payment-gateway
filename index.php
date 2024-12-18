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
        <h2>Payment Gateway Functionality Demo</h2>
    </div>
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
            <input type="text" class="phoneField" name="phoneField" placeholder="+639991234567" value="+639991234567">
            <label for="emailField">Enter email below:</label>
            <input type="text" class="emailField" name="emailField" placeholder="maya.juan@gmail.com"
                value="maya.juan@gmail.com">
            <label for="fNameField">Enter first name below:</label>
            <input type="text" class="fNameField" name="fNameField" placeholder="Pay" value="Pay">
            <label for="mNameField">Enter middle name below:</label>
            <input type="text" class="mNameField" name="mNameField" placeholder="Maya" value="Maya">
            <label for="lNameField">Enter last name below:</label>
            <input type="text" class="lNameField" name="lNameField" placeholder="Juan" value="Juan">
            <!-- <button id="addCustomerBtn">Add customer</button> -->
        </div>
        <div class="window">
            <span class="text">Add Card</span>
            <label for="cardNumField">Enter card num below:</label>
            <select id="cardNumField" class="styled-select">
                <option value="4123450131001381">4123450131001381</option>
                <option value="4123450131000508">4123450131000508</option>
            </select>
            <label for="expMonthField">Enter expiry month below:</label>
            <input type="text" class="expMonthField" name="expMonthField" placeholder="Expiry month here" value="12">
            <label for="expYearField">Enter expiry year below:</label>
            <input type="text" class="expYearField" name="expYearField" placeholder="Expiry year here" value="2025">
            <label for="cvcField">Enter cvc below:</label>
            <input type="text" class="cvcField" name="cvcField" placeholder="CVC here" value="123">
            <!-- <button id="addCardBtn">Add card</button> -->
        </div>
        <div class="window">
            <div style="display: flex; flex-direction: column; align-items: center;">
                <span>Click below to</span>
                <span>link card to customer</span>
            </div>
            <button id="linkCardBtn">Link Card</button>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <span>Customer and Card Tokens</span>
                <span>should appear below</span>
                <span>if successful</span>
            </div>
        </div>
        <div class="window">
            <span>Link Card first then</span>
            <label for="totalAmtVault">Enter total amount:</label>
            <input type="text" class="totalAmtVault" name="totalAmtVault" placeholder="Total amount here">
            <button id="payAndSaveBtn">Pay and Save a Card</button>
            <!-- <button id="logBtn">Log Tokens</button> -->
        </div>
    </div>
    <div class="flex">
        <div class="window" style="width: 100%;">
            <div id="savedCards" style="width:100%;">
                <div class="flex row" style="justify-content: space-between">
                    <span style="width: 25%">Customer ID</span>
                    <span style="width: 45%">Card Token ID</span>
                    <span></span>
                </div>
                <div class="flex row item" style="justify-content: space-between">
                    <span id="custID" class="wrapLongText" style="width: 25%"></span>
                    <span id="cardID" class="wrapLongText" style="width: 45%"></span>
                    <button id="autoDeductBtn">Auto Deduct Card</button>
                </div>
            </div>
        </div>
    </div>

    <script type="module" src="js/main.js"></script>
</body>

</html>