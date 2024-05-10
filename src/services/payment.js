const InvariantError = require('../exceptions/InvariantError');
const { nanoid } = require('nanoid')
const { getSnapInstance } = require('../utils/midtrans');


const addPaymentLink = async (items, owner) => {
  try {
    const snap = getSnapInstance();

    let gross_amount = 0
    for (let i = 0; i < items.length; i++) {
      gross_amount += items[i].price;
    }

    let parameter = {
      "transaction_details": {
        "order_id": `payment-${nanoid(8)}`,
        "gross_amount": gross_amount
      },
      "items_details": items,
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "first_name": owner.name,
        "email": owner.email,
        "phone": String(owner.phone)
      }
    };
    let uri = await snap.createTransaction(parameter)
    parameter.payments = uri

    return parameter
  } catch (err) {
    throw new InvariantError(err)
  }
}

module.exports = {
  addPaymentLink
}