import Stripe from "stripe";

// >>> ZDE vlož svůj Stripe SECRET KEY (sk_test_... nebo sk_live_...) <<<
//!!!!   TOTO NESMÍ BÝT VEŘEJNÉ, JEN NA BACKENDU   !!!!
const stripe = new Stripe("sk_test_51SXpim0ni8h4CvJZeiEAns3bWU2m9u0hBnyR4xx7b26eAgtz3PrOPnFYhtnFCOUncsWTL4TsNSLq05LYoNrA8VGY00ep6KCfBG");

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          // >>> ZDE vlož svoje PRICE ID (price_xxxx) <<<
          price: "price_1SY02R0ni8h4CvJZ5enEh33C",  
          quantity: 1,
        },
      ],

      mode: "subscription",

      // URL musí existovat jako tvoje HTML stránky
      success_url: "https://matysek1212.github.io/success",
      cancel_url: "https://matysek1212.github.io/cancel",
    });

    // Vrací správné session ID
    res.status(200).json({ id: session.id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
