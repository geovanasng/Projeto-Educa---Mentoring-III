const nome = JSON.parse(localStorage.getItem("nomeUsuario")); //OR ""
document.getElementById("saudacao").innerText = `Olá ${nome}!`;
document.getElementById("saudacao").style.display = 'block';