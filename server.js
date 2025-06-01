const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Basic transaction endpoints
app.get("/transaction", async (req, res) => {
  res.status(200).send("transaction api")
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post("/process", (req, res) => {
  const { accountNumber, amount } = req.body;

  if (!accountNumber || !amount) {
    return res.status(400).json({
      status: "error",
      message: "Account number and amount are required",
    });
  }

  console.log(`Transaction for Account ${accountNumber}: $${amount}`);
  res.json({
    status: "success",
    message: "Transaction processed!",
    details: {
      accountNumber,
      amount,
      timestamp: new Date().toISOString(),
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

// Start the server
app.listen(port,'0.0.0.0', () => {
  console.log(`Transaction app running on port ${port}`);
});
