const addItemBtn = document.getElementById('addItemBtn')
addItemBtn.addEventListener('click', () => {
    addItem()
})

const payBtn = document.getElementById('payBtn')
payBtn.addEventListener('click', () => {
    postPayment()
})

const addCustomerBtn = document.getElementById('addCustomerBtn')
addCustomerBtn.addEventListener('click', () => {
    createCustomer()
})

const addCardBtn = document.getElementById('addCardBtn')
addCardBtn.addEventListener('click', () => {
    createCard()
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

async function postPayment() {
    const itemList = document.querySelectorAll('.item')
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

        try {
            // Send POST request using fetch
            const response = await fetch('https://pg-sandbox.paymaya.com/checkout/v1/checkouts', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    //should be stored in secure db
                    //base64 encoding
                    authorization: 'Basic cGstWjBPU3pMdkljT0kyVUl2RGhkVEdWVmZSU1NlaUdTdG5jZXF3VUU3bjBBaDo=',
                },
                body: JSON.stringify(data)
            })

            // Handle the response
            const result = await response.json()
            console.log(result)
            if(response.status === 200) {
                setTimeout(() => {
                    window.location.href = result.redirectUrl
                }, 50)
            }

        } catch (error) {
            console.error('Error:', error)
        }
    } else 
        alert('Invalid Payment Input')
}

async function createCustomer() {
    const data = {
            contact: {phone: '+639334565456', email: 'maya.juan@mail.com'},
            firstName: 'Vincent',
            middleName: 's',
            lastName: 'p',
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
            console.log(result.id)
            return result.id
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function createCard() {
    const data = {
        card: {
            expMonth: '12', 
            number: '4123450131001381', 
            expYear: '2025', 
            cvc: '123'
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
            console.log(result.paymentTokenId)
            return result.paymentTokenId
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function linkCardToCustomer() {
    const customerId = createCustomer()
    const paymentTokenId = createCard()
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
                authorization: 'Basic cGstZW80c0wzOTNDV1U1S212ZUpVYVc4VjczMFRUZWkyelk4ekU0ZEhKRHhrRjo='
            },
            body: JSON.stringify(data)
        })

        // Handle the response
        const result = await response.json()
        if(response.status === 200) {
            //save this info
            console.log(result.cardTokenId)
            return result.cardTokenId
            setTimeout(() => {
                window.location.href = result.verificationUrl
            }, 50)
        }
    } catch (error) {
        console.error('Error:', error)
    }
}