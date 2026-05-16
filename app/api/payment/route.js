export async function POST(request) {
  try {
    const { amount, plan } = await request.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(keyId + ':' + keySecret).toString('base64')
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
        notes: { plan }
      })
    });

    const order = await response.json();
    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });

  } catch (error) {
    console.error('PAYMENT ERROR:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
