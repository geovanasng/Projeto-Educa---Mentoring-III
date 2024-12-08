function salvarPontuacao() {
    localStorage.setItem('pontuacaoSubstantivoMedio', pontos);
}

function zeraPontuacao() {
    localStorage.setItem('pontuacaoSubstantivoMedio', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoSubstantivoMedio')) || 0;
}

let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas já foram respondidas

const perguntas = [
    { texto: "Está chegando o _________", respostaCorreta: "NATAL", opcoes: ["NATAL", "EU", "CORRER", "CHEGAR"] },
    { texto: "Eu ando de _________ com meu amigo?", respostaCorreta: "CARRO", opcoes: ["CARRO", "EU", "NÓS", "BONITO"] },
    { texto: "Eu gosto de tocar _________", respostaCorreta: "GUITARRA", opcoes: ["GUITARRA", "NÓS", "BOLO", "GOSTAR"] },
    { texto: "Minha mochila é _________", respostaCorreta: "LINDA", opcoes: ["LINDA", "NÓS", "VIAJAR", "CORRER"] },
    { texto: "Na praia tem _________", respostaCorreta: "AREIA", opcoes: ["AREIA", "ELE", "VIAJAR", "NÓS"] }
];

// Função para verificar a resposta
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

    // Desabilita todas as opções
    opcoes.forEach(opcao => {
        opcao.disabled = true;
        opcao.classList.add('disabled'); // Adiciona uma classe CSS para indicar que o botão está desabilitado
    });
}

// Função para configurar a pergunta atual
function configurarPergunta(indice) {
    const pergunta = perguntas[indice];
    const h1 = document.querySelector("h1");
    const buttons = document.querySelectorAll(".button-container button");
    
    // Atualiza o texto da pergunta
    h1.textContent = pergunta.texto;

    // Atualiza os botões de resposta
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.classList.remove('disabled'); // Remove a classe de desabilitado

        // Adiciona evento de clique
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent.trim().toUpperCase(), indice, buttons);
    });

    // Configura os botões de navegação
    configurarBotoesNavegacao(indice);
}

// Função para configurar os botões de navegação
function configurarBotoesNavegacao(indice) {
    const proximaButton = document.getElementById("proxima");
    
    const voltarHomeButton = document.getElementById("voltarHome");

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

    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location = "/Pages/Home.html"; // URL para voltar à Home
    };
}

// Inicializa o quiz ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao()
    configurarPergunta(0); // Começa a partir da primeira pergunta
});
