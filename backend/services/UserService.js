const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserService {
    async register(userData) {
        const { nome, sobrenome, email, senha } = userData;

        // Validation
        if (!nome || !sobrenome || !email || !senha) {
            throw new Error("Todos os campos são obrigatórios");
        }

        // Check if user already exists
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Este e-mail já está cadastrado");
        }

        // Create user
        const newUser = await userRepository.create({
            nome,
            sobrenome,
            email,
            password: senha,
        });

        return {
            message: "Usuário cadastrado com sucesso!",
            user: {
                id: newUser._id,
                nome: newUser.nome,
                sobrenome: newUser.sobrenome,
                email: newUser.email,
            },
        };
    }

    async login(credentials) {
        const { email, senha } = credentials;

        // Check if senha field exists
        if (!senha) {
            throw new Error("Dados de login incompletos.");
        }

        // Find user by email (password field should be included thanks to .select('+password'))
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("E-mail ou senha inválidos.");
        }

        if (!user.password) {
            console.error("Password field not found in user object:", user._id);
            throw new Error("Erro interno do servidor.");
        }

        const isMatch = await user.comparePassword(senha);
        if (!isMatch) {
            throw new Error("E-mail ou senha inválidos.");
        }

        const token = jwt.sign(
            { id: user._id, nome: user.nome },
            process.env.JWT_SECRET || "17cc634a0ccf32354c7bab9ee29fe802",
            {
                expiresIn: "1d",
            },
        );

        return {
            token,
            user: {
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
            },
        };
    }

    async create(userData) {
        try {
            // Check if user already exists
            const existingUser = await userRepository.findByEmail(
                userData.email,
            );
            if (existingUser) {
                throw new Error("Nome de usuário já existe");
            }

            // Create user
            const user = await userRepository.create(userData);
            return {
                message: "Usuário criado com sucesso",
                user: {
                    id: user._id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    email: user.email,
                    role: user.role,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await userRepository.findAll({}, { password: 0 });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            // Validate if ID is a valid ObjectId
            if (!require("mongoose").Types.ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }

            const user = await userRepository.findById(id);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            // Remove password from response
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        } catch (error) {
            throw error;
        }
    }

    async update(id, userData) {
        try {
            // Validate if ID is a valid ObjectId
            if (!require("mongoose").Types.ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }

            // Check for email conflicts
            if (userData.email) {
                const existingUser = await userRepository.findByEmail(
                    userData.email,
                );
                if (existingUser && existingUser._id.toString() !== id) {
                    throw new Error("Este e-mail já está cadastrado");
                }
            }

            // Hash password if provided
            if (userData.senha) {
                userData.password = await bcrypt.hash(userData.senha, 10);
                delete userData.senha;
            }

            const updatedUser = await userRepository.updateById(id, userData);
            if (!updatedUser) {
                throw new Error("Usuário não encontrado");
            }

            return {
                message: "Usuário atualizado com sucesso",
                user: {
                    id: updatedUser._id,
                    nome: updatedUser.nome,
                    sobrenome: updatedUser.sobrenome,
                    email: updatedUser.email,
                    role: updatedUser.role,
                },
            };
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            // Validate if ID is a valid ObjectId
            if (!require("mongoose").Types.ObjectId.isValid(id)) {
                throw new Error("ID inválido");
            }

            const user = await userRepository.deleteById(id);
            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            return { message: "Usuário excluído com sucesso" };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();
