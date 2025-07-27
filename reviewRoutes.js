const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Add a review for a supplier
router.post('/supplier/:supplierId', reviewController.addReview);

// Get all reviews for a supplier
router.get('/supplier/:supplierId', reviewController.getSupplierReviews);

module.exports = router; 