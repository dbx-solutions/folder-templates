/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;
let i = 0;
// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

const port = process.env.PORT || 1337;

// Sets server port and logs message on success
app.listen(port, () => console.log(`webhook is listening on port ${port}`));

app.get("/test", (req, res) => {
  console.log("here");
  res.send("hello there");
})

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  console.log("requested!");
  // Parse the request body from the POST
  let body = req.body;

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      // Check the Incoming webhook message
      console.log(JSON.stringify(req.body, null, 2));
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      // let type = req.body.entry[0].changes[0].value.messages[0].type;
      // if (type === "text") {
      //   let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      // } else if (type === "image") {
      //   let msg_body = null;
      // }
      if (i === 0) {
        sendMessage(phone_number_id, from, "Hi! How can I help you? Respond with a number...\n1. Get A File\n2. Upload a new file\n3. Share a file");
        i = 1;
      } else if(i === 1) {
        sendMessage(phone_number_id, from, "Ok! Which type of file do you need?\n1. ID\n2. School Report\n3. Medical Document");
        i = 2;
      } else if(i === 2) {
        sendMessage(phone_number_id, from, "You selected ID. Here's what you have uploaded in the past\n1. Passport\n2. New York License\n3. Birth Certificate");
        i = 3
      } else if(i === 3) {
        sendMessage(phone_number_id, from, "Here is your New York License!");
        sendMessage(phone_number_id, from, "TODO: Figure out images...");
        i = 0;
      }
      res.sendStatus(200);
    } else {
      // Return a '404 Not Found' if event is not from a WhatsApp API
      res.sendStatus(404);
    }
  }
});

function sendMessage(phone_number_id, from, message) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v14.0/" +
      phone_number_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      to: from,
      text: { body: message },
    },
    headers: { "Content-Type": "application/json" },
  });
}

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
