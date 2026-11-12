global.window = {};
const { test } = require("node:test");
const assert = require("node:assert");

const {
    validarDataReserva,
    verificarConflito,
    cadastrarReserva
} = require("./reservas.js");

test("Deve aceitar uma data futura", () => {
    assert.strictEqual(
        validarDataReserva("2026-12-20", "2026-12-10"),
        true
    );
});

test("Deve rejeitar uma data passada", () => {
    assert.strictEqual(
        validarDataReserva("2026-12-01", "2026-12-10"),
        false
    );
});

test("Deve identificar uma reserva na mesma data", () => {
    const reservas = [{ data: "2026-12-20" }];

    assert.strictEqual(
        verificarConflito(reservas, "2026-12-20"),
        true
    );
});

test("Deve permitir uma data sem conflito", () => {
    assert.strictEqual(
        verificarConflito([], "2026-12-20"),
        false
    );
});

test("Deve cadastrar uma reserva válida", () => {
    const reservas = [];
    const dados = {
        cliente: "Maria",
        telefone: "11999999999",
        data: "2026-12-20",
        tipo: "Day Use"
    };

    const resultado = cadastrarReserva(
        dados,
        reservas,
        "2026-12-10"
    );

    assert.strictEqual(resultado.sucesso, true);
    assert.strictEqual(reservas.length, 1);
});

test("Não deve cadastrar uma reserva com data passada", () => {
    const reservas = [];
    const dados = {
        cliente: "João",
        telefone: "11988888888",
        data: "2026-12-01",
        tipo: "Pernoite"
    };

    const resultado = cadastrarReserva(
        dados,
        reservas,
        "2026-12-10"
    );

    assert.strictEqual(resultado.sucesso, false);
    assert.strictEqual(reservas.length, 0);
});

test("Não deve cadastrar duas reservas na mesma data", () => {
    const reservas = [{ data: "2026-12-20" }];
    const dados = {
        cliente: "Ana",
        telefone: "11977777777",
        data: "2026-12-20",
        tipo: "Day Use"
    };

    const resultado = cadastrarReserva(
        dados,
        reservas,
        "2026-12-10"
    );

    assert.strictEqual(resultado.sucesso, false);
    assert.strictEqual(reservas.length, 1);
});
test("Deve disponibilizar as funções no navegador", () => {
    assert.strictEqual(
        typeof global.window.Reservas.cadastrarReserva,
        "function"
    );
});
