
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-error/10 rounded-lg">
      <div className="flex items-start gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-error shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="font-bold text-xl text-error">Erro ao carregar jogo</h3>
          <p className="py-2 text-error-content">{message}</p>
          <button 
            className="btn btn-error mt-4"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}