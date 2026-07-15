const FuncionarioRepository = require("../model/repository/FuncionarioRepository");

const repository = new FuncionarioRepository();

class FuncionarioService {

    async listar() {
        return repository.listar();
    }

    async cadastrar(novoFuncionario){

        if (!novoFuncionario.nome) {
            throw new Error("Insira um nome para o funcionário");
        }

        if (!novoFuncionario.login) {
            throw new Error("Insira um login para o funcionário");
        }
        
        const listaFuncionarios = await repository.listar();

        const loginExiste = await repository.buscarPorLogin(novoFuncionario.login);

        if (loginExiste) {
            throw new Error("Login inserido já usado")
        }

        if (!novoFuncionario.senha) {
            throw new Error("Insira uma senha para o funcionário");
        }

        if (novoFuncionario.salario == null) {
            throw new Error("Insira o salário do funcionário");
        }

        const resultado = await repository.cadastrar(novoFuncionario);

        if (resultado.affectedRows === 0){
            throw new Error("Erro ao cadastrar funcionário");
        }
        
        return resultado;
    }

    async atualizar(funcionarioAtualizado){
        const listaFuncionarios = await repository.listar();

        const funcionarioAntigo = await repository.buscarPorId(funcionarioAtualizado.id);

        if (!funcionarioAntigo) {
            throw new Error("Id inserido não existente");
        }

        if (!funcionarioAtualizado.nome){
            funcionarioAtualizado.nome = funcionarioAntigo.nome;
        }

        if (!funcionarioAtualizado.login){
            funcionarioAtualizado.login = funcionarioAntigo.login;
        }

        const funcionario = await repository.buscarPorLogin(funcionarioAtualizado.login);

        if (funcionario && funcionario.id !== funcionarioAtualizado.id) {
            throw new Error("Login inserido já usado");
        }

        if (!funcionarioAtualizado.senha){
            funcionarioAtualizado.senha = funcionarioAntigo.senha;
        }

        if (funcionarioAtualizado.salario == null){
            funcionarioAtualizado.salario = funcionarioAntigo.salario;
        }

        const resultado = await repository.atualizar(funcionarioAtualizado);

        if (resultado.affectedRows === 0){
            throw new Error("Erro ao atualizar funcionário");
        }

        return resultado;
    }

    async excluir(id){
        
        const funcionario = await repository.buscarPorId(id);

        if (!funcionario){
            throw new Error("Id inserido não existe");
        }

        const resultado = await repository.excluir(id);

        if (resultado.affectedRows === 0) {
            throw new Error("Erro ao excluir funcionário");
        }

        return resultado;
    }
}

module.exports = FuncionarioService;