const usuario = localStorage.getItem("User Logged");

if (usuario === null) {
    window.location.href = "./index.html"
}

const usuarioLogar = localStorage.getItem(usuario);
const usuarioLogado = JSON.parse(usuarioLogar);



// Estou pegando o valor de cada input. 
let nomeTarefa;
let dataInicio;
let dataTermino;
let horaInicio;
let horaTermino;
let descricaoTarefa;

let listaDeTarefas = [];
listaDeTarefas = usuarioLogado.tarefas // estou pegando a conta logada e salvando as tarefas na variavel



// modais inserção 

const caixaPrimeiroModal = document.getElementById('caixa')
const caixaInteriorModal = document.getElementById('caixa_interior')

function mostrarPrimeiroModal(tarefa) {
    caixaPrimeiroModal.classList.remove('d-none')
    caixaPrimeiroModal.classList.add('d-flex');

    caixaInteriorModal.innerHTML = `
          <h1 class="titulo fs-3 fw-semibold">${tarefa.tarefa}</h1>
          <p class="descricao pt-3 overflow-auto h-100">${tarefa.descricao}</p>
          <button type="button" class="btn btn-dark w-50 fs-10" onclick="fecharModal()">Fechar</button>
        </div>

    `
}


// segundo form. insercao. 

const botoes = document.getElementById('botoes')
const btnCriarTarefa = document.getElementById('criarTarefa_button');


function alterarTarefas(tarefa) {

    btnCriarTarefa.style.display = "none";

    document.getElementById('tarefa').value = tarefa.tarefa
    document.getElementById('dataDeInicio').value = tarefa.dataInicio
    document.getElementById('horaDeInicio').value = tarefa.horaInicio
    document.getElementById('dataDeTermino').value = tarefa.dataTermino
    document.getElementById('horaDeTermino').value = tarefa.horaTermino
    document.getElementById('descricaoDaTarefa').value = tarefa.descricao

    botoes.innerHTML = `
<button type="button" class="btn" id="modificar">Alterar tarefa</button>
<button type="button" class="btn" id="excluir">Excluir tarefa</button>
<button type="button" class="btn" id="realizada">Marcar como realizada</button>
<button type="button" class="btn" id="cancelar">Cancelar</button>

`

    document.getElementById('cancelar').addEventListener("click", () => cancelar())
    document.getElementById('excluir').addEventListener("click", () => excluirTarefas(tarefa))
    document.getElementById('realizada').addEventListener("click", () => marcarTarefaRealizada(tarefa))
    document.getElementById('modificar').addEventListener("click", () => alterarTarefasSalvas(tarefa))

    function marcarTarefaRealizada(tarefaParaAlterar) {
        tarefaParaAlterar.estaCompleta = !tarefaParaAlterar.estaCompleta

        const index = usuarioLogado.tarefas.findIndex((tarefa) => tarefa.id === tarefaParaAlterar.id)

        usuarioLogado.tarefas[index] = tarefaParaAlterar

        localStorage.setItem(usuarioLogado.email, JSON.stringify(usuarioLogado))

        listaDeTarefas = usuarioLogado.tarefas

        if (tarefaParaAlterar.estaCompleta) {
            document.getElementById('realizada').innerHTML = "Marcar como não realizada"
        } else {
            document.getElementById('realizada').innerHTML = "Marcar como realizada"
        }

        mostrarTarefasNaTabela();
    }

    function alterarTarefasSalvas(tarefaParaAlterar) {

        let nomeTarefa = document.getElementById('tarefa').value
        let dataInicio = document.getElementById('dataDeInicio').value
        let dataTermino = document.getElementById('dataDeTermino').value
        let horaInicio = document.getElementById('horaDeInicio').value
        let horaTermino = document.getElementById('horaDeTermino').value
        let descricaoTarefa = document.getElementById('descricaoDaTarefa').value

        const novaTarefa = {
            id: tarefaParaAlterar.id,
            tarefa: nomeTarefa,
            dataInicio: dataInicio,
            dataTermino: dataTermino,
            horaInicio: horaInicio,
            horaTermino: horaTermino,
            descricao: descricaoTarefa,
            estaCompleta: tarefaParaAlterar.estaCompleta
        }

        const index = usuarioLogado.tarefas.findIndex((tarefa) => tarefa.id === tarefaParaAlterar.id)

        usuarioLogado.tarefas[index] = novaTarefa

        localStorage.setItem(usuarioLogado.email, JSON.stringify(usuarioLogado))

        listaDeTarefas = usuarioLogado.tarefas

        mostrarTarefasNaTabela();

    }

    function excluirTarefas(tarefaParaAlterar) {

        const index = usuarioLogado.tarefas.findIndex((tarefa) => tarefa.id === tarefaParaAlterar.id)

        usuarioLogado.tarefas.splice(index, 1)

        localStorage.setItem(usuarioLogado.email, JSON.stringify(usuarioLogado))

        listaDeTarefas = usuarioLogado.tarefas


        mostrarTarefasNaTabela();

        cancelar()
    }





}


function cancelar() {
    document.getElementById('tarefa').value = ""
    document.getElementById('dataDeInicio').value = ""
    document.getElementById('horaDeInicio').value = ""
    document.getElementById('dataDeTermino').value = ""
    document.getElementById('horaDeTermino').value = ""
    document.getElementById('descricaoDaTarefa').value = ""

    botoes.innerHTML = `
<input type="submit" value="Criar tarefa" class="btn mt-3" id="criarTarefa_button" onclick="saveTarefa(this)">
 `

}



function fecharModal() {
    caixaPrimeiroModal.classList.remove('d-flex')
    caixaPrimeiroModal.classList.add('d-none');
}



function inserirDados() {

    let textoNavbar = document.getElementById('navbar_text')

    textoNavbar.innerHTML = `
    <p>Olá, ${usuarioLogado.nome}!</p>
    `

}

inserirDados()


//Aqui eu peguei apenas a key USerLogged.

function sairGerenciador() {
    localStorage.removeItem("User Logged")
    window.location.href = "./index.html"
}

// Aqui eu estou formatando as minhas datas.

const formatter = Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    dateStyle: 'short'
});





//Estou pegando  o status de cada tarefa. Vou usar isso no meu forEach.

function getStatus(tarefa) {
    const dataAtual = new Date();
    const dataComeco = new Date(`${tarefa.dataInicio}T${tarefa.horaInicio}`);
    const dataFim = new Date(`${tarefa.dataTermino}T${tarefa.horaTermino}`);




    //pendente - tarefa ainda n foi feita 

    if (tarefa.estaCompleta === true) {
        return "Realizada"
    }

    if (dataAtual > dataFim) {
        return "Em atraso";
    }

    if (dataComeco > dataAtual) {
        return "Pendente";
    }

    //Em andamento - inicio menor que dataAtual e dataAtual menor que dataFim
    if (dataComeco <= dataAtual && dataAtual < dataFim) {
        return "Em andamento";

        //atraso - se diaAtual for maior que dataFim

    }

}

//Eu estou mudando as cores dos meus status a cada vez que colocam as tarefas e suas datas. Irei usar essa função na parte de status. 
//passo o status dela e ela me retorna a classe (com a cor) do meu Status. Coloquei as cores do bootstraps pra serem retornadas (as classes dele, que já vem a cor embutida)

function statusCores(status) {

    if (status === "Em atraso") {
        return "text-danger"
    }

    if (status === "Pendente") {
        return "text-warning"
    }

    if (status === "Em andamento") {
        return "text-primary"
    }

    if (status === "Realizada") {
        return "text-success"
    }

}

function mostrarTarefasNaTabela() {

    let tabela = document.getElementById('container_tabela') //pegando o elemento tabela pra poder adicionar as próximas linhas dentro do looping.

    tabela.innerHTML = ""; // O html precia estar vazio no final de cada looping. 

    listaDeTarefas.forEach((tarefa) => { // Para cada tarefa, faça o que está se pedindo.

        let status = getStatus(tarefa)

        const dataInicioSemFormatar = new Date(tarefa.dataInicio)
        const dataFimSemFormatar = new Date(tarefa.dataTermino)

        const newDataInicio = formatter.format(dataInicioSemFormatar)
        const newDataFim = formatter.format(dataFimSemFormatar)

        let tr = document.createElement("tr")

        tr.innerHTML = `

    <th scope="row" class="titulo-tarefa" id="tarefa${tarefa.id}">${tarefa.tarefa}</th>

                <td>${newDataInicio} às ${tarefa.horaInicio}</td>
                <td>${newDataFim} às ${tarefa.horaTermino}</td>
                <td class="${statusCores(status)}"> ${status}</td>
                <td><button type="button" class="btn-alterar" id="alterar${tarefa.id}">Alterar</button></td>
              </tr>
    
    
    `;
        //Dentro do meu html tive que passar algumas variáveis. Lembrar que é uma abstração. Passei a class statusCores(status), pois depois que pegar o status pelo getstatus, irá aplicar
        //a função de mudar a cor. 

        tabela.appendChild(tr);

        const tituloTarefa = document.getElementById(`tarefa${tarefa.id}`)
        tituloTarefa.addEventListener("click", () => mostrarPrimeiroModal(tarefa))

        const alterar = document.getElementById(`alterar${tarefa.id}`)
        alterar.addEventListener("click", () => alterarTarefas(tarefa))

    })

}

function saveTarefa() {

    let nomeTarefa = document.getElementById('tarefa').value
    let dataInicio = document.getElementById('dataDeInicio').value
    let dataTermino = document.getElementById('dataDeTermino').value
    let horaInicio = document.getElementById('horaDeInicio').value
    let horaTermino = document.getElementById('horaDeTermino').value
    let descricaoTarefa = document.getElementById('descricaoDaTarefa').value

    if (nomeTarefa === "" || dataInicio === "" || dataTermino === "" || horaInicio === "" || horaTermino === "" || descricaoTarefa === "") {
        alert('Preencha todos os campos')
        return
    }

    const novaTarefa = {
        id: listaDeTarefas.length > 0 ? listaDeTarefas[listaDeTarefas.length - 1].id + 1 : 1,
        tarefa: nomeTarefa,
        dataInicio: dataInicio,
        dataTermino: dataTermino,
        horaInicio: horaInicio,
        horaTermino: horaTermino,
        descricao: descricaoTarefa,
        estaCompleta: false
    }

    listaDeTarefas.push(novaTarefa); // Estou colocando cada tarefa no meu array listadeTarefas.

    usuarioLogado.tarefas = listaDeTarefas
    localStorage.setItem(usuario, JSON.stringify(usuarioLogado))

    mostrarTarefasNaTabela();

    cancelar()

}



window.onload = function () {
    mostrarTarefasNaTabela();
}






