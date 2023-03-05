const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const mail = {
  to: "SamusievAnton@gmail.com",
  from: "Samusefffff@gmail.com",
  subject: "Hello",
  html: "<a>Перейдите по ссылке для подтверждения регистрации</a>",
};

sgMail
  .send(mail)
  .then(() => console.log("Email"))
  .catch((error) => console.log(error.message));

const contactsRouter = require("./routes/api/contacts");
const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/currentUser");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use(express.static("publik"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
