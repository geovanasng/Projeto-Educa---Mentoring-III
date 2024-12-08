function salvarPontuacao() {
    console.log('salvei')
    localStorage.setItem('pontuacaoVerboDificil', pontos);
}

function zeraPontuacao() {
    console.log('zerei')
    localStorage.setItem('pontuacaoVerboDificil', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoVerboDificil')) || 0;
}


let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas já foram respondidas
let perguntaAtual = 0;

const perguntas = [
    { texto: "Eu vou _________ na piscina do clube", respostaCorreta: "NADAR", opcoes: ["NADAR", "VIAJAR", "NÓS", "EU"] },
    { texto: "Eu gosto de  _________ de piadas", respostaCorreta: "RIR", opcoes: ["RIR", "PIADAS", "ELAS", "EU"] },
    { texto: "Nós vamos _________ na festa", respostaCorreta: "DANÇAR", opcoes: ["DANÇAR", "LEGAL", "TU", "NÓS"] },
    { texto: "A minha amiga vai _________ na minha casa", respostaCorreta: "DORMIR", opcoes: ["DORMIR", "AMANHÃ", "EU", "ELAS"] },
    { texto: "Nós vamos _________ para não atrasar", respostaCorreta: "CORRER", opcoes: ["CORRER", "LEGAL", "EU", "ELAS"] }
];

// Função para verificar a resposta
function verificarResposta(respostaCorreta, respostaEscolhida, chave, opcoes) {
    const resultadoElement = document.getElementById("resultado");

    // Verifica se a pergunta já foi respondida
    if (perguntasRespondidas[chave] !== undefined) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    // Verificando se a resposta está correta
    if (respostaEscolhida === respostaCorreta) {
        pontos += 2; // Adiciona 2 pontos se a resposta estiver correta
        // Salva a pontuação no localStorage
        salvarPontuacao();
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    // Marca a pergunta como respondida
    perguntasRespondidas[chave] = respostaCorreta === respostaEscolhida; // Armazena se a resposta foi correta

    // Desabilita todos os botões de opções e altera a aparência
    opcoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled'); // Adiciona uma classe CSS para indicar que o botão está desabilitado
    });
}

// Carregar pergunta atual
function carregarPergunta(indice) {
    const pergunta = perguntas[indice];
    if (!pergunta) return;

    const h1 = document.querySelector("h1");
    h1.textContent = pergunta.texto;

    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, pergunta.respostaCorreta, buttons);
    });

    const proximaButton = document.getElementById("proxima");
    const voltarHomeButton = document.getElementById("voltarHome");

    // Lógica do botão "Próxima"
    if (indice === perguntas.length - 1) {
        proximaButton.style.display = "none"; // Esconde na última pergunta
    } else {
        proximaButton.style.display = "block"; // Exibe se não for a última pergunta
    }

    // Ação do botão "Próxima"
    proximaButton.onclick = () => {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            carregarPergunta(perguntaAtual);
        } else {
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
            window.location = "/Pages/nivel.html"; // Direcionar para a página de seleção de nível
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

    // Botão para voltar para a Home
    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location = "/Pages/Home.html"; // URL para voltar à Home
    };
}

// Adicionando eventos de clique para cada página
document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao();
    carregarPergunta(perguntaAtual);
});
// salvarPontuacao();
//     localStorage.setItem('pontuacaoQuiz4', pontos)