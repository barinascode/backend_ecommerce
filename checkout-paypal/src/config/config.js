const paypal = require('paypal-rest-sdk');
const config = {};

paypal.configure({
    'mode': process.env.MODE,
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

config.createPaymentJSON = {
    'intent': 'sale',
    'payer': {
        'payment_method': 'paypal'
    },
    'redirect_urls': {
        'return_url': process.env.ROUTE_SUCCESS,
        'cancel_url': process.env.ROUTE_CANCEL
    },
    'transactions': [{
        'item_list': {
            'items': [{
                'name': 'item',
                'sku': 'item',
                'price': '1.00',
                'currency': 'USD',
                'quantity': 1
            }]
        },
        'amount': {
            'currency': 'USD',
            'total': '1.00'
        },
        'description': 'This is the payment description.'
    }]
};

module.exports = config;