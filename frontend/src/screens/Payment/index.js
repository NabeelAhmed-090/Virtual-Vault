import React, { useState } from 'react';
import Stripe from 'stripe';

const stripe = new Stripe('YOUR_STRIPE_API_KEY_HERE');

function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvc, setCvc] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        stripe.tokens.create({
            card: {
                number: cardNumber,
                exp_month: expDate.split('/')[0],
                exp_year: expDate.split('/')[1],
                cvc: cvc
            }
        }).then((result) => {
            console.log(result);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />

            <label htmlFor="expDate">Expiration Date (MM/YY)</label>
            <input type="text" id="expDate" value={expDate} onChange={(e) => setExpDate(e.target.value)} />

            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} />

            <button type="submit">Pay</button>
        </form>
    );
}


export default Payment;