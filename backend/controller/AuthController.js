const userService = require('../service/UserService');

class AuthController {
    // Handler para o Cadastro de Conta [RF002]
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Validação de presença dos campos obrigatórios conforme o requisito [RF002]
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Preencha todos os campos obrigatórios (nome, email e senha).' });
            }

            const newUser = await userService.registerAccount({ name, email, passwordHash: password });
            
            // Retorna o status 201 (Created) de acordo com o padrão RESTful [NF022]
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
            // Retorna o erro capturado pela regra de negócio (ex: email já cadastrado)
            return res.status(400).json({ error: error.message });
        }
    }

    // Handler para o Efetuar login [RF001]
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
            }

            const user = await userService.authenticateLogin(email, password);

            // Retorna 200 OK com os dados do usuário autenticado [RF001, NF022]
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
            // Captura a exceção de credenciais inválidas [Fluxo Alternativo A01 do Caso de Uso]
            return res.status(401).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();