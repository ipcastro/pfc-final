require("dotenv").config();
const app = require("./app");
const { connectToDatabase } = require("./database/db");
const { connectToChatDatabase } = require("./database/chatDb");

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        // Conectar ao database principal (fisica_divertida)
        await connectToDatabase();

        // Conectar ao database de chat (chatbot)
        await connectToChatDatabase();

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
            console.log(
                "✅ Conectado aos databases: fisica_divertida e chatbot",
            );
        });
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
}

startServer();
