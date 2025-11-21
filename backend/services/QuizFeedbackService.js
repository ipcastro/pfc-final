const QuizFeedbackRepository = require('../repositories/QuizFeedbackRepository');

class QuizFeedbackService {
    async addFeedback(userId, quizId, feedback, opinion) {
        // A verificação de duplicados é tratada pelo índice exclusivo no modelo do banco de dados,
        // o que lançará um erro se um feedback para o mesmo usuário e quiz já existir.
        return QuizFeedbackRepository.create({ userId, quizId, feedback, opinion });
    }

    async hasUserGivenFeedback(userId, quizId) {
        const feedback = await QuizFeedbackRepository.findByUserAndQuiz(userId, quizId);
        return !!feedback;
    }
}

module.exports = new QuizFeedbackService();
