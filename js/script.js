//inicio da classe skill
class Skill {
    constructor(nomeDaSkill, nivel, id) {
        this.nomeDaSkill = nomeDaSkill;
        this.nivel = nivel;
        this.id = id;
    }
    validaSkill() {
        console.log("metodo de validacao precisa ser implementado")
        return true;
    }
    getNomeDaSkill() {
        return this.nomeDaSkill;
    }
    setNomeDaSkill(nomeDaSkill) {
        this.nomeDaSkill = nomeDaSkill;
    }
    getNivel() {
        return this.nivel
    }
    setNivel(nivel) {
        this.nivel = nivel
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}//fim da classe skill

//inicio classe Bd
class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }
    remove(id) {
        localStorage.removeItem(id);
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1
    }
    gravar(objeto) {

        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(objeto))
        localStorage.setItem('id', id);
    }

    recureparTodosRegistros() {
        let id = localStorage.getItem("id");
        var skills = [];


        //
        for (var i = 1; i <= parseInt(id); i++) {

            let obj = JSON.parse(localStorage.getItem(i));
            if (obj == null) {
                continue
            }
            obj.id = i
            skills.push(obj);

        }
        return skills;

    }
}//fim da classe Bd


var bd = new Bd()

mostraDados()

//inicio da mostra Objetos
function mostraDados() {

    let objs = bd.recureparTodosRegistros();

    for (obj in objs) {

        criarCardNaTela(objs[obj])
    }

} //fim da mostra objetos  

var bntCriaCard = document.getElementById("criarCard")


bntCriaCard.addEventListener("click", () => {
    //criando nova skill
    let skill = document.getElementById("skill")
    let nivel = document.getElementById("nivel")
    let valida = validaDados(skill.value,nivel.value)

    if(valida){
        let objSkill = new Skill(skill.value,nivel.value,bd.getProximoId())
        bd.gravar(objSkill)
        
        //melhorar reloader
        window.location.reload()
        alerts(valida);

    }else{
        console.log("dados inválidos")
        alerts(valida);
    }
    

});

function alerts(bool){
    if(bool == true){

    }else{

    }
}

function validaDados(skill,nivel){
    if(skill === '' || nivel === '' ||skill === null || nivel === null || typeof(nivel) < 0 || typeof(nivel) > 100){
        return false;
    }else{
        return true
    }

   
}
//funcao de criacao do card
function card(titulo, nivel,id) {

    let coluna = document.createElement('div');
    coluna.className = "col-md-6 col-lg-3 mt-4 col-sm-8  ";
    let card = document.createElement("div");
    card.className = "card"
    let cardHeader = document.createElement("div")
    cardHeader.className = "card-header d-flex  justify-content-between"
    let h5 = document.createElement("h5");
    h5.className = "ms-3"
    let botoesTitulo = document.createElement("div");

    let btnPadlock = document.createElement("button")
    btnPadlock.className = "btn btn-outline-secondary btn-sm "
    btnPadlock.onclick = function(){
    }
    let iconCadeado = document.createElement("i")
    iconCadeado.className = "fa-solid fa-lock text-success"
    let iconDelete = document.createElement("i")
    iconDelete.className = "fa-solid fa-trash text-danger"
    let button3 = document.createElement("button")
    button3.className = "btn btn-outline-secondary btn-sm ms-2"
    
    button3.onclick = function(){
    bd.remove(id);
    window.location.reload()
    }
    let cardBody = document.createElement("div")
    cardBody.classList = "card-body";
    let progress = document.createElement("div")
    progress.className = "progress"
    let progressBar = document.createElement("div")
    progressBar.innerHTML = nivel + "%"
    progressBar.className = "progress-bar progress-bar-striped"
    progressBar.role = "progressbar"
    progressBar.style.width = nivel + "%"
    progressBar.ariaValueMin = "0"
    progressBar.ariaValueNow = "0"
    progressBar.ariaValueMax = "100"

    h5.innerHTML = titulo
    cardHeader.appendChild(h5);
    btnPadlock.appendChild(iconCadeado)
    button3.appendChild(iconDelete)
    botoesTitulo.appendChild(btnPadlock);
    botoesTitulo.appendChild(button3);
    cardHeader.appendChild(botoesTitulo)
    card.appendChild(cardHeader)
    card.appendChild(cardBody)
    progress.appendChild(progressBar)
    cardBody.appendChild(progress)
    coluna.appendChild(card)



    return coluna;
}//fim da funcao de criacao do card

//inicio funcao de criacao da row
function CriaRow() {
    let row = document.createElement("div")
    row.className = "row d-flex justify-content-sm-center justify-content-md-start";
    return row;
}//fim da funcao de criacao da row


//inicio da funcao de criarCardNaTela
function criarCardNaTela(objeto) {
   

    let carde = card(objeto.nomeDaSkill, objeto.nivel,objeto.id);

    let rows = document.querySelectorAll(".row")
    let container = document.getElementById("secaoRows")
    let qntDeLinhas = rows.length;


    let linha = CriaRow()

    if (qntDeLinhas === 0) {

        linha.appendChild(carde)
        container.appendChild(linha);
        qntDeLinhas += 1;

    } else {
        let i = 0;
        for (row of rows) {
            i += 1;
            let column = row.querySelectorAll(".card")

            qntDeColunas = (column.length + 1)

            if (qntDeColunas < 5) {
                row.appendChild(carde)
            } else if (qntDeLinhas == i) {
                linha.appendChild(carde)
                container.appendChild(linha);
                //    qntDeLinhas +=1;

            } else {
                continue;
            }
        }

    }
}//inicio da funcao de criarCardNaTela
