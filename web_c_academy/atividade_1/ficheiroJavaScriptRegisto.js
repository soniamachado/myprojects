// Vai buscar TODOS os campos do formulário e junta-os num objeto (uma "ficha" de utilizador)
function getDadosUtilizador() {
  let utilizador = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    telemovel: document.getElementById("telemovel").value,
    nif: document.getElementById("nif").value,
    morada: document.getElementById("morada").value,
  };
  // "return" = a função devolve este objeto para quem a chamou
  return utilizador;
}
//Primeiro crio duas funções pequenas: uma para ler a lista que já existe, outra para guardar a lista atualizada.
// Vai buscar a lista de utilizadores guardada no localStorage.
// Se ainda não existir nenhuma, devolve uma lista vazia [].
function getUtilizadores() {
  let dados = localStorage.getItem("utilizadores"); // isto vem como texto (ou null)
  if (dados === null) {
    return []; // primeira vez: ainda não há nada guardado
  } //ir à gaveta. Pede ao localStorage o que está guardado debaixo da etiqueta "utilizadores" e guarda isso na variável dados. Aqui há duas situações possíveis:
  //Se já registaste alguém → dados recebe um texto, tipo '[{"username":"ana",...}]'
  //Se nunca registaste ninguém → a etiqueta não existe → dados recebe null (que significa "nada", "vazio")
  //Lembra-te: o localStorage só guarda texto, nunca listas. Por isso o que vem é uma string (ou null).
  // transforma o texto de volta num array de objetos; Se chegámos aqui, é porque dados não era null — tem texto a sério. Mas texto não serve para trabalhar (não dá para percorrer com um for). O JSON.parse(...) é o tradutor que transforma o texto de volta numa lista de objetos verdadeira. E essa lista é devolvida com return.
  return JSON.parse(dados);
}

// Guarda a lista de utilizadores no localStorage.
function guardarUtilizadores(lista) {
  // transforma o array em texto, porque o localStorage só guarda texto
  localStorage.setItem("utilizadores", JSON.stringify(lista));
}

document.addEventListener("DOMContentLoaded", () => {
  //Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let login = document.getElementById("registo"); // vai buscar o elemento que tem o id como "registo"
  login.addEventListener("submit", async (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault(); //explicação:Cada acontecimento tem um comportamento por defeito que o browser faz automaticamente. No caso do submit, o comportamento normal do browser é recarregar a página (historicamente, era para enviar os dados a um servidor e abrir uma página nova).

    // 1. apanhar a ficha que o utilizador preencheu
    let novoUtilizador = getDadosUtilizador();

    // 2. ir buscar a lista que já existe (ou [] se for a primeira vez)
    let utilizadores = getUtilizadores();

    // 3. verificar se já existe alguém com este username
    //    Percorremos a lista um a um com um ciclo "for".
    let jaExiste = false; // começamos a assumir que NÃO existe

    for (let i = 0; i < utilizadores.length; i++) {
      // utilizadores[i] é o utilizador na posição i
      if (utilizadores[i].username === novoUtilizador.username) {
        jaExiste = true; // encontrámos um igual!
      }
    }
    //u é o utilizador utilizadores[i] que está a ser testado, e verificamos se o username dele é igual ao do novo utilizador
    //No fundo, tu deixas de escrever como percorrer a lista (o for) e passas a escrever só o que verificar em cada elemento. O .some/.find/.filter t
    // let jaExiste = utilizadores.some((u) => u.username === novoUtilizador.username);
    //Zero ou dois parâmetros: os parênteses são obrigatórios:
    //javascript() => "nada entra"
    //(a, b) => a + b

    if (jaExiste) {
      alert("Esse nome de utilizador já está registado!");
      return; // pára aqui: não adiciona nem guarda
    }

    // 4. juntar o novo utilizador ao fim da lista n array da memória
    utilizadores.push(novoUtilizador); //escreve a lista toda
    //lá dentro: localStorage.setItem("utilizadores", JSON.stringify(utilizadores)); //escreve a lista toda no localStorage

    // 5. voltar a guardar a lista atualizada no localStorage (a gaveta) guardas a lista inteira de uma vez, não é um a um. O localStorage não tem "gavetas" individuais para cada utilizador, só tem uma gaveta para a lista inteira.
    guardarUtilizadores(utilizadores);

    // confirmar no console
    console.log("Novo utilizador:", novoUtilizador);
    console.log("Lista completa:", utilizadores);

    // 6. dar feedback ao utilizador e limpar o formulário
    alert("Registo efetuado com sucesso!");
    login.reset();
  });
});

