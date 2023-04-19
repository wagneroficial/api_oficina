const express = require('express');
const app = express();
const User = require('./models/User');

app.use(express.json());

app.get("/", async (req, res) => {
    const carros = await User.findAll();
    res.send(carros);
});

app.post("/cadastrar", async (req, res) => {
    console.log(req.body);

    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não cadastrado com sucesso!"
        });
    });

    //res.send("Página cadastrar");
});

app.path("/alterar", async ()=>{
    const carro = await User.findByPk(1);
    carro.status = "aguardando Peças";
    await carro.save();
})

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});