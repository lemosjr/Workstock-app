module.exports = {
    // ==========================================
    // 1. REGISTRO - POST /auth/register
    // ==========================================
    '/auth/register': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Cadastrar uma nova conta de usuário [RF002]',
            description: 'Cria uma nova conta no sistema. O tipo de usuário define as permissões.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserRegister' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Conta criada com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos ou cadastros duplicados.' }
            }
        }
    },

    // ==========================================
    // 2. LOGIN - POST /auth/login
    // ==========================================
    '/auth/login': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Efetuar login no sistema [RF001]',
            description: 'Autentica o usuário e retorna tokens de acesso.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/UserLogin' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Login efetuado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthResponse' }
                        }
                    }
                },
                401: { description: 'Credenciais inválidas.' }
            }
        }
    },

    // ==========================================
    // 3. REFRESH TOKEN - POST /auth/refresh-token
    // ==========================================
    '/auth/refresh-token': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Renovar access token',
            description: 'Utiliza o refresh token para gerar um novo access token.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/RefreshTokenRequest' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Token renovado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/RefreshTokenResponse' }
                        }
                    }
                },
                400: { description: 'Refresh token não fornecido.' },
                401: { description: 'Refresh token inválido ou expirado.' }
            }
        }
    },

    // ==========================================
    // 4. LOGOUT - POST /auth/logout
    // ==========================================
    '/auth/logout': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Realizar logout',
            description: 'Revoga o refresh token, encerrando a sessão atual.',
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/LogoutRequest' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Logout realizado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LogoutResponse' }
                        }
                    }
                },
                400: { description: 'Refresh token não fornecido.' },
                401: { description: 'Token não fornecido ou inválido.' }
            }
        }
    },

    // ==========================================
    // 5. LOGOUT ALL DEVICES - POST /auth/logout-all
    // ==========================================
    '/auth/logout-all': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Logout de todos os dispositivos',
            description: 'Revoga todos os refresh tokens do usuário, encerrando todas as sessões.',
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Logout de todos os dispositivos realizado.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LogoutAllResponse' }
                        }
                    }
                },
                401: { description: 'Token não fornecido ou inválido.' }
            }
        }
    },

    // ==========================================
    // 6. SOLICITAR RECUPERAÇÃO - POST /auth/recuperar-senha
    // ==========================================
    '/auth/recuperar-senha': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Solicitar recuperação de senha [RF003]',
            description: 'Envia um código OTP de 6 dígitos para o e-mail do usuário.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/RecuperarSenhaRequest' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Código enviado com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/RecuperarSenhaResponse' }
                        }
                    }
                },
                400: { description: 'E-mail inválido.' }
            }
        }
    },

    // ==========================================
    // 7. REDEFINIR SENHA - POST /auth/redefinir-senha
    // ==========================================
    '/auth/redefinir-senha': {
        post: {
            tags: ['Autenticação e Usuários'],
            summary: 'Redefinir senha com OTP',
            description: 'Redefine a senha usando o código OTP recebido por e-mail.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/RedefinirSenhaRequest' }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Senha redefinida com sucesso.',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/RedefinirSenhaResponse' }
                        }
                    }
                },
                400: { description: 'Dados inválidos ou código expirado.' }
            }
        }
    }
};