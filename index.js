// Variáveis escopo global para ser salvos os valores do input

//Criando as variáveis no escopo global para poder salvar os valores que estou pegando no input (value - nas funções abaixo)
let emailLogin;
let senhaLogin;

let nome;
let emailCriarConta;
let senhaCriarConta;

//Funções atreladas ao evento "onchange", de passsar os valores do value e pegar, salvar na variável global acima. 
function saveValuesEmailLogin(value) {
    emailLogin = value;
}

function saveValuesSenhaLogin(value) {
    senhaLogin = value;
}

function saveValuesNome(value) {
    nome = value;
}

function saveValuesEmailCriarConta(value) {
    emailCriarConta = value;
}

function saveValuesSenhaCriarConta(value) {
    senhaCriarConta = value;
}

// Usuario Novo -> Primeiro criamos a conta do usuário. 

function cadastrarUsuarioNovo() {

    let verificarConta = localStorage.getItem(emailCriarConta)

    if (verificarConta !== null) {
        alert('O e-mail já está sendo utilizado')
        return
    }

    if (emailCriarConta === undefined || senhaCriarConta === undefined || nome === undefined) {
        alert('Preencha todos os campos')
        return
    }

    const contaUsuarioNovo = {
        nome: nome,
        email: emailCriarConta,
        senha: senhaCriarConta,
        tarefas: []
    }

    //Converto meu objeto para JSON pra virar uma string de info.

    let usuarioNovo = JSON.stringify(contaUsuarioNovo)


    //Estou colocando esse meu objeto em um "banco" local do navegador. Para isso, crio o nome da "key" com próprio email preenchido ao criar a conta. Dessa forma, poderemos ter múltiplos clientes.

    //emailCriarConta é uma string. o mais importante é o valor após.

    localStorage.setItem(emailCriarConta, usuarioNovo)
    localStorage.setItem("User Logged", emailCriarConta)

    window.location.href = "./gerenciador.html"

}

//

function login() { // Aqui eu vou ver se o emailLogin me traz a key certa. se sim, essa key (email) terá meu obj dentro.
    let novaConta = localStorage.getItem(emailLogin)

    if (novaConta === null) {
        alert('A conta não existe')
        return
    }

    let dadosConta = JSON.parse(novaConta)

    if ((senhaLogin === dadosConta.senha) && (emailLogin === dadosConta.email)) {
        localStorage.setItem("User Logged", emailLogin)
        window.location.href = "./gerenciador.html"
    } else {
        alert('Usuário ou senha incorretos')
    }

}




