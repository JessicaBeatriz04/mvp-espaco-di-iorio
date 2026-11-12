
function validarDataReserva(data, hoje) {
    return data >= hoje;
}

function verificarConflito(reservas, data) {
    return reservas.some(reserva => reserva.data === data);
}

function cadastrarReserva(dados, reservas, hoje) {
    if (!validarDataReserva(dados.data, hoje)) {
        return {
            sucesso: false,
            mensagem: "Data inválida!"
        };
    }

    if (verificarConflito(reservas, dados.data)) {
        return {
            sucesso: false,
            mensagem: "Já existe uma reserva nessa data."
        };
    }

    reservas.push(dados);

    return {
        sucesso: true,
        mensagem: "Reserva cadastrada com sucesso!"
    };
}

const funcoesReserva = {
    validarDataReserva,
    verificarConflito,
    cadastrarReserva
};

// Disponibiliza as funções para os testes no Node.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = funcoesReserva;
}

// Disponibiliza as funções para o navegador
if (typeof window !== "undefined") {
    window.Reservas = funcoesReserva;
}
