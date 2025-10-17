"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function PropostaPage() {
  const params = useParams();
  const [proposta, setProposta] = useState<Proposta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarProposta = async () => {
      try {
        const response = await fetch(`/api/propostas/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar proposta");
        }

        setProposta(data.proposta);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      buscarProposta();
    }
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <div className="text-white text-xl font-medium">
            Carregando sua proposta...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-600 text-white p-8 rounded-2xl text-center max-w-md w-full shadow-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Proposta não encontrada</h1>
          <p className="text-red-100">{error}</p>
        </div>
      </div>
    );
  }

  if (!proposta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-700 text-white p-8 rounded-2xl text-center max-w-md w-full shadow-2xl">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">Proposta não disponível</h1>
          <p className="text-gray-300">
            Esta proposta pode ter expirado ou não existe.
          </p>
        </div>
      </div>
    );
  }

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
      <section className="bg-gradient-to-r from-green-400 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-6">
              PROPOSTA COMERCIAL
            </h1>
            <p className="text-2xl text-white/90 mb-4">
              Desenvolvida especialmente para
            </p>
            <p className="text-3xl font-bold text-white">
              {proposta.nomeCliente}
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Data da Proposta</p>
              <p className="text-white font-bold text-lg">
                {formatarData(proposta.dataProposta)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Validade</p>
              <p
                className={`font-bold text-lg ${
                  expirada ? "text-red-200" : "text-white"
                }`}
              >
                {formatarData(proposta.validadeProposta)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Garantia</p>
              <p className="text-white font-bold text-lg">
                {proposta.garantia}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Projeto Details */}
            <div className="bg-white rounded-2xl p-10 shadow-xl">
              <div className="mb-8">
                <div className="w-16 h-16 bg-green-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Detalhes do Projeto
                </h2>
              </div>

              <div className="space-y-8">
                <div className="border-l-4 border-green-400 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cliente
                  </h3>
                  <p className="text-xl text-gray-700 font-medium">
                    {proposta.nomeCliente}
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Descrição do Projeto
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {proposta.projeto}
                  </p>
                </div>
              </div>
            </div>

            {/* Investment */}
            <div className="bg-white rounded-2xl p-10 shadow-xl">
              <div className="mb-8">
                <div className="w-16 h-16 bg-green-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Investimento
                </h2>
              </div>

              <div className="space-y-8">
                {/* Valor Total */}
                <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-xl p-8 text-center">
                  <p className="text-white/90 text-lg mb-2">
                    Valor Total do Projeto
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {formatarMoeda(proposta.valorTotal)}
                  </p>
                </div>

                {/* Formas de Pagamento */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Formas de Pagamento
                  </h3>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-800 font-semibold text-lg">
                          PIX
                        </p>
                        <p className="text-green-600 text-sm">
                          10% de desconto
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-green-800">
                        {proposta.valorPix}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 font-semibold text-lg">
                          Cartão de Crédito
                        </p>
                        <p className="text-gray-600 text-sm">
                          Até 12x sem juros
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {proposta.valorCartao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para começar seu projeto?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Entre em contato conosco para validar esta proposta e dar início
              ao desenvolvimento do seu projeto.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wa.me/5511999999999"
                className="bg-white text-green-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-2xl">📱</span>
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:contato@webuilder.com"
                className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <span className="text-2xl">📧</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <span className="text-2xl font-bold text-white">WEBuilder</span>
            </div>

            <p className="text-gray-400 text-lg mb-4">
              Desenvolvimento Web Profissional
            </p>
            <p className="text-gray-500 mb-6">
              Transformando ideias em realidade digital
            </p>

            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                Proposta válida até {formatarData(proposta.validadeProposta)}
              </p>
              <p className="text-gray-600 text-xs mt-2">
                © 2024 WEBuilder. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
