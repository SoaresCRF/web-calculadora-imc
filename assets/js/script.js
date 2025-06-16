document.addEventListener("DOMContentLoaded", () => {
    const alturaRange = document.querySelector("#altura-range");
    const alturaInput = document.querySelector("#altura");
    const pesoRange = document.querySelector("#peso-range");
    const pesoInput = document.querySelector("#peso");
    const statusImc = document.querySelector("#status-imc");

    // Sincronização altura
    alturaRange.addEventListener("input", () => {
        alturaInput.value = alturaRange.value;
        atualizarIMC();
    });

    alturaInput.addEventListener("input", () => {
        alturaInput.value = limparValorNumerico(alturaInput.value);
        alturaRange.value = alturaInput.value;
        atualizarIMC();
    });

    // Sincronização peso
    pesoRange.addEventListener("input", () => {
        pesoInput.value = pesoRange.value;
        atualizarIMC();
    });

    pesoInput.addEventListener("input", () => {
        pesoInput.value = limparValorNumerico(pesoInput.value);
        pesoRange.value = pesoInput.value;
        atualizarIMC();
    });

    function limparValorNumerico(valor) {
        return valor.replace(/[^0-9]/g, "");
    }

    function calcularIMC() {
        const altura = parseFloat(alturaInput.value);
        const peso = parseFloat(pesoInput.value);

        if (altura === 0 || peso === 0 || isNaN(altura) || isNaN(peso)) {
            return null;
        }

        const imc = peso / Math.pow(altura / 100, 2);
        return imc.toFixed(2);
    }

    function atualizarIMC() {
        const imc = calcularIMC();

        statusImc.className = "fw-bold fs-5";
        removerEstilosTabela();

        if (imc === null) {
            statusImc.textContent = "Valor inválido.";
            statusImc.classList.add("text-muted");
            return;
        }

        const classificacao = classificacaoIMC(imc);
        const corClasse = corClasseIMC(imc);

        statusImc.textContent = `${imc} - ${classificacao}`;
        statusImc.classList.add(corClasse);

        destacarLinhaTabela(classificacao, corClasse);
    }

    function removerEstilosTabela() {
        document.querySelectorAll("tbody tr").forEach(tr => {
            tr.classList.remove(
                "table-primary",
                "table-success",
                "table-warning",
                "table-danger",
                "table-secondary"
            );
        });
    }

    function destacarLinhaTabela(classificacao, corClasse) {
        const linha = document.querySelector(`tr[data-classificacao="${classificacao}"]`);
        if (!linha) {
            console.warn("Nenhuma linha encontrada para:", classificacao);
            return;
        }

        const corTabela = {
            "text-primary": "table-primary",
            "text-success": "table-success",
            "text-warning": "table-warning",
            "text-danger": "table-danger"
        };

        const classeTabela = corTabela[corClasse] || "table-secondary";
        linha.classList.add(classeTabela);
    }

    function classificacaoIMC(imc) {
        imc = parseFloat(imc);

        if (imc < 18.5) return "Magreza";
        if (imc < 25) return "Normal";
        if (imc < 30) return "Sobrepeso";
        if (imc < 40) return "Obesidade";
        return "Obesidade Grave";
    }

    function corClasseIMC(imc) {
        imc = parseFloat(imc);

        if (imc < 18.5) return "text-primary";
        if (imc < 25) return "text-success";
        if (imc < 30) return "text-warning";
        if (imc < 40) return "text-warning";
        return "text-danger";
    }

    atualizarIMC();
});
