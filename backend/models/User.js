const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"],
        trim: true,
    },
    sobrenome: {
        type: String,
        required: [true, "Sobrenome é obrigatório"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email é obrigatório"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email inválido",
        ],
    },
    password: {
        type: String,
        required: [true, "Senha é obrigatória"],
        minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    },
    role: {
        type: String,
        enum: ["admin", "editor", "user"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // Verifica se a senha não é nula ou indefinida
        if (!this.password || typeof this.password !== "string") {
            return next(new Error("Senha é obrigatória e deve ser uma string"));
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (
        !this.password ||
        typeof this.password !== "string" ||
        this.password.length < 10
    ) {
        throw new Error("Invalid password hash");
    }
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
