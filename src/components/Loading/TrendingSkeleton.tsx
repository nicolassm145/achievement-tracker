import React from 'react';

export const TrendingSkeleton: React.FC = () => {
  return (
    <section className="items-center">
      <h2 className="mb-2 text-2xl font-bold opacity-50">
        <div className="skeleton h-8 w-40" />
      </h2>
      <div className="mb-6 text-center font-medium opacity-50">
        <div className="skeleton h-4 w-64" />
      </div>

      <div className="carousel carousel-center max-w-full space-x-4 p-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="carousel-item w-40">
            <div className="flex flex-col items-center space-y-2">
              {/* esqueleto da imagem */}
              <div className="skeleton h-56 w-40 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
