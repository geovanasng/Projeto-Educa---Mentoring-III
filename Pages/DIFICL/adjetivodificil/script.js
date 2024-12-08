function salvarPontuacao() {
    localStorage.setItem('pontuacaoAdjetivoDificil', pontos);
}

function zeraPontuacao() {
    localStorage.setItem('pontuacaoAdjetivoDificil', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoAdjetivoDificil')) || 0;
}

let pontos = 0;
const perguntasRespondidas = {};
let perguntaAtual = 0;

const perguntas = [
    { texto: "Acho música muito _________", respostaCorreta: "LEGAL", opcoes: ["EU", "LEGAL", "TU", "ELAS"] },
    { texto: "Futebol é _________", respostaCorreta: "CHATO", opcoes: ["CHATO", "NÓS", "JOGAR", "ELAS"] },
    { texto: "Meus avós são _________", respostaCorreta: "IDOSOS", opcoes: ["EU", "VER", "IDOSOS", "ELES"] },
    { texto: "Eu gosto de filmes _________", respostaCorreta: "LEGAIS", opcoes: ["LEGAIS", "VER", "GOSTAR", "TU"] },
    { texto: "A paisagem é _________", respostaCorreta: "BONITA", opcoes: ["BONITA", "FEIO", "TRISTE", "BELAS"] }
];

function verificarResposta(respostaCorreta, respostaEscolhida, elemento) {
    const resultadoElement = document.getElementById("resultado");
    const chave = respostaCorreta;

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

    perguntasRespondidas[chave] = respostaEscolhida === respostaCorreta;
    elemento.forEach(btn => btn.disabled = true);
}

function carregarPergunta(indice) {
    const pergunta = perguntas[indice];
    if (!pergunta) {
        console.log("Nenhuma pergunta encontrada.");
        return;
    }

    const h1 = document.querySelector("h1");
    h1.textContent = pergunta.texto;

    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, buttons);
    });

    const proximaButton = document.getElementById("proxima");

    // Lógica do botão "Próxima"
    if (indice === perguntas.length - 1) {
        proximaButton.style.display = "none";  // Esconde na última pergunta
    } else {
        proximaButton.style.display = "block";  // Exibe nas outras perguntas
    }

    // Ação do botão "Próxima"
    proximaButton.onclick = () => {
        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            carregarPergunta(perguntaAtual);
        } else {
            // Exibe um alerta com a pontuação
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");

            // Direciona para a página de pontuação final
            window.location.href = "/Pages/DIFICL/Pontos%20Finais-Dificl/pontFinalDificil.html"; // URL para a página de pontuação final
        }
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
}

document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao();
    carregarPergunta(perguntaAtual);
});
