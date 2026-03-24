const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let filmes = [
    { id: 1, nome: "Marty Supreme", diretor: "Josh Safdie" },
    { id: 2, nome: "Hamnet", diretor: "Chloé Zhao" },
    { id: 3, nome: "Better Man", diretor: "Michael Gracey" },
    { id: 4, nome: "Piece By Piece", diretor: "Morgan Neville" }
];

app.get('/', (req, res) => {
    res.json({
        mensagem: '🎉 Minha primeira API funcionando!',
        status: 'sucesso',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/filmes', (req, res) => {
    const { diretor } = req.query;

    let resultado = filmes;

    if (diretor) {
        resultado = filmes.filter(f => f.diretor === diretor);
    }

    res.json(resultado);
});

app.get('/api/filmes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const filme = filmes.find(f => f.id === id);

    if (!filme) {
        return res.status(404).json({
            erro: "Filme não encontrado"
        });
    }

    res.json(filme);
});

app.post('/api/filmes', (req, res) => {
    const { nome, diretor } = req.body;

    if (!nome) {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    if (!diretor) {
        return res.status(400).json({
            erro: "Diretor é obrigatório"
        });
    }

    if (nome.length < 2) {
        return res.status(400).json({
            erro: "Nome deve ter pelo menos 2 caracteres"
        });
    }

    if (diretor.length < 3) {
        return res.status(400).json({
            erro: "Diretor deve ter pelo menos 3 caracteres"
        });
    }

    const novoFilme = {
        id: filmes.length + 1,
        nome,
        diretor
    };

    filmes.push(novoFilme);

    res.status(201).json({
        mensagem: "Filme criado com sucesso",
        filme: novoFilme
    });
});

app.get('/info', (req, res) => {
    res.json({
        nome: 'Minha API REST',
        versao: '1.0.0',
        autor: 'Gabriel'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});