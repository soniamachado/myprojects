function getUsername() {
  let inputNome = document.getElementById("username").value;
  // let inputNome2 = document.forms.registo.elements.username.value;

  console.log(inputNome);
  // console.log (inputNome2);
}

document.addEventListener("DOMContentLoaded", () => {
  //Só fazemos o que está dentro da função quando o DOMContentLoaded é chamado
  let login = document.getElementById("registo"); // vai buscar o elemento que tem o id como "login"
  login.addEventListener("submit", async (event) => {
    // quando o botão do tipo "submit" é selecionado executa o que está aqui dentro
    event.preventDefault();
    getUsername();
  });
});

//FALTA:
// Capazes de ir buscar toda a informação - seguir o que fizemos até agora
// Guardar num array

//SUGESTÃO DA PROFESSORA:
//Basear-nos no exemplo do carro dos slides
// Criar um array de objetos/utilizadores
// LOCALSTORAGE
