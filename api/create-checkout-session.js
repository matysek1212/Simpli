import Stripe from 'stripe';
const stripe = new Stripe(process.env.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);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: process.env.price_1SXq3Q0ni8h4CvJZuwGIoGCH , quantity: 1 }],
    mode: 'subscription',
    success_url: 'https://matysek1212.github.io/success',
    cancel_url: 'https://matysek1212.github.io/cancel',
  });

  res.json({ id: price_1SXq3Q0ni8h4CvJZuwGIoGCH });
}

