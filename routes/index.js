import express from "express";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Dashboard
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard", { title: "Dashboard" });
});

// Login
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/login", function (req, res, next) {
  res.redirect("/dashboard");
});

// Logout
router.get("/logout", function (req, res, next) {
  res.redirect("/login");
});

// Report Penjualan
router.get("/report", function (req, res, next) {
  res.render("report", { title: "Report Penjualan" });
});

// Request Penjualan
router.get("/request", function (req, res, next) {
  res.render("request", { title: "request" });
});

// Invoice
router.get("/invoice", function (req, res, next) {
  res.render("invoice", { title: "invoice" });
});

// SO
router.get("/so", function (req, res, next) {
  res.render("so", { title: "so" });
});

// SQ
router.get("/sq", function (req, res, next) {
  res.render("sq", { title: "sq" });
});

module.exports = router;
