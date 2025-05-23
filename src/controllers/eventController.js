exports.paginaInicial = (req, res) => {
    res.render('index', {titulo: 'Título da página!'
    })
}

exports.trataPost = (req, res) => {
    res.send('NOVA ROTA POST.');
}