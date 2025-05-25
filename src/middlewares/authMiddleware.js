const User = require('../models/UserModel');

module.exports = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).select('-password'); // Exclui a senha
            if (user) {
                res.locals.user = user; // Torna o usuário disponível nas views
            } else {
                res.locals.user = null;
            }
            next();
        } catch (error) {
            console.error("Erro ao buscar usuário na sessão:", error);
            res.locals.user = null;
            next();
        }
    } else {
        res.locals.user = null; // Nenhum usuário logado
        next();
    }
}; 