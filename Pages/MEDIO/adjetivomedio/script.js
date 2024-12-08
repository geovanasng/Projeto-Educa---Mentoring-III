function salvarPontuacao() {
    localStorage.setItem('pontuacaoAdjetivoMedio', pontos);
}

function zeraPontuacao() {
    localStorage.setItem('pontuacaoAdjetivoMedio', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoAdjetivoMedio')) || 0;
}

let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas já foram respondidas

const perguntas = [
    { texto: "O livro é muito _________", respostaCorreta: "LONGO", opcoes: ["LONGO", "ANDAR", "LER", "LIVRO"] },
    { texto: "Minha cidade é muito _________", respostaCorreta: "GRANDE", opcoes: ["GRANDE", "EU", "ELA", "ANDAR"] },
    { texto: "Meus pais são _________", respostaCorreta: "LEGAIS", opcoes: ["LEGAIS", "ANDAR", "TU", "CIDADE"] },
    { texto: "Minha roupa é _________", respostaCorreta: "NOVA", opcoes: ["NOVA", "ELE", "VESTIR", "OUVIR"] },
    { texto: "Eu me acho muito _________ ", respostaCorreta: "INTELIGENTE", opcoes: ["INTELIGENTE", "EU", "ANDAR", "ELAS"] }
];

function verificarResposta(respostaCorreta, respostaEscolhida, chave, opcoes) {
    const resultadoElement = document.getElementById("resultado");

    // Verifica se a pergunta já foi respondida
    if (perguntasRespondidas[chave]) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    // Verificando se a resposta está correta
    if (respostaCorreta === respostaEscolhida) {
        pontos += 2; // Adiciona 2 pontos se a resposta estiver correta        
        // Salva a pontuação no localStorage
        salvarPontuacao();
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    // Marca a pergunta como respondida
    perguntasRespondidas[chave] = true;

    // Desabilita todos os botões de opções e altera a aparência
    opcoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled'); // Adiciona uma classe CSS para indicar que o botão está desabilitado
    });
}

function configurarPergunta(indice) {
    const pergunta = perguntas[indice];
    const h1 = document.querySelector("h1");
    const resultadoElement = document.getElementById("resultado");

    // Atualiza o texto da pergunta
    h1.textContent = pergunta.texto;

    // Atualiza os botões de resposta
    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.classList.remove('disabled'); // Remove a classe de desabilitado
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent.trim().toUpperCase(), pergunta.respostaCorreta, buttons);
    });

    // Configuração dos botões de navegação
    const proximaButton = document.getElementById("proxima");
    proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta

    proximaButton.onclick = () => {
        if (indice < perguntas.length - 1) {
            configurarPergunta(indice + 1);
        } else {
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
            window.location = "/Pages/nivel.html"; // URL para seleção de nível
        }
    };

    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    if (indice === perguntas.length - 1) {  // Verifica se é a última pergunta
        voltarDificuldadeButton.style.display = "block"; // Torna o botão visível
    } else {
        voltarDificuldadeButton.style.display = "none"; // Oculta o botão nas outras perguntas
    }
    
    voltarDificuldadeButton.onclick = () => {
        window.location = "/Pages/MEDIO/nivelMedio.html";
    };

    const voltarHomeButton = document.getElementById("voltarHome");
    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location = "/Pages/Home.html"; // URL para voltar à Home
    };
}

document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao()
    configurarPergunta(0);
});
