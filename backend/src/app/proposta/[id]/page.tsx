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

  const isExpirada = (dataExpiracao: string) => {
    return new Date() > new Date(dataExpiracao);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <div className="text-[#1a1a1a] text-xl font-medium">
            Carregando sua proposta...
          </div>
        </div>
      </div>
    );
  }

  if (error || !proposta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <img
                src="/images/Logo Horizontal.png"
                alt="WEBuilder Logo"
                className="h-12 w-auto"
              />
            </div>

            {/* CTA Button */}
            <button className="bg-[#D2F547] text-[#1a1a1a] px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#bfdf2f] transition-all duration-300 shadow-lg hover:shadow-xl">
              Garantir Oferta
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-white text-xl mb-8 font-medium">
            Olá, {proposta.nomeCliente}! Esta é sua
          </p>

          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-none">
              PROPOSTA
            </h1>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
              COMERCIAL
            </h2>
          </div>

          {/* Info Cards */}
          <div className="mb-12 space-y-4">
            <div className="text-white text-lg">
              <span className="font-semibold">DATA DE ENVIO:</span>{" "}
              {formatarData(proposta.dataProposta)}
            </div>
            <div className="text-white text-lg">
              <span className="font-semibold">VALIDADE:</span> 7 Dias
            </div>
          </div>

          {/* Main CTA */}
          <button className="bg-[#D2F547] text-[#1a1a1a] px-12 py-4 rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-[#bfdf2f] transition-all duration-300 shadow-lg hover:shadow-xl mb-16">
            Garantir Oferta
          </button>

          {/* Trust Badges */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#D2F547] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#1a1a1a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Compra Segura
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#D2F547] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#1a1a1a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Satisfação Garantida
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#D2F547] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#1a1a1a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">
                Privacidade Protegida
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
