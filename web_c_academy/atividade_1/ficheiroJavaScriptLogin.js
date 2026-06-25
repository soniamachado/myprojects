// Vai buscar o array de utilizadores guardado no localStorage (o mesmo do registo).
// Se ainda não existir nenhum, devolve um array vazio.
function getUtilizadores() {
  let dados = localStorage.getItem("utilizadores");

  if (dados === null) {
    return [];
  }

  return JSON.parse(dados);
}

document.addEventListener("DOMContentLoaded", () => {
  // Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let login = document.getElementById("login"); // vai buscar o formulário com o id "login"

  login.addEventListener("submit", (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault();

    // 1. Ir buscar o que o utilizador escreveu
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // 2. Ir buscar todos os utilizadores registados
    let utilizadores = getUtilizadores();

    // 3. Procurar um utilizador com o mesmo username e password
    let utilizador = utilizadores.find(
      (u) => u.username === username && u.password === password
    );

    // 4. Verificar se encontrou
    if (utilizador === undefined) {
      alert("Utilizador ou palavra-passe incorretos!");
      return;
    }

    console.log("Login com sucesso:", utilizador);
    alert("Bem-vindo, " + utilizador.name + "!");

    // (opcional) mostrar os dados do utilizador na página
    // ex: document.querySelector(".dadosUtilizador").innerHTML = ...
  });
});
