import { buffer } from "micro";
import * as admin from "firebase-admin";

//Secure connection to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length // si no hay app inicializada
  ? admin.initializeApp({
      // iniciar app
      credential: admin.credential.cert(serviceAccount), //credenciales
    })
  : admin.app();

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  //   console.log("fullfilling order", session);
  try {
    return app
      .firestore()
      .collection("users")
      .doc(session.metadata.email)
      .collection("orders")
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
      });
  } catch (error) {
    console.log(error);
  }
};

export default async (req, res) => {

  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    // console.log(req)

    let event;

    //Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle the checkout.sessioin.completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fullfill the order
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error ${err.message}`));
    }
  }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
