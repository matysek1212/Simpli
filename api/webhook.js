import Stripe from 'stripe';
const stripe = new Stripe(process.env.Ssk_live_51SXpim0ni8h4CvJZBNndrtnwMFHwEqpqab3rcU7e3f1yEo4FLrKiCGRrdzzYseUIr5H2vSUhNbdhIWZAZyNZncAK00mZFdyFOt);
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const event = req.body;

  if(event.type === 'checkout.session.completed') {
    const email = event.data.object.customer_email;

    // Aktivace předplatného přes Base44 API
    await fetch('https://api.base44.com/activate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.9010125abbaf41969972f13b804b50fe,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, plan: 'premium' })
    });
  }

  res.status(200).send('ok');
}
