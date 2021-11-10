const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const Xendit = require("xendit-node");
require("dotenv").config();
const Key = process.env.SECRET_KEY;
const x = new Xendit({
  secretKey: process.env.SECRET_KEY,
});

puppeteer.use(StealthPlugin());

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const websiteName = "buatcv.co.id"; /// add your domain like this format domain.com
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
const stripe = require("stripe")(process.env.STRIPE_SECRET);
app.post("/api/pay", async (req, res) => {
  var price = req.body.price;
  price = parseInt(price) * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
  res.json({
    client_secret: paymentIntent["client_secret"],
    server_time: Date.now(),
  });
});
app.post("/api/check", async (req, res) => {
  const accountType = req.body.accountType;
  const expDate = req.body.expDate;
  var specific_date = new Date(expDate);
  var current_date = new Date();
  /// We need to get account membership type - expiration. and check if the user can download the resume
  if (current_date.getTime() < specific_date.getTime()) {
    res.json({ status: "true" });
  } else {
    res.json({ status: "false" });
  }
});

app.post("/api/date", async (req, res) => {
  var current_date = new Date();
  res.json({ date: current_date });
});

app.get("/api/resume", async (req, res) => {});
///
app.post("/api/export", async (req, res) => {
  try {
    (async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/snap/bin/chromium",
      });
      const page = await browser.newPage();
      console.log("navigating to :  ");
      console.log(
        "https://" +
          websiteName +
          "/export/" +
          req.body.resumeName +
          "/" +
          req.body.resumeId +
          "/" +
          req.body.language
      );
      await page.goto(
        "https://" +
          websiteName +
          "/export/" +
          req.body.resumeName +
          "/" +
          req.body.resumeId +
          "/" +
          req.body.language,
        {
          timeout: 60000,
        }
      );
      await page.waitForSelector("#resumen", {
        visible: true,
      });
      await page.waitFor(3000);

      var pdf = await page.pdf({ path: "hn.pdf", format: "a4" });
      await browser.close();

      res.download("./hn.pdf");
    })();
  } catch (error) {}
});

app.get("/invoice/:id", async (req, res) => {
  try {
    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    const i = new Invoice(invoiceSpecificOptions);

    const resp = await i.createInvoice({
      amount: 30000.0,
      externalID: req.params.id,
      successRedirectURL: "https://buatcv.co.id/dashboard",
    });
    res.json(resp);
  } catch (err) {
    console.log(err);
  }
});
app.get("/get/:id", async (req, res) => {
  try {
    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    const i = new Invoice(invoiceSpecificOptions);

    const resp = await i.getInvoice({
      invoiceID: req.params.id,
    });
    res.json(resp);
  } catch (err) {
    console.log(err);
  }
});
app.get("/invoices", async (req, res) => {
  try {
    const { Invoice } = x;
    const invoiceSpecificOptions = {};
    const i = new Invoice(invoiceSpecificOptions);

    const resp = await i.getAllInvoices({
      statuses: ["PAID", "PENDING"],
      limit: 1000,
    });
    res.json(resp);
  } catch (err) {
    console.log(err);
  }
});

/// Just to check if api is working
app.get("/api/return", async (req, res) => {
  res.end("Hello World\n");
});

//-----------------------------Un-comment this code-------------------------------

// Listen both http & https ports
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync("/etc/letsencrypt/live/buatcv.co.id/privkey.pem"), // replace domain.com with your domain
//     cert: fs.readFileSync("/etc/letsencrypt/live/buatcv.co.id/fullchain.pem"), // replace domain.com with your domain
//   },
//   app
// );

// const httpServer = http.createServer({

//   }, app);

//---------------------Comment/del these 3 lines-----------------------
app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
