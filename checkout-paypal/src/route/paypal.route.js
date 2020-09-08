const { Router } = require('express');
const handlerPayment = require('../controller/paypal.controller');

const router = Router();

router.route('/api/paypal')
   .post(handlerPayment);

module.exports = router;