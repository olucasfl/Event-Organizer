const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.render('register', {
                error: 'Senhas não coincidem.',
                formData: { username, email },
            });
        }

        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            const error = userExists.email === email ? 'Email já cadastrado' : 'Nome de usuário já existe';
            return res.render('register', {error, formData: { username, email } });
        };

        const user = new User({ username, email, password });
        await user.save();
        res.redirect('/login');

    }catch (error) {
        res.render('register', { 
          error: 'Erro no cadastro',
          formData: req.body
        });
    }
}

exports.login = async (req, res) => {
    try {
      const { login, password } = req.body;
  
      const user = await User.findOne({
        $or: [
          { email: login },
          { username: login }
        ]
      });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render('login', { 
          error: 'Credenciais inválidas',
          loginValue: login // Mantém o valor digitado
        });
      }
  
      req.session.userId = user._id;
      res.redirect('/');
  
    } catch (error) {
      res.render('login', { 
        error: 'Erro no login',
        loginValue: req.body.login
      });
    }
  };