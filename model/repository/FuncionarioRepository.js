const connection = require("../server/db");
const Funcionario = require("../entity/Funcionario");

class FuncionarioRepository {

    async listar() {
        const [rows] = await connection.query("select * from funcionarios")
        
        const funcionarios = rows.map(row => 
            new Funcionario(row.id, row.nome, row.login, row.senha, row.salario)
        );

        return funcionarios;
    }

    async buscarPorId(id){
        const [rows] = await connection.query(
            "select * from funcionarios where id = ?",
            [id]
        );

        if(rows.length === 0){
            return null;
        }

        return new Funcionario(rows[0].id, rows[0].nome, rows[0].login, rows[0].senha, rows[0].salario);
    }

    async buscarPorLogin(login){
        const [rows] = await connection.query(
            "select * from funcionarios where login = ?",
            [login]
        );

        if(rows.length === 0){
            return null;
        }

        return new Funcionario(rows[0].id, rows[0].nome, rows[0].login, rows[0].senha, rows[0].salario);
    }

    async cadastrar(funcionario){

        const [resultado] = await connection.query(
            "insert into funcionarios (nome, login, senha, salario) values (?, ?, ?, ?)", 
            [funcionario.nome, funcionario.login, funcionario.senha, funcionario.salario]
        );
    
        return resultado;
    }

    async atualizar(funcionario) {

        const [resultado] = await connection.query(
            "update funcionarios set nome = ?, login = ?, senha = ?, salario = ?  where id = ?",
            [funcionario.nome, funcionario.login, funcionario.senha, funcionario.salario, funcionario.id]
        );

        return resultado;
    }

    async excluir(id) {
        const [resultado] = await connection.query(
            "delete from funcionarios where id = ?",
            [id]
        );

        return resultado;
    }
}

module.exports = FuncionarioRepository;