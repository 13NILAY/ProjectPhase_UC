
const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controller/reviews');


router.post('/reviews', createReview);

router.get('/reviews', getAllReviews);

router.get('/reviews/:id', getReviewById);

router.put('/reviews/:id', updateReview);

router.delete('/reviews/:id', deleteReview);

module.exports = router;
