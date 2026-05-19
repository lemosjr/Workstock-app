const userService = require('../service/UserService');

class AuthController {
    // C - CREATE: Cadastrar conta [RF002]
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Preencha todos os campos obrigatórios (nome, email e senha).' });
            }

            const newUser = await userService.registerAccount({ name, email, passwordHash: password });
            
            return res.status(201).json({
                message: 'Conta vinculada ao sistema com sucesso!',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // R - READ: Efetuar login [RF001]
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }

            const user = await userService.authenticateLogin(email, password);

            return res.status(200).json({
                message: 'Login efetuado com sucesso!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    // R - READ: Listar todos os usuários (Painel Administrativo)
    async getAll(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // R - READ: Obter perfil específico por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            
            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // U - UPDATE: Editar dados do perfil [RF004]
    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUserProfile(id, req.body);
            
            return res.status(200).json({
                message: 'Dados de perfil atualizados com sucesso!',
                user: {
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // D - DELETE: Excluir conta de usuário
    async delete(req, res) {
        try {
            const { id } = req.params;
            await userService.deleteUserAccount(id);
            
            return res.status(200).json({
                message: 'Conta de usuário excluída com sucesso do sistema.'
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();