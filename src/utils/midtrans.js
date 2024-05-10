const midtransClient = require('midtrans-client');

let snap = null;

const initializeSnap = () => {
  if (!snap) {
    snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });
  }
};

const getSnapInstance = () => {
  initializeSnap();
  console.log('SnapInstance is available')
  return snap;
};

module.exports = {
  getSnapInstance
};
