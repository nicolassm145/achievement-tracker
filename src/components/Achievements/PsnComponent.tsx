import React, { useEffect, useState } from 'react';

const PsnComponent: React.FC = () => {
  const [error ,setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento que falha após 5 segundos
    const timer = setTimeout(() => {
      console.log(error);
      setError('Falha ao carregar títulos PSN.');
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 mt-10">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="text-sm font-semibold">Carregando títulos PSN...</span>
      </div>
    );
  }

  // Se chegou aqui, deu erro
  return (
    <div className="flex items-center mt-10 gap-2 text-red-500">
     
      <span className="text-sm font-semibold">Falha ao carregar títulos PSN.</span>
    </div>
  );
};

export default PsnComponent;
