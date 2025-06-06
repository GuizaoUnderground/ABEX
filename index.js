const express = require('express');
const bodyParser = require('body-parser');
const db = require('./banco');

const app = express();
const PORT = 3000;

// Permitir servir arquivos estáticos (seus HTML, CSS, JS no front)
app.use(express.static(__dirname));

// Para interpretar o corpo dos formulários (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));

// Rota para cadastro cliente
app.post('/cadastro-cliente', (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !email || !telefone) {
    return res.status(400).send('Dados incompletos');
  }

  const query = `INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)`;
  db.run(query, [nome, email, telefone], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar cliente');
    }
    res.send('Cadastro de cliente realizado com sucesso!');
  });
});

// Rota para cadastro prestador
app.post('/cadastro-prestador', (req, res) => {
  const { nome, email, servico, descricao, telefone } = req.body;

  if (!nome || !email || !servico || !descricao || !telefone) {
    return res.status(400).send('Dados incompletos');
  }

  const query = `INSERT INTO prestadores (nome, email, servico, descricao, telefone) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [nome, email, servico, descricao, telefone], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao salvar prestador');
    }
    res.send('Cadastro de prestador realizado com sucesso!');
  });
});

// Servidor ouvindo
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