//FALTA:
// Capazes de ir buscar toda a informação - seguir o que fizemos até agora
// Guardar num array

//SUGESTÃO DA PROFESSORA:
//Basear-nos no exemplo do carro dos slides
// Criar um array de objetos/utilizadores
// LOCALSTORAGE

// //Agora que tens a lista a sério na memória (com a Ana lá dentro), o push acrescenta o Rui ao lado dela:

// [ana]  →  push(rui)  →  [ana, rui]
// O ciclo completo (a "viagem" do dado)

// 1. LER       getUtilizadores()      "[ana]"  ──parse──►  [ana]      (texto → array)
// 2. JUNTAR    push(rui)              [ana]    ──────────► [ana, rui] (mexe na memória)
// 3. GUARDAR   guardarUtilizadores()  [ana,rui] ─stringify─► "[ana,rui]" (array → texto → gaveta)
// Repara na simetria:

// Para ler: texto → array, com JSON.parse (na função getUtilizadores).
// Para guardar: array → texto, com JSON.stringify (na função guardarUtilizadores).
// A gaveta fala sempre texto; a memória trabalha sempre com array. As duas funções são os tradutores nas duas pontas.

// Respondendo diretinho à tua pergunta
// "se já tem a Ana, porque chama a lista, transforma em array e depois faz push?"

// Chama a lista → para trazer a Ana e não a perder.
// Transforma em array → porque só se faz push num array, nunca em texto.
// Faz push → para acrescentar o Rui à lista que já tem a Ana.

//Função  bloco de código reutilizável     sozinha: getUtilizadores()
//Método  uma função que pertence a algo 	 com ponto: utilizadores.push(...)

//Funções (tu criaste, chamas sem ponto):
// getDadosUtilizador()      // função tua
// getUtilizadores()         // função tua
// mostrarPerfil(utilizador) // função tua
// Métodos (já existem, chamas com ponto):

// document.getElementById("username")   // getElementById é método de "document"
// utilizadores.push(novoUtilizador)     // push é método do array
// localStorage.getItem("utilizadores")  // getItem é método de "localStorage"

// Métodos (já existem, chamas com ponto):

// document.getElementById("username")   // getElementById é método de "document"
// utilizadores.push(novoUtilizador)     // push é método do array
// localStorage.getItem("utilizadores")  // getItem é método de "localStorage"
// login.reset()                          // reset é método do formulário
// utilizadores.some(...)                 // some é método do array
// Repara: push, some, find, getItem, getElementById... todos têm ponto antes → são métodos. Pertencem a um array, ao document, ao localStorage, etc. Não os criaste tu — vêm "de fábrica" no JavaScript.

// 2. Onde entra a arrow function
// A arrow function é só uma forma curta de escrever uma função. Estas duas são iguais:

// // arrow function (forma curta)
// (u) => u.username === username

// // função normal (forma longa) — exatamente o mesmo
// function (u) {
//   return u.username === username;}
//
// 3. Como os dois se juntam no .some()

// utilizadores.some( (u) => u.username === username );
// //          └─método─┘  └──── arrow function ────┘
// .some = o método (pertence ao array utilizadores).
// (u) => ... = a arrow function que tu dás ao método, para lhe dizer o que comparar em cada elemento.
// Ou seja: o método .some sabe percorrer a lista, mas não sabe o que procurar. Tu passas-lhe uma função (a arrow) a dizer "a condição é esta: o username é igual?". O .some corre essa arrow uma vez por cada elemento, e o u é "o elemento da vez" — exatamente como escreveste nas tuas notas.
// //Resumindo
// Método = função que pertence a algo e se chama com ponto (.push, .some, .find). É função na mesma, só com "dono".
// Arrow function = forma curta de escrever uma função; usas-a para dar a condição ao método.
// No .some((u) => ...): o método percorre a lista; a arrow function diz o que verificar.
//O importante é a ideia: defines uma caixa (parâmetro) e, ao chamar, entregas-lhe um valor (argumento).
