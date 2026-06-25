// Vai buscar toda a informação que o utilizador escreveu no formulário
// e devolve um objeto "utilizador" com todos os campos
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

  return utilizador;
}

// Vai buscar o array de utilizadores que está guardado no localStorage.
// Se ainda não existir nenhum, devolve um array vazio.
function getUtilizadores() {
  let dados = localStorage.getItem("utilizadores");

  if (dados === null) {
    return [];
  }

  // O localStorage só guarda texto, por isso temos de "traduzir" de volta para array
  return JSON.parse(dados);
}

// Guarda o array de utilizadores no localStorage
function guardarUtilizadores(utilizadores) {
  // Transformamos o array em texto para o poder guardar
  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));
}

document.addEventListener("DOMContentLoaded", () => {
  // Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let registo = document.getElementById("registo"); // vai buscar o formulário com o id "registo"

  registo.addEventListener("submit", (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault();

    // 1. Ir buscar toda a informação do formulário
    let novoUtilizador = getDadosUtilizador();

    // 2. Ir buscar o array que já existe (ou um array vazio)
    let utilizadores = getUtilizadores();

    // 3. Verificar se o username já existe
    let jaExiste = utilizadores.some(
      (u) => u.username === novoUtilizador.username,
    );

    if (jaExiste) {
      alert("Esse nome de utilizador já está registado!");
      return;
    }

    // 4. Adicionar o novo utilizador ao array
    utilizadores.push(novoUtilizador);

    // 5. Guardar o array atualizado no localStorage
    guardarUtilizadores(utilizadores);

    console.log("Utilizador registado:", novoUtilizador);
    console.log("Todos os utilizadores:", utilizadores);

    alert("Registo efetuado com sucesso!");
    registo.reset(); // limpa o formulário

    // (opcional) ir para a página de login
    // location.href = "formulario.html";
  });
});
