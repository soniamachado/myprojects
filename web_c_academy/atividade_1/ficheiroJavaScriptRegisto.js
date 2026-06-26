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
document.addEventListener("DOMContentLoaded", () => {
  //Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let login = document.getElementById("registo"); // vai buscar o elemento que tem o id como "registo"
  login.addEventListener("submit", async (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault();

    // chama a função e guarda a ficha devolvida numa variável
    let novoUtilizador = getDadosUtilizador();

    // por agora só mostramos no console para confirmar que apanhámos tudo
    console.log(novoUtilizador);
  });
});

//FALTA:
// Capazes de ir buscar toda a informação - seguir o que fizemos até agora
// Guardar num array

//SUGESTÃO DA PROFESSORA:
//Basear-nos no exemplo do carro dos slides
// Criar um array de objetos/utilizadores
// LOCALSTORAGE
