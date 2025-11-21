const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizFeedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: String, required: true },
    feedback: {
        type: String,
        enum: ['Satisfeito', 'Neutro', 'Não Satisfeito'],
        required: true
    },
    opinion: {
        type: String,
        required: false,
        trim: true,
        maxlength: 500 // Limite de caracteres para a opinião
    },
    createdAt: { type: Date, default: Date.now }
});

// Garante que um usuário só pode dar um feedback por quiz
QuizFeedbackSchema.index({ userId: 1, quizId: 1 }, { unique: true });

module.exports = mongoose.model('QuizFeedback', QuizFeedbackSchema);
