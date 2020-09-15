const paypal = require('paypal-rest-sdk');
const config = require('../../config/paypal.config')

const handlerPayment = () => ({
    payment: (req, res) => {

        paypal.configure(config)

        const { total, items, description } = req.body

        const createPaymentJSON = {
            'intent': 'sale',
            'payer': {
                'payment_method': 'paypal'
            },
            'redirect_urls': {
                'return_url': process.env.SUCCESSFULLY,
                'cancel_url': process.env.CANCEL
            },
            'transactions': [{
                'item_list': {
                    items
                },
                'amount': {
                    'currency': 'USD',
                    'total': total
                },
                'description': description
            }]
        }
    
        paypal.payment.create(createPaymentJSON, (error, payment) => {
            if(error){
                return res.status(200).json({'message': error})
            } else {
                for(let i = 0; i < payment.links.length; i++){
                    if(payment.links[i].rel === 'approval_url'){
                        return res.status(200).json({'url': payment.links[i].href});
                    }
                }
            }
        });
    }
})

module.exports = handlerPayment;