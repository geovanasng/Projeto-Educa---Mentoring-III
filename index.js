const formulário = document.querySelector("form");
formulário.addEventListener("submit", minhaSubmissão);

function minhaSubmissão(evento){
    evento.preventDefault();
    console.log("Nome submetido!");

    let name = document.querySelector("#name").value;
    console.log(name);

}