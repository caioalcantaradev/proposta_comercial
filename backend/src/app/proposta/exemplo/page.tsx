"use client";

import { useEffect, useState } from "react";

interface Proposta {
  id: string;
  nomeCliente: string;
  projeto: string;
  valorTotal: number;
  valorPix: string;
  valorCartao: string;
  dataProposta: string;
  validadeProposta: string;
  garantia: string;
  dataCriacao: string;
  expiraEm: string;
}

export default function PropostaExemplo() {
  const [proposta] = useState<Proposta>({
    id: "exemplo",
    nomeCliente: "João Silva",
    projeto:
      "Desenvolvimento de um site institucional moderno e responsivo para a empresa, incluindo sistema de contato, galeria de produtos e integração com redes sociais.",
    valorTotal: 2500,
    valorPix: "R$ 2.250,00",
    valorCartao: "R$ 2.750,00",
    dataProposta: "2024-01-15",
    validadeProposta: "2024-01-22",
    garantia: "90 dias",
    dataCriacao: "2024-01-15T10:00:00.000Z",
    expiraEm: "2024-01-22T10:00:00.000Z",
  });

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const isExpirada = (dataExpiracao: string) => {
    return new Date(dataExpiracao) < new Date();
  };

  const expirada = isExpirada(proposta.expiraEm);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WEBuilder</h1>
                <p className="text-gray-600 text-sm">
                  Desenvolvimento Web Profissional
                </p>
              </div>
            </div>
            {expirada && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Proposta Expirada
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-white mb-4">
              Proposta Comercial
            </h2>
            <p className="text-xl text-gray-300">
              Desenvolvida especialmente para{" "}
              <span className="text-green-400 font-semibold">
                {proposta.nomeCliente}
              </span>
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Data da Proposta</p>
                <p className="text-white font-semibold">
                  {formatarData(proposta.dataProposta)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Validade</p>
                <p
                  className={`font-semibold ${
                    expirada ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {formatarData(proposta.validadeProposta)}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Garantia</p>
                <p className="text-white font-semibold">{proposta.garantia}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Projeto Details */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center text-gray-900 font-bold mr-3">
                  1
                </span>
                Detalhes do Projeto
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Cliente</p>
                  <p className="text-white text-lg font-semibold">
                    {proposta.nomeCliente}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Projeto</p>
                  <p className="text-gray-300 leading-relaxed">
                    {proposta.projeto}
                  </p>
                </div>
              </div>
            </div>

            {/* Investment */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center text-gray-900 font-bold mr-3">
                  2
                </span>
                Investimento
              </h3>
              <div className="space-y-6">
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Valor Total</p>
                  <p className="text-3xl font-bold text-white">
                    {formatarMoeda(proposta.valorTotal)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                    <p className="text-green-400 text-sm mb-1">
                      💳 PIX (10% OFF)
                    </p>
                    <p className="text-white font-bold text-lg">
                      {proposta.valorPix}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">💳 Cartão</p>
                    <p className="text-white font-bold text-lg">
                      {proposta.valorCartao}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para começar seu projeto?
              </h3>
              <p className="text-gray-800 mb-6">
                Entre em contato conosco para validar esta proposta e dar início
                ao desenvolvimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5511999999999"
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 WhatsApp
                </a>
                <a
                  href="mailto:contato@webuilder.com"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  📧 Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
              <span className="text-lg">🚀</span>
            </div>
            <span className="text-white font-semibold">WEBuilder</span>
          </div>
          <p className="text-gray-400 text-sm">
            Desenvolvimento Web Profissional • Transformando ideias em realidade
            digital
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Proposta válida até {formatarData(proposta.validadeProposta)}
          </p>
        </div>
      </footer>
    </div>
  );
}
