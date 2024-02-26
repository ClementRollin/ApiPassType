import React, { useState, useEffect } from 'react';

const PassesViewer = () => {
  const [passesCount, setPassesCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPasses = async () => {
      const tenantId = "demo";
      const apiKey = "0L0pLvWByOnxU7weByZAjxhMfeIHv_r-oVZ2wgSvzK9c3ixgqoKG1ntNdLXACYoY";
      const url = `https://app.neostore.cloud/api/${tenantId}/passes`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-API-KEY": apiKey
          },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        // Calcul des compteurs pour chaque passType
        const counts = data.reduce((acc, pass) => {
          acc[pass.passType] = (acc[pass.passType] || 0) + 1;
          return acc;
        }, {});

        setPassesCount(counts);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPasses();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Passes List</h2>
      <ul>
        {Object.entries(passesCount).map(([passType, count], index) => (
          <li key={index}>{`${passType}: ${count}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PassesViewer;