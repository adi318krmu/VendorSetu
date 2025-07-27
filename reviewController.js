const Review = require('../models/review');
const Vendor = require('../models/vendor');
const Order = require('../models/order');

// Add a review for a supplier
exports.addReview = async (req, res) => {
  try {
    const { reviewer, rating, comment } = req.body;
    const { supplierId } = req.params;

    // Check if vendor exists
    const vendor = await Vendor.findById(reviewer);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    // Optional: Check if vendor has ordered from this supplier
    const hasOrdered = await Order.exists({ vendor: reviewer, supplier: supplierId });
    if (!hasOrdered) {
      return res.status(403).json({ error: 'Vendor has not ordered from this supplier' });
    }

    const review = new Review({
      supplier: supplierId,
      reviewer,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews for a supplier
exports.getSupplierReviews = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const reviews = await Review.find({ supplier: supplierId })
      .populate('reviewer', 'name email')
      .sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 