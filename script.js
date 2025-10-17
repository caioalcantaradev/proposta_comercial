// Elementos do DOM
const form = document.getElementById("propostaForm");
const valorTotalInput = document.getElementById("valorTotal");
const valorPixInput = document.getElementById("valorPix");
const valorCartaoInput = document.getElementById("valorCartao");
const dataPropostaInput = document.getElementById("dataProposta");
const validadePropostaInput = document.getElementById("validadeProposta");
const linkGeradoDiv = document.getElementById("linkGerado");
const linkPropostaInput = document.getElementById("linkProposta");
const linkLabel = document.getElementById("linkLabel");
const copiarLinkBtn = document.getElementById("copiarLink");
const visualizarBtn = document.getElementById("visualizarBtn");

// Definir data atual como padrão
const hoje = new Date();
const dataFormatada = hoje.toISOString().split("T")[0];
dataPropostaInput.value = dataFormatada;

// Calcular e definir validade inicial
calcularValidade();

// Formatar valor em Real brasileiro
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Calcular valores de PIX e Cartão
function calcularValores() {
  const valorTotal = parseFloat(valorTotalInput.value) || 0;

  if (valorTotal > 0) {
    const valorPix = valorTotal * 0.9; // 10% de desconto
    const valorCartao = valorTotal * 1.1; // 10% de acréscimo

    valorPixInput.value = formatarMoeda(valorPix);
    valorCartaoInput.value = formatarMoeda(valorCartao);
  } else {
    valorPixInput.value = "";
    valorCartaoInput.value = "";
  }
}

// Calcular validade (7 dias após a data da proposta)
function calcularValidade() {
  const dataProposta = new Date(dataPropostaInput.value + "T00:00:00");

  if (!isNaN(dataProposta.getTime())) {
    const dataValidade = new Date(dataProposta);
    dataValidade.setDate(dataValidade.getDate() + 7);

    const validadeFormatada = dataValidade.toISOString().split("T")[0];
    validadePropostaInput.value = validadeFormatada;
  }
}

// Event listeners
valorTotalInput.addEventListener("input", calcularValores);
dataPropostaInput.addEventListener("change", calcularValidade);

// Gerar link da proposta
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Prevenir múltiplos envios
  if (form.dataset.submitting === "true") {
    return;
  }
  form.dataset.submitting = "true";

  // Coletar dados do formulário
  const dados = {
    nomeCliente: document.getElementById("nomeCliente").value,
    projeto: document.getElementById("projeto").value,
    valorTotal: parseFloat(valorTotalInput.value),
    valorPix: valorPixInput.value,
    valorCartao: valorCartaoInput.value,
    dataProposta: dataPropostaInput.value,
    validadeProposta: validadePropostaInput.value,
    garantia: document.getElementById("garantia").value,
    dataCriacao: new Date().toISOString(),
  };

  // Enviar dados para o backend
  try {
    const response = await fetch("http://localhost:3000/api/propostas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao criar proposta");
    }

    // Atualizar label dinâmico
    const nomeCliente = dados.nomeCliente;
    linkLabel.textContent = `Proposta de ${nomeCliente}:`;

    // Exibir link gerado
    linkPropostaInput.value = result.link;
    linkGeradoDiv.classList.add("show");

    // Forçar exibição via style inline
    linkGeradoDiv.style.opacity = "1";
    linkGeradoDiv.style.display = "block";
    linkGeradoDiv.style.visibility = "visible";

    // Scroll suave até o link gerado
    linkGeradoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    console.error("Erro ao criar proposta:", error);
    alert("Erro ao criar proposta: " + error.message);
  } finally {
    // Reset do flag de envio
    form.dataset.submitting = "false";
  }
});

// Copiar link
copiarLinkBtn.addEventListener("click", function () {
  linkPropostaInput.select();
  linkPropostaInput.setSelectionRange(0, 99999); // Para mobile

  navigator.clipboard
    .writeText(linkPropostaInput.value)
    .then(function () {
      const textOriginal = copiarLinkBtn.textContent;
      copiarLinkBtn.textContent = "Copiado! ✓";
      copiarLinkBtn.classList.add("copied");

      setTimeout(function () {
        copiarLinkBtn.textContent = textOriginal;
        copiarLinkBtn.classList.remove("copied");
      }, 2000);
    })
    .catch(function (err) {
      alert("Erro ao copiar o link. Por favor, copie manualmente.");
    });
});

// Visualizar proposta
visualizarBtn.addEventListener("click", function () {
  window.open(linkPropostaInput.value, "_blank");
});
