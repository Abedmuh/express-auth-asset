const paymentService = require('../services/payment')

const addPayment = async (req, res, next) => {
  try {
    const { gross_amount, first_name, last_name, email, phone } = req.body

    const uri = await paymentService.addPaymentLink(gross_amount, first_name, last_name, email, phone)
    res.status(200).json({
      message: 'Success',
      uri
    })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  addPayment
}