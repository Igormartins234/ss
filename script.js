const baseUrl = 'http://10.142.227.168:5000';
const aleatorio = "/charadas";

let respostaCorreta = ''; 

async function getCharada() {
    try {
        const charada = await fetch(baseUrl + aleatorio, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });
        console.log(charada);

        const charadaJson = await charada.json();
        console.log(charadaJson.pergunta);

        const charadaElement = document.getElementById('charada');
        if (charadaElement) {
            charadaElement.textContent = charadaJson.pergunta;
        }

        
        respostaCorreta = charadaJson.resposta;

    } catch (error) {
        console.log("Erro ao buscar charada: " + error);
    }
}

function verificarResposta() {
    const respostaInput = document.getElementById('resposta');
    const resultado = document.getElementById('resultado');
    const respostaContainer = document.getElementById('resposta-container');

    if (respostaInput && resultado && respostaContainer) {
        const respostaUsuario = respostaInput.value.trim().toLowerCase();
        if (respostaUsuario === respostaCorreta.toLowerCase()) {
            resultado.textContent = 'Parabéns! Você acertou!';
            resultado.classList.add('text-success');
            resultado.classList.remove('text-danger');
        } else {
            resultado.textContent = 'Resposta incorreta. Tente novamente!';
            resultado.classList.add('text-danger');
            resultado.classList.remove('text-success');
        }

        
        respostaContainer.querySelector('p').textContent = `Resposta correta: ${respostaCorreta}`;
    }
}

function novaCharada() {
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.textContent = ''; // Limpa o resultado anterior
    }
    const respostaInput = document.getElementById('resposta');
    if (respostaInput) {
        respostaInput.value = ''; // Limpa o campo de resposta
    }
    getCharada(); // Busca uma nova charada
}

getCharada();
