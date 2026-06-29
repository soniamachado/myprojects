// Vai buscar o array de utilizadores guardado no localStorage (o mesmo do registo).
// Se ainda não existir nenhum, devolve um array vazio.
function getUtilizadores() {
  let dados = localStorage.getItem("utilizadores");
  if (dados === null) {
    return [];
  }
  return JSON.parse(dados);
}
//a mesma função getUtilizadores() do ficheiro ficheiroJavaScriptRegisto.js, mas aqui é usada para o login. a chave "utilizadores" é a mesma, porque é o mesmo localStorage que guarda os dados. O localStorage é como uma gaveta: tu guardas lá dentro um texto (uma string) com a etiqueta "utilizadores". E depois, quando queres ler, pedes ao localStorage o que está guardado debaixo da etiqueta "utilizadores". O localStorage não tem gavetas individuais para cada utilizador, só tem uma gaveta para a lista inteira.

// Preenche o perfil com os dados do utilizador,
// esconde o formulário e mostra a secção do perfil.
function mostrarPerfil(utilizador) {
  // preencher cada espaço (span) com o respetivo dado
  document.getElementById("perfil-ola").innerText =
    "Olá, " + utilizador.name + "!";
  document.getElementById("perfil-nome").innerText = "Nome: " + utilizador.name;
  document.getElementById("perfil-email").innerText =
    "Email: " + utilizador.email;
  document.getElementById("perfil-telemovel").innerText =
    "Telemóvel: " + utilizador.telemovel;
  document.getElementById("perfil-username").innerText =
    "Username: " + utilizador.username;
  document.getElementById("perfil-nif").innerText = "NIF: " + utilizador.nif;
  document.getElementById("perfil-morada").innerText =
    "Morada: " + utilizador.morada;

  // esconder o formulário e mostrar o perfil
  document.getElementById("vista-formulario").style.display = "none";
  document.getElementById("vista-perfil").style.display = "block";
}
// O .style.display é o JavaScript a mexer no CSS de cada secção, ao vivo:

// "none" → esconde
// "block" → mostra
// Então: o formulário (que estava visível) passa a none, e o perfil (que estava none) passa a block. Resultado: o formulário desaparece e o perfil aparece no lugar dele. 🎉

document.addEventListener("DOMContentLoaded", () => {
  // Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let login = document.getElementById("login"); // vai buscar o formulário com o id "login"

  login.addEventListener("submit", (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault();

    // 1. Ir buscar o que o utilizador escreveu
    let username = document.getElementById("username").value;
    //document.getElementById("username") → encontra a caixa de texto com id="username".let username = ... → guarda esse valor na variável username
    //.value → lê o que está lá escrito nesse momento (o que o utilizador digitou).O .value aqui está do lado direito do =, por isso está a ler (a tirar o valor de dentro da caixa).
    let password = document.getElementById("password").value;

    // 1.5. Verificar se é a conta de ADMIN (fixa no código).
    //      Se for, salta logo para a página de administração e pára aqui.
    if (username === "admin" && password === "admin") {
      window.location.href = "admin.html";
      return;
    }

    // 2. Ir buscar todos os utilizadores registados
    let utilizadores = getUtilizadores();

    // 3. Procurar um utilizador com o mesmo username e password
    //    Versão curta com .find() (deixada em comentário):
    // let utilizador = utilizadores.find(
    //   (u) => u.username === username && u.password === password
    // );

    //    Versão com ciclo "for": percorremos a lista um a um
    let utilizador = undefined; // começamos sem ter encontrado ninguém

    for (let i = 0; i < utilizadores.length; i++) {
      // utilizadores[i] é o utilizador na posição i
      if (
        utilizadores[i].username === username &&
        utilizadores[i].password === password
      ) {
        utilizador = utilizadores[i]; // encontrámos! guardamos este utilizador
      }
    }

    // 4. Verificar se encontrou
    if (utilizador === undefined) {
      alert("Utilizador ou palavra-passe incorretos!");
      return;
    }

    console.log("Login com sucesso:", utilizador);

    // mostrar a página de perfil com os dados deste utilizador
    mostrarPerfil(utilizador);
  });
});

//A grande diferença: LER vs ESCREVER
// Repara nestes dois usos opostos no teu código:

// LER (buscar o que está na caixa) — .value à direita do =:

// let username = document.getElementById("username").value;
// //   recebe   ◄────────────────────────────────── lê daqui
// ESCREVER (pôr texto no ecrã) — à esquerda do =:

// document.getElementById("perfil-nome").innerText = "Nome: " + utilizador.name;
// //  escreve aqui ──────────────────────────────► o valor da direita
// Onde está	O que faz
// .value (à direita do =)	login	lê o que o utilizador escreveu
// .innerText (à esquerda do =)	perfil	mostra texto no ecrã
