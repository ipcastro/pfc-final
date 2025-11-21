// Adicionado para usar a configuração da API
// const API_BASE = window.API_BASE || 'http://localhost:5000';

let quizQuestions = [];
let hqId = 1; // Default hqId

async function loadQuizData() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        hqId = parseInt(urlParams.get("hqId")) || 1;

        const response = await fetch("data/quizzes.json");
        if (!response.ok) {
            throw new Error("Não foi possível carregar os dados do quiz.");
        }
        const data = await response.json();

        const quiz = data.quizzes.find((q) => q.hqId === hqId);

        if (quiz) {
            quizQuestions = quiz.questions;
        } else {
            throw new Error("Quiz não encontrado para esta HQ.");
        }
    } catch (error) {
        console.error("Erro ao carregar o quiz:", error);
        const quizContainer = document.getElementById("quiz-container");
        if (quizContainer) {
            quizContainer.innerHTML = `<p class="text-red-500 text-center">${error.message}</p>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuizData();

    // ... (element getters from before)
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const feedbackContainer = document.getElementById("feedback-container");
    const nextButton = document.getElementById("next-button");
    const scoreContainer = document.getElementById("score-container");
    const quizContainer = document.getElementById("quiz-container");
    const resultsContainer = document.getElementById("results-container");
    const finalScore = document.getElementById("final-score");
    const resultMessage = document.getElementById("result-message");
    const restartButton = document.getElementById("restart-button");
    const progressBar = document.getElementById("progress-bar");

    // Elementos do feedback do quiz
    const quizFeedbackSection = document.getElementById(
        "quiz-feedback-section",
    );
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackThanks = document.getElementById("feedback-thanks");
    const satisfactionButtons = document.querySelectorAll(".feedback-btn");
    const opinionSection = document.getElementById("opinion-section");
    const opinionTextarea = document.getElementById("opinion-textarea");
    const submitFeedbackBtn = document.getElementById("submit-feedback-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let selectedSatisfaction = null;

    function startQuiz() {
        // ... (startQuiz logic from before)
        if (quizQuestions.length === 0) return;
        currentQuestionIndex = 0;
        score = 0;
        selectedOption = null;
        selectedSatisfaction = null;
        quizContainer.classList.remove("hidden");
        resultsContainer.classList.add("hidden");
        quizFeedbackSection.classList.add("hidden");
        opinionSection.classList.add("hidden");
        feedbackForm.classList.remove("hidden");
        feedbackThanks.classList.add("hidden");
        nextButton.classList.add("hidden");
        progressBar.style.width = "0%";
        satisfactionButtons.forEach((btn) =>
            btn.classList.remove("selected-satisfaction"),
        );
        updateScore();
        showQuestion();
    }

    function showQuestion() {
        // ... (showQuestion logic from before, with new button classes)
        feedbackContainer.innerHTML = "";
        feedbackContainer.classList.remove(
            "bg-green-100",
            "dark:bg-green-900/50",
            "bg-red-100",
            "dark:bg-red-900/50",
        );
        selectedOption = null;
        const question = quizQuestions[currentQuestionIndex];
        questionText.innerText = question.question;
        optionsContainer.innerHTML = "";
        const progress =
            ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;

        question.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add(
                "option-btn",
                "w-full",
                "text-left",
                "p-4",
                "rounded-lg",
                "border-2",
                "border-gray-200",
                "dark:border-gray-700",
                "hover:border-blue-500",
                "dark:hover:border-blue-500",
                "transition-all",
                "duration-200",
                "text-gray-700",
                "dark:text-gray-300",
            );
            button.onclick = () => selectOption(button, option);
            optionsContainer.appendChild(button);
        });
    }

    function selectOption(button, option) {
        // ... (selectOption logic from before)
        if (selectedOption) return;
        selectedOption = button;
        const question = quizQuestions[currentQuestionIndex];

        Array.from(optionsContainer.children).forEach((child) => {
            child.disabled = true;
        });

        if (option.startsWith(question.correctAnswer)) {
            score++;
            selectedOption.classList.add("correct");
            feedbackContainer.classList.add(
                "bg-green-100",
                "dark:bg-green-900/50",
            );
            feedbackContainer.innerHTML = `<div class="flex items-center"><div class="text-2xl mr-4">✅</div><div><p class="font-bold text-green-800 dark:text-green-300">Correto!</p><p class="text-sm text-gray-600 dark:text-gray-400">${question.explanation}</p></div></div>`;
        } else {
            selectedOption.classList.add("incorrect");
            feedbackContainer.classList.add("bg-red-100", "dark:bg-red-900/50");
            feedbackContainer.innerHTML = `<div class="flex items-center"><div class="text-2xl mr-4">❌</div><div><p class="font-bold text-red-800 dark:text-red-300">Incorreto!</p><p class="text-sm text-gray-600 dark:text-gray-400">A resposta correta é: <strong>${question.correctAnswer.toUpperCase()}</strong></p><p class="text-sm text-gray-600 dark:text-gray-400">${question.explanation}</p></div></div>`;

            Array.from(optionsContainer.children).forEach((child) => {
                if (child.innerText.startsWith(question.correctAnswer)) {
                    child.classList.add("correct");
                }
            });
        }

        updateScore();
        nextButton.classList.remove("hidden");
    }

    function updateScore() {
        scoreContainer.innerText = `Pontuação: ${score} / ${quizQuestions.length}`;
    }

    function showResults() {
        // ... (showResults logic from before)
        quizContainer.classList.add("hidden");
        resultsContainer.classList.remove("hidden");
        const percentage = Math.round((score / quizQuestions.length) * 100);
        finalScore.innerText = `Sua pontuação final: ${score} de ${quizQuestions.length} (${percentage}%)`;

        if (percentage >= 80) {
            resultMessage.innerText =
                "🌟 Excelente! Você domina bem os conceitos de cinemática!";
        } else if (percentage >= 60) {
            resultMessage.innerText =
                "👍 Bom trabalho! Continue estudando para melhorar ainda mais!";
        } else {
            resultMessage.innerText =
                "📚 Continue estudando! A prática leva à perfeição!";
        }

        checkAndShowFeedback();
    }

    async function checkAndShowFeedback() {
        // ... (checkAndShowFeedback logic from before)
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(
                `${API_BASE}/api/quiz-feedback/check/${hqId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            if (!response.ok) throw new Error("Falha ao verificar feedback.");

            const data = await response.json();
            if (!data.hasGivenFeedback) {
                quizFeedbackSection.classList.remove("hidden");
            }
        } catch (error) {
            console.error("Erro ao verificar feedback do quiz:", error);
        }
    }

    async function submitFeedback() {
        const token = localStorage.getItem("token");
        if (!token || !selectedSatisfaction) {
            // Maybe show an error message if no satisfaction level is selected
            return;
        }

        const opinion = opinionTextarea.value.trim();

        try {
            const response = await fetch(`${API_BASE}/api/quiz-feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quizId: hqId.toString(),
                    feedback: selectedSatisfaction,
                    opinion: opinion,
                }),
            });

            if (!response.ok) throw new Error("Falha ao enviar feedback.");

            feedbackForm.classList.add("hidden");
            feedbackThanks.classList.remove("hidden");
        } catch (error) {
            console.error("Erro ao enviar feedback:", error);
        }
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
            nextButton.classList.add("hidden");
        } else {
            showResults();
        }
    });

    restartButton.addEventListener("click", startQuiz);

    satisfactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSatisfaction = button.getAttribute('data-feedback');
            
            // Remove a seleção de todos os botões
            satisfactionButtons.forEach(btn => {
                btn.classList.remove('selected');
            });

            // Adiciona a classe 'selected' apenas ao botão clicado
            button.classList.add('selected');

            opinionSection.classList.remove('hidden');
        });
    });

    submitFeedbackBtn.addEventListener("click", submitFeedback);

    startQuiz();
});
