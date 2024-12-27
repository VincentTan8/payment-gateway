let customerId, cardTokenId
// const logBtn = document.getElementById('logBtn')
// logBtn.addEventListener('click', () => {
//     console.log("customer id "+customerId)
//     console.log("card token id "+cardTokenId)
// })

const addItemBtn = document.getElementById('addItemBtn')
addItemBtn.addEventListener('click', () => {
    addItem()
})

const payBtn = document.getElementById('payBtn')
payBtn.addEventListener('click', () => {
    postPayment()
})

// const addCustomerBtn = document.getElementById('addCustomerBtn')
// addCustomerBtn.addEventListener('click', () => {
//     createCustomer()
// })

// const addCardBtn = document.getElementById('addCardBtn')
// addCardBtn.addEventListener('click', () => {
//     createCard()
// })

const linkCardBtn = document.getElementById('linkCardBtn')
linkCardBtn.addEventListener('click', () => {
    linkCardToCustomer()
})

const payAndSaveBtn = document.getElementById('payAndSaveBtn')
payAndSaveBtn.addEventListener('click', () => {
    createVaultedPayment()
})

function addItem() {
    // Create a new "window" div
    const entryDiv = document.createElement('div')
    entryDiv.className = 'flex column item'

    // Add text fields and other elements
    entryDiv.innerHTML = `
        <label for="itemName">Enter item name below:</label>
        <input type="text" class="itemName" name="itemName" placeholder="Item name here">
        <label for="itemAmt">Enter item amount below:</label>
        <input type="text" class="itemAmt" name="itemAmt" placeholder="Item amount here">
        <label for="itemQty">Enter item quantity below:</label>
        <input type="text" class="itemQty" name="itemQty" placeholder="Item quantity here">
        <button class="remove-entry">Remove Item</button>
    `
    // Append the new entry to the entries container
    const entriesContainer = document.getElementById('itemParent')
    entriesContainer.appendChild(entryDiv)

    // Add event listener to remove button
    const removeButton = entryDiv.querySelector('.remove-entry')
    removeButton.addEventListener('click', () => {
        entryDiv.remove()
    })
}
//maya checkout
async function postPayment() {
    const itemParent = document.getElementById('itemParent')
    const itemList = itemParent.querySelectorAll('.item')
    const payCurrency = "PHP"
    let totalPay = 0

    const itemData = []

    itemList.forEach(item => {
        const entry = { 
            amount: { value: 0 },
            totalAmount: { value: 0 },
            name: '',
            quantity: '',
        }
        entry.name = item.querySelector('.itemName').value

        const amt = item.querySelector('.itemAmt').value
        entry.amount.value = parseInt(amt)

        const qty = item.querySelector('.itemQty').value
        entry.quantity = qty
        entry.totalAmount.value = parseInt(amt) * parseInt(qty)
        totalPay += entry.totalAmount.value
        itemData.push(entry)
    })
     
    if(itemList) {
        // Prepare data to send
        const data = { 
            totalAmount: {
                value: totalPay, 
                currency: payCurrency
            },
            redirectUrl: { //should change to your response pages
                success: 'http://localhost/payment-gateway/success.php',
                //failure: 'https://www.mechantsite.com/failure?id=5fc10b93-bdbd-4f31-b31d-4575a3785009',
                failure: 'http://localhost/payment-gateway/failed.php',
                cancel: 'http://localhost/payment-gateway/cancelled.php'
            },
            //should be generated by the business website
            requestReferenceNumber: '5fc10b93-bdbd-4f31-b31d-4575a3785009',
            buyer: {
                contact: {email: 'vincent@gmail.com'},
                firstName: 'vincent',
                middleName: 'd',
                lastName: 'tan',
                birthday: '1994-01-30', //this is the required date format
                sex: 'M',
            },
            items: itemData,
        }

        fetch('checkout.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        })
        .then(response => response.json())
        .then(result => {
            if (result.redirectUrl) {
                setTimeout(() => {
                    window.open(result.redirectUrl, '_blank')
                }, 50)
            } else {
                console.error('Error:', result.error, result.field, result.description)
            }
        })
        .catch(error => console.error('Error:', error))
        
    } else 
        alert('Invalid Payment Input')
}

async function createCustomer() {
    const phone = document.querySelector('.phoneField').value
    const email = document.querySelector('.emailField').value
    const firstName = document.querySelector('.fNameField').value
    const middleName = document.querySelector('.mNameField').value
    const lastName = document.querySelector('.lNameField').value

    const data = {
            contact: {phone: phone, email: email},
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
    }

    try {
        const response = await fetch('https://pg-sandbox.paymaya.com/payments/v1/customers', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic c2stS2ZtZkxKWEZkVjV0MWluWU44bElPd1NydWVDMUcyN1NDQWtsQnFZQ2RyVTo='
            },
            body: JSON.stringify(data)
        })

        // Handle the response
        const result = await response.json()
        if(response.status === 200) {
            //save this info
            console.log("customer id "+result.id)
            customerId = result.id
            return customerId
        } else {
            console.log(result.message + ": " +
                result.parameters[0].field + " - " +
                result.parameters[0].description)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function createCard() {

    const cardNum = document.getElementById('cardNumField').value
    console.log(cardNum)
    const expMonth = document.querySelector('.expMonthField').value
    const expYear = document.querySelector('.expYearField').value
    const cvc = document.querySelector('.cvcField').value

    const data = {
        card: {
            expMonth: expMonth, 
            number: cardNum, 
            expYear: expYear, 
            cvc: cvc,
        }
    }

    try {
        const response = await fetch('https://pg-sandbox.paymaya.com/payments/v1/payment-tokens', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic cGstZW80c0wzOTNDV1U1S212ZUpVYVc4VjczMFRUZWkyelk4ekU0ZEhKRHhrRjo='
            },
            body: JSON.stringify(data)
        })

        // Handle the response
        const result = await response.json()
        if(response.status === 200) {
            //save this info
            console.log("payment token id "+result.paymentTokenId)
            return result.paymentTokenId
        } else {
            console.log(result.message + ": " +
                result.parameters[0].field + " - " +
                result.parameters[0].description)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function linkCardToCustomer() {
    const customerId = await createCustomer()
    const paymentTokenId = await createCard()
    const data = {
        isDefault: true, //makes the card default of the customer
        redirectUrl: {
            success: 'http://localhost/payment-gateway/success.php',
            failure: 'http://localhost/payment-gateway/failed.php',
            cancel: 'http://localhost/payment-gateway/cancelled.php'
        },
        paymentTokenId: paymentTokenId,
    }

    try {
        const response = await fetch(`https://pg-sandbox.paymaya.com/payments/v1/customers/${customerId}/cards`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic c2stS2ZtZkxKWEZkVjV0MWluWU44bElPd1NydWVDMUcyN1NDQWtsQnFZQ2RyVTo='
            },
            body: JSON.stringify(data)
        })

        // Handle the response
        const result = await response.json()
        if(response.status === 200) {
            //save this info
            console.log("card token id "+result.cardTokenId)
            cardTokenId = result.cardTokenId

            document.getElementById('custID').textContent = customerId
            document.getElementById('cardID').textContent = cardTokenId

            return cardTokenId
            setTimeout(() => {
                window.location.href = result.verificationUrl
            }, 50)
        } else {
            console.log(result.message + ": " +
                result.parameters[0].field + " - " +
                result.parameters[0].description)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function createVaultedPayment(custId = customerId, cTokenId = cardTokenId, vaulted = false) {    
    const totalAmt = document.querySelector('.totalAmtVault').value

    const data = {
        totalAmount: {currency: 'PHP', amount: parseInt(totalAmt)},
        redirectUrl: {
            success: 'http://localhost/payment-gateway/success.php',
            failure: 'http://localhost/payment-gateway/failed.php',
            cancel: 'http://localhost/payment-gateway/cancelled.php'
        },
    }
    
    try {
        const response = await fetch(`https://pg-sandbox.paymaya.com/payments/v1/customers/${custId}/cards/${cTokenId}/payments`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic c2stS2ZtZkxKWEZkVjV0MWluWU44bElPd1NydWVDMUcyN1NDQWtsQnFZQ2RyVTo='
            },
            body: JSON.stringify(data)
        })

        // Handle the response
        const result = await response.json()
        if(response.status === 200) {
            //save this info
            console.log("vaulted result ")
            console.dir(result)
            setTimeout(() => {
                if(!vaulted)
                    window.open(result.verificationUrl, '_blank')
                else
                    alert(result.status+"! Paid with "+result.fundSource.details.masked)
            }, 50)
        } else {
            console.log(result.message + ": " +
                result.parameters[0].field + " - " +
                result.parameters[0].description)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}
//not used yet
function addSavedCard() {
    // Create a new "window" div
    const entryDiv = document.createElement('div')
    entryDiv.className = 'flex row item'

    // Add text fields and other elements
    entryDiv.innerHTML = `
        <span id="custID" class="wrapLongText">1af2da92-3826-4bad-b963-4502a84d47bf</span>
        <span id="cardID"
            class="wrapLongText">A4hRK46ejbep0BN1ulzrC6IHnsWoR93gBXGAegjrVlMcr3JOh04fPtt37vUDpzWvNmiZkUlIugjLqRvxcPB0SxsddBaOoPD0dCUeNyJRy2DuK03dpF1NQwFwwscGlp7Gm7osvZDD3dxElvApVVq9DjdXNOi3nL1edqjrfKpa3M
        </span>
        <button id="autoDeductBtn">Auto Deduct Card</button>
    `
    // Append the new entry to the entries container
    const entriesContainer = document.getElementById('savedCards')
    entriesContainer.appendChild(entryDiv)

    const autoDeductBtn = document.getElementById('autoDeductBtn')
    autoDeductBtn.addEventListener('click', () => {
        createVaultedPayment(customerId, cardTokenId)
    })
}

const autoDeductBtn = document.getElementById('autoDeductBtn')
    autoDeductBtn.addEventListener('click', () => {
        const cust = document.getElementById('custID').textContent
        const card = document.getElementById('cardID').textContent
        createVaultedPayment(cust, card, true)
    })
