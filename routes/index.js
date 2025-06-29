var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Dashboard
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

// Login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  res.redirect('/dashboard');
});

// Logout
router.get('/logout', function(req, res, next) {
  res.redirect('/login');
});

// Report Penjualan
router.get('/report-penjualan', function(req, res, next) {
  res.render('report-penjualan', { title: 'Report Penjualan' });
});


module.exports = router;
