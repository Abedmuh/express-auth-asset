const midtransClient = require('midtrans-client');
const InvariantError = require('../exceptions/InvariantError');
const { nanoid } = require('nanoid')

const addPaymentLink = async (gross_amount, first_name, last_name, email, phone) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });

    let parameter = {
      "transaction_details": {
        "order_id": `payment-${nanoid(8)}`,
        "gross_amount": Number(gross_amount)
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": String(phone)
      }
    };
    let uri = await snap.createTransaction(parameter)

    return uri
  } catch (err) {
    throw new InvariantError(err)
  }
}

module.exports = {
  addPaymentLink
}