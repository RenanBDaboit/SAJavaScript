const FuncionarioService = require("../model/service/FuncionarioService");

const service = new FuncionarioService();

class FuncionarioController{

    async listar(req, res){

        try {
            const funcionarios = await service.listar();

            res.status(200).json(funcionarios);
        } catch (erro) {
            
            res.status(500).json({
                mensagem: erro.message
            });
        }
    }

    async cadastrar(req, res){

        try {
            const resultado = await service.cadastrar(req.body);

            res.status(201).json(resultado);
        } catch (erro) {

            res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    async atualizar(req, res){

        try {
            const funcionario = {
                id: Number(req.params.id),
                ...req.body
            };

            const resultado = await service.atualizar(funcionario);

            res.status(200).json(resultado);

        } catch (erro) {
            
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }

    async excluir(req, res){

        try {
            await service.excluir(req.params.id);

            res.status(204).send();
        } catch (erro) {
            
            res.status(400).json({
                mensagem: erro.message
            });
        }
    }
}

module.exports = FuncionarioController;