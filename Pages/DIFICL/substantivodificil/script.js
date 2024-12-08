function salvarPontuacao() {
    console.log('salvei')
    localStorage.setItem('pontuacaoSubstantivoDificil', pontos);
}

function zeraPontuacao() {
    console.log('zerei')
    localStorage.setItem('pontuacaoSubstantivoDificil', 0);
}

function recuperarPontuacao() {
    return parseInt(localStorage.getItem('pontuacaoSubstantivoDificil')) || 0;
}

let pontos = 0;
const perguntasRespondidas = {}; // Para armazenar se uma pergunta já foi respondida
let perguntaAtual = 0;

const perguntas = [
    { texto: "Eu vou de  _________ para a escola", respostaCorreta: "CARRO", opcoes: ["CARRO", "VAMOS", "IR", "EU"] },
    { texto: "Eu gosto de ler  _________", respostaCorreta: "LIVROS", opcoes: ["LIVROS", "LER", "ELAS", "NOS"] },
    { texto: "Não gosto de _________ forte", respostaCorreta: "CHUVA", opcoes: ["CHUVA", "ANDAR", "ELAS", "EU"] },
    { texto: "A _________ que estudo é muito boa", respostaCorreta: "ESCOLA", opcoes: ["ESCOLA", "MOCHILA", "EU", "NÓS"] },
    { texto: "Eu vou ao _________ almoçar com meus pais", respostaCorreta: "RESTAURANTE", opcoes: ["RESTAURANTE", "COMER", "ANDAR", "NÓS"] }
];

// Função para verificar a resposta
function verificarResposta(respostaCorreta, respostaEscolhida, opcoes) {
    const resultadoElement = document.getElementById("resultado");
    const chave = respostaCorreta; // Usando a resposta correta como chave

    // Verifica se a pergunta já foi respondida
    if (perguntasRespondidas[chave] !== undefined) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    // Verificando se a resposta está correta
    if (respostaEscolhida === respostaCorreta) {
        pontos += 2;
        // Salva a pontuação no localStorage
        salvarPontuacao();
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    // Marca a pergunta como respondida e desabilita as opções
    perguntasRespondidas[chave] = respostaCorreta === respostaEscolhida; // Armazena se a resposta foi correta
    opcoes.forEach(btn => btn.disabled = true); // Desabilita todos os botões da pergunta
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
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, buttons);
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
        window.location.href = "Home.html"; // URL para voltar à Home
    };
}

// Adicionando eventos de clique para cada página
document.addEventListener("DOMContentLoaded", function () {
    zeraPontuacao();
    carregarPergunta(perguntaAtual);
});
// salvarPontuacao();
//     localStorage.setItem('pontuacaoQuiz3', pontos)