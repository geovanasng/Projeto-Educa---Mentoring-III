function salvarPontuacao() {
    console.log('salvei')
    localStorage.setItem('pontuacaoPronomeDificil', pontos);
}

function zeraPontuacao() {
    console.log('zerei')
    localStorage.setItem('pontuacaoPronomeDificil', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoPronomeDificil')) || 0;
}

let pontos = 0;
const perguntasRespondidas = {}; // Controla perguntas já respondidas pelo índice
let perguntaAtual = 0;

const perguntas = [
    { texto: "_____ vou ao cinema", respostaCorreta: "EU", opcoes: ["EU", "NÓS", "ANDAR", "FILME"] },
    { texto: "_____ vamos apresentar uma peça de teatro", respostaCorreta: "NÓS", opcoes: ["VER", "EU", "LEGAL", "NÓS"] },
    { texto: "_____ participam do grupo de dança", respostaCorreta: "ELES", opcoes: ["ELES", "NÓS", "DANCAR", "EU"] },
    { texto: "_____ vai fazer prova de matemática", respostaCorreta: "ELA", opcoes: ["ELA", "ESTUDAR", "ANDAR", "ELES"] },
    { texto: "_____ gosto de andar de skate", respostaCorreta: "EU", opcoes: ["SKATE", "ELES", "ELAS", "EU"] }
];

function verificarResposta(respostaCorreta, respostaEscolhida, elemento) {
    const resultadoElement = document.getElementById("resultado");
    const chave = perguntaAtual; // Use o índice como chave

    if (perguntasRespondidas[chave] !== undefined) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    if (respostaEscolhida === respostaCorreta) {
        pontos += 2;
        // Salva a pontuação no localStorage
        salvarPontuacao();
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    perguntasRespondidas[chave] = respostaCorreta === respostaEscolhida;
    elemento.forEach(btn => btn.disabled = true);
}

function carregarPergunta(indice) {
    const pergunta = perguntas[indice];
    // if (!pergunta) {
    //     alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
    //     // Redireciona para a página de pontuação final passando a pontuação
    //     window.location.href = `file:///C:/EDUCA%20GAME%20-%20ATUALIZADO/Pages/DIFICL/pontFinalDificil.html?pontuacao=${pontos}`;
    //     return;
    // }

    const h1 = document.querySelector("h1");
    h1.textContent = pergunta.texto;

    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, buttons);
    });

    const proximaButton = document.getElementById("proxima");
    proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta
    proximaButton.onclick = () => {
        perguntaAtual++;
        carregarPergunta(perguntaAtual);
    };

    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    if (indice === perguntas.length - 1) {  // Verifica se é a última pergunta
        voltarDificuldadeButton.style.display = "block"; // Torna o botão visível
    } else {
        voltarDificuldadeButton.style.display = "none"; // Oculta o botão nas outras perguntas
    }

    voltarDificuldadeButton.onclick = () => {
        window.location = "/Pages/DIFICL/nivelDificl.html";
    };

    const voltarHomeButton = document.getElementById("voltarHome");
    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location.href = "/Pages/Home.html"; // URL para voltar à Home
    };
}

document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao();
    carregarPergunta(perguntaAtual);
});