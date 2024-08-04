require('dotenv').config()
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_KEY))
});

const db = getFirestore();
const Mssg = db.collection("Mssgs");

module.exports = Mssg;