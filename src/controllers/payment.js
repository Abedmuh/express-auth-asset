const paymentService = require('../services/payment')

const addPayment = async (req, res, next) => {
  try {
    const { items, owner } = req.body

    const uri = await paymentService.addPaymentLink(items, owner)
    res.status(200).json({
      message: 'Success',
      payments: uri
    })
  } catch (err) {
    next(err)
  }
}
module.exports = {
  addPayment
}