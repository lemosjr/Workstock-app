const userService = require('../service/UserService');
const logger = require('../config/logger');

class AuthController {
    // C - CREATE: Cadastrar conta [RF002]
    async register(req, res) {
        try {
            // Os dados já chegam limpos e validados pelo Joi aqui
            const { nome_razao, email, cpf_cnpj, senha, telefone, foto_perfil, tipo_usuario } = req.body;

            const newUser = await userService.registerAccount({
                nome_razao,
                email,
                cpf_cnpj,
                senha,
                telefone,
                foto_perfil,
                tipo_usuario
            });
            
            return res.status(201).json({
                message: 'Conta vinculada ao sistema com sucesso!',
                user: {
                    id: newUser.id,
                    nome_razao: newUser.nome_razao,
                    email: newUser.email,
                    tipo_usuario: newUser.tipo_usuario
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // R - READ: Efetuar login com entrega de Token JWT [RF001]
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // Executa a autenticação e recebe o objeto contendo user e token
            const sessionData = await userService.authenticateLogin(email, senha);

            // Retorna o token para o frontend salvar e autenticar as próximas rotas
            return res.status(200).json({
                message: 'Login efetuado com sucesso!',
                user: sessionData.user,
                token: sessionData.token
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
                nome_razao: user.nome_razao,
                email: user.email,
                cpf_cnpj: user.cpf_cnpj,
                telefone: user.telefone,
                foto_perfil: user.foto_perfil,
                tipo_usuario: user.tipo_usuario
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
                    nome_razao: updatedUser.nome_razao,
                    email: updatedUser.email,
                    tipo_usuario: updatedUser.tipo_usuario
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