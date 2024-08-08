'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from "@/lib/supabase";

const SalePage = () => {
  const params = useParams();
  const [sale, setSale] = useState<any>(null);

  useEffect(() => {
    const fetchSale = async () => {
      const { data, error } = await supabase
        .from('sale')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching sale:', error);
      } else {
        setSale(data);
      }
    };

    fetchSale();
  }, [params.id]);

  if (!sale) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{sale.name}</h1>
      <p className="text-lg mb-4">{sale.description}</p>
      {/* Add more sale details here */}
    </div>
  );
};

export default SalePage;