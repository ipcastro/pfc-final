const BaseRepository = require('./BaseRepository');
const QuizFeedback = require('../models/QuizFeedback');

class QuizFeedbackRepository extends BaseRepository {
    constructor() {
        super(QuizFeedback);
    }

    async findByUserAndQuiz(userId, quizId) {
        return this.model.findOne({ userId, quizId });
    }
}

module.exports = new QuizFeedbackRepository();
