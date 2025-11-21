const QuizFeedbackService = require('../services/QuizFeedbackService');
const jwt = require('jsonwebtoken');

// Função auxiliar para obter o ID do usuário a partir do token
const getUserIdFromToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.substring('Bearer '.length);
    try {
        // A chave secreta DEVE ser a mesma usada para assinar o token em UserService
        const secret = process.env.JWT_SECRET || "17cc634a0ccf32354c7bab9ee29fe802";
        const decoded = jwt.verify(token, secret);
        return decoded.id;
    } catch (error) {
        // Retorna nulo se o token for inválido ou expirado
        return null;
    }
};

class QuizFeedbackController {
    async addFeedback(req, res, next) {
        try {
            const userId = getUserIdFromToken(req);
            if (!userId) {
                return res.status(401).json({ message: 'Não autenticado ou token inválido.' });
            }

            const { quizId, feedback, opinion } = req.body;
            
            if (!quizId || !feedback || !['Satisfeito', 'Neutro', 'Não Satisfeito'].includes(feedback)) {
                return res.status(400).json({ message: 'quizId e um feedback válido são obrigatórios.' });
            }

            await QuizFeedbackService.addFeedback(userId, quizId, feedback, opinion);
            res.status(201).json({ message: 'Feedback salvo com sucesso.' });
        } catch (error) {
            // Código 11000 indica violação de índice único (feedback duplicado)
            if (error.code === 11000) {
                return res.status(409).json({ message: 'Feedback já enviado para este quiz.' });
            }
            next(error);
        }
    }

    async checkFeedback(req, res, next) {
        try {
            const userId = getUserIdFromToken(req);
            if (!userId) {
                // Se não houver usuário, podemos simplesmente dizer que ele não deu feedback ainda
                return res.status(200).json({ hasGivenFeedback: false, message: 'Usuário não autenticado.' });
            }

            const { quizId } = req.params;
            if (!quizId) {
                return res.status(400).json({ message: 'quizId é obrigatório.' });
            }

            const hasGivenFeedback = await QuizFeedbackService.hasUserGivenFeedback(userId, quizId);
            res.status(200).json({ hasGivenFeedback });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new QuizFeedbackController();
