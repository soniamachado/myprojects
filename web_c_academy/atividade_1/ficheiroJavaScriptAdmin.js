// Vai buscar a lista de utilizadores guardada no localStorage (a mesma do registo/login).
// Se ainda não existir nenhuma, devolve uma lista vazia [].
function getUtilizadores() {
  let dados = localStorage.getItem("utilizadores");
  if (dados === null) {
    return [];
  }
  return JSON.parse(dados);
}

// Guarda a lista de utilizadores no localStorage.
function guardarUtilizadores(lista) {
  localStorage.setItem("utilizadores", JSON.stringify(lista));
}

// Desenha a tabela: cria uma linha (<tr>) por cada utilizador.
function mostrarUtilizadores() {
  let utilizadores = getUtilizadores();

  // o <tbody> onde vamos escrever as linhas
  let corpoTabela = document.getElementById("lista-utilizadores");

  // limpar o que estava lá, para não duplicar quando voltamos a desenhar
  corpoTabela.innerHTML = "";

  // percorrer a lista um a um e criar uma linha para cada
  for (let i = 0; i < utilizadores.length; i++) {
    let u = utilizadores[i]; // o utilizador da vez

    corpoTabela.innerHTML +=
      "<tr>" +
      "<td>" +
      u.username +
      "</td>" +
      "<td>" +
      u.name +
      "</td>" +
      "<td>" +
      u.email +
      "</td>" +
      "<td>" +
      u.nif +
      "</td>" +
      "<td><button onclick=\"apagarUtilizador('" +
      u.username +
      "')\">Apagar</button></td>" +
      "</tr>";
  }
}

// Apaga o utilizador com este username e volta a desenhar a tabela.
function apagarUtilizador(username) {
  let utilizadores = getUtilizadores();

  // criar uma lista nova só com os que NÃO têm este username
  let novaLista = [];
  for (let i = 0; i < utilizadores.length; i++) {
    if (utilizadores[i].username !== username) {
      novaLista.push(utilizadores[i]); // este fica
    }
  }

  // guardar a lista já sem o utilizador apagado
  guardarUtilizadores(novaLista);

  // redesenhar a tabela para refletir a mudança
  mostrarUtilizadores();
}

// Quando a página acaba de carregar, preenchemos logo a tabela.
document.addEventListener("DOMContentLoaded", () => {
  mostrarUtilizadores();
});

// Boa pergunta — o innerHTML é o conteúdo HTML que está dentro de um elemento. Deixa-me separar a frase em duas partes:

// corpoTabela.innerHTML
// //   │           └── o HTML que está DENTRO desse elemento
// //   └── o elemento <tbody id="lista-utilizadores"> (que apanhámos com getElementById)
// O que é o .innerHTML?
// corpoTabela é o teu <tbody>. O .innerHTML é tudo o que está escrito lá dentro, em forma de HTML. E serve para duas coisas:

// Ler: ver o HTML que está dentro.
// Escrever: substituir o conteúdo de dentro por novo HTML.
// A diferença importante: o innerHTML interpreta as tags como HTML a sério. Se lá puseres "<tr><td>ana</td></tr>", o browser cria mesmo uma linha de tabela — não mostra o texto <tr>.

// = vs += (a parte do teu código)

// corpoTabela.innerHTML = "";       // SUBSTITUI tudo → fica vazio (limpa a tabela)
// corpoTabela.innerHTML += "<tr>..."; // ACRESCENTA ao que já lá está (cola no fim)
// = → troca o conteúdo todo.
// += → junta ao conteúdo que já existe (é o + de "somar texto", que já usaste no perfil).

// //2) Ter mais do que um admin
// Usas o || (que significa OU):

//explicação da conta admin no login: no ficheiro ficheiroJavaScriptLogin.js, tens isto:
// if (
//   (username === "admin" && password === "admin") ||
//   (username === "sonia" && password === "1234")
// ) {
//   window.location.href = "admin.html";
//   return;
// }
// Isto lê-se: "se for o admin1 OU o admin2 → vai para a página de admin".

// Relembra: && = E (as duas condições verdadeiras); || = OU (basta uma).

// Uma nota importante (segurança)
// Pôr a password no código tem um problema: qualquer pessoa que abra o ficheiro .js vê a password. Para um trabalho escolar não há problema, mas numa app a sério isto nunca se faz — a verificação seria feita num servidor, longe dos olhos do utilizador.

// Queres que eu acrescente um admin com o username/password que quiseres, ou preferes mudar o admin/admin atual para outro? Diz-me os dados que queres usar.
