function salvarPontuacao() {
    localStorage.setItem('pontuacaoPronomeFacil', pontos);
}

function zeraPontuacao() {
    localStorage.setItem('pontuacaoPronomeFacil', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoPronomeFacil')) || 0;
}


let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas já foram respondidas
let perguntaAtual = 0;

const perguntas = [
    { texto: "_____ sei andar de bicicleta", respostaCorreta: "EU", opcoes: ["EU", "NÓS", "ELE", "ELA"] },
    { texto: "_____ vamos caminhar no parque", respostaCorreta: "NÓS", opcoes: ["NÓS", "CORRER", "BONITO", "ELA"] },
    { texto: "_____ é minha melhor amiga", respostaCorreta: "ELA", opcoes: ["ELA", "RIR", "INTELIGENTE", "GRANDE"] },
    { texto: "_____ gosto muito de bolo", respostaCorreta: "EU", opcoes: ["EU", "GOSTAR", "SENTIR", "ELA"] },
    { texto: "_____ é muito gentil e bonito", respostaCorreta: "ELE", opcoes: ["ELE", "CHORAR", "LEGAL", "BONITO"] }
];

// Função para verificar a resposta
function verificarResposta(respostaCorreta, respostaEscolhida, indice, opcoes) {
    const resultadoElement = document.getElementById("resultado");

    // Verifica se a pergunta já foi respondida usando o índice da pergunta (chave)
    if (perguntasRespondidas[indice] !== undefined) {
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


    console.log(pontos)

    // Marca a pergunta como respondida
    perguntasRespondidas[indice] = true; // Marca como respondida

    // Desabilita todos os botões de opções e altera a aparência
    opcoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled'); // Adiciona uma classe CSS para indicar que o botão está desabilitado
    });
}

// Função para carregar a pergunta atual
function carregarPergunta(indice) {
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
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, indice, buttons); // Passa o índice como chave
    });

    // Configuração dos botões de navegação
    const proximaButton = document.getElementById("proxima");
    proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta

    proximaButton.onclick = () => {
        if (indice < perguntas.length - 1) {
            carregarPergunta(indice + 1);
        } else {
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
            window.location = "/Pages/nivel.html"; // URL para seleção de nível
        }
    };

    // Botão para voltar ao nível de dificuldade
    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    voltarDificuldadeButton.style.display = (indice === perguntas.length - 1) ? "block" : "none"; // Exibe apenas na última pergunta
    voltarDificuldadeButton.onclick = () => {
        window.location = "/Pages/FACIL/nivelFacil.html"; // URL para voltar ao nível de dificuldade
    };

    // Botão para voltar à Home
    const voltarHomeButton = document.getElementById("voltarHome");
    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location = "/Pages/Home.html"; // URL para voltar à Home
    };
}

// Carregar a primeira pergunta assim que o DOM for carregado
document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao();
    carregarPergunta(perguntaAtual);
});
