import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function Footer() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/total/`)
      .then(response => response.json())
      .then(data => {
        if (data && typeof data === 'object') {
          setStats([
            { id: 1, name: 'Disponibles y validadas', value: `${data.total_tiendas} Tiendas` },
            { id: 2, name: 'Registrados y activados', value: `${data.total_usuarios} Usuarios` },
            { id: 3, name: 'Compras realizadas', value: `${data.total_facturas}` },
          ]);
        } else {
          console.error('Error fetching data: Data is not an object');
        }
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`py-28 sm:pb-16 ${loading ? 'opacity-0 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'}`}>
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-color_letra_oscura_clara">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-color_letra_blanca sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
