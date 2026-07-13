const Usuario = require("model\entity\Usuario.js")

class Funcionario extends Usuario{
    constructor(id, nome, login, senha, salario){
        super(id, nome, login, senha);
        this.salario = salario;
    }
}

module.exports = Funcionario;