// Elementos do DOM
const form = document.getElementById("propostaForm");
const valorTotalInput = document.getElementById("valorTotal");
const valorPixInput = document.getElementById("valorPix");
const valorCartaoInput = document.getElementById("valorCartao");
const dataPropostaInput = document.getElementById("dataProposta");
const validadePropostaInput = document.getElementById("validadeProposta");
const linkGeradoDiv = document.getElementById("linkGerado");
const linkLabel = document.getElementById("linkLabel");
const listaLinksPropostas = document.getElementById("listaLinksPropostas");

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

    // Exibir seção de links
    linkGeradoDiv.classList.add("show");
    linkGeradoDiv.style.opacity = "1";
    linkGeradoDiv.style.display = "block";
    linkGeradoDiv.style.visibility = "visible";

    // Atualizar lista de links
    await carregarLinksRecentes();

    // Scroll suave até a seção de links
    linkGeradoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    console.error("Erro ao criar proposta:", error);
    alert("Erro ao criar proposta: " + error.message);
  } finally {
    // Reset do flag de envio
    form.dataset.submitting = "false";
  }
});

// Função para carregar links recentes do backend
async function carregarLinksRecentes() {
  try {
    const response = await fetch("http://localhost:3000/api/propostas");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao carregar propostas");
    }

    // Pegar os últimos 5 links
    const linksRecentes = data.propostas.slice(0, 5);

    if (linksRecentes.length === 0) {
      listaLinksPropostas.innerHTML =
        '<div class="links-propostas-vazio">Nenhuma proposta gerada ainda</div>';
      return;
    }

    listaLinksPropostas.innerHTML = linksRecentes
      .map((proposta) => {
        const dataFormatada = new Date(proposta.dataCriacao).toLocaleString(
          "pt-BR"
        );
        const link = `http://localhost:3000/proposta/${proposta.id}`;

        return `
        <div class="link-proposta-item">
          <div class="link-proposta-cliente">${proposta.nomeCliente}</div>
          <div class="link-proposta-url">${link}</div>
          <div class="link-proposta-botoes">
            <button class="link-proposta-btn" onclick="copiarLinkProposta('${link}')">Copiar</button>
            <button class="link-proposta-btn secundario" onclick="visualizarLinkProposta('${link}')">Visualizar</button>
          </div>
          <div style="font-size: 0.75rem; color: #888; margin-top: 0.5rem;">${dataFormatada}</div>
        </div>
      `;
      })
      .join("");
  } catch (error) {
    console.error("Erro ao carregar links:", error);
    listaLinksPropostas.innerHTML =
      '<div class="links-propostas-vazio">Erro ao carregar propostas</div>';
  }
}

// Função para copiar link da proposta
function copiarLinkProposta(link) {
  navigator.clipboard
    .writeText(link)
    .then(() => {
      // Feedback visual
      event.target.textContent = "Copiado!";
      event.target.style.background = "#4CAF50";
      setTimeout(() => {
        event.target.textContent = "Copiar";
        event.target.style.background = "";
      }, 2000);
    })
    .catch(() => {
      alert("Erro ao copiar o link. Por favor, copie manualmente.");
    });
}

// Função para visualizar link da proposta
function visualizarLinkProposta(link) {
  window.open(link, "_blank");
}

// Carregar links ao inicializar a página
document.addEventListener("DOMContentLoaded", function () {
  carregarLinksRecentes();
});
