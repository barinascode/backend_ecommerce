const paypal = require('paypal-rest-sdk');
const { createPaymentJSON } = require('../config/config');

const handlerPayment = (req, res) => {
    const { amount, description } = req.body;

    createPaymentJSON.transactions[0].amount = amount;
    createPaymentJSON.transactions[0].description = description;

    paypal.payment.create(createPaymentJSON, (error, payment) => {
        if(error){
            throw error
        } else {
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.json({'url': payment.links[i].href});
                }
            }
        }
    });
}

module.exports = handlerPayment;