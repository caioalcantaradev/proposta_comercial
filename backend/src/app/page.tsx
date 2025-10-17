import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">WEBuilder</h1>
        <p className="text-gray-300 text-lg mb-8">
          Sistema de Propostas Comerciais
        </p>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-md">
          <h2 className="text-xl font-semibold text-white mb-4">
            API Endpoints
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <span className="bg-green-400 text-gray-900 px-2 py-1 rounded text-xs font-mono">
                GET
              </span>
              <code className="text-gray-300 text-sm">/api/propostas</code>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-blue-400 text-white px-2 py-1 rounded text-xs font-mono">
                POST
              </span>
              <code className="text-gray-300 text-sm">/api/propostas</code>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-green-400 text-gray-900 px-2 py-1 rounded text-xs font-mono">
                GET
              </span>
              <code className="text-gray-300 text-sm">/api/propostas/[id]</code>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-red-400 text-white px-2 py-1 rounded text-xs font-mono">
                DELETE
              </span>
              <code className="text-gray-300 text-sm">/api/propostas/[id]</code>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-600">
            <p className="text-gray-400 text-sm mb-4">Acesse uma proposta:</p>
            <Link
              href="/proposta/exemplo"
              className="inline-block bg-green-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-green-300 transition-colors"
            >
              Ver Exemplo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
