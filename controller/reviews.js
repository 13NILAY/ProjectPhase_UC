const Review=require("../model/reviews");


const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review === null) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review === null) {
            return res.status(404).json({ message: 'Review not found' });
        }
        Object.assign(review, req.body);
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review === null) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.remove();
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};
