'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [saleName, setSaleName] = useState('');
  const [saleDescription, setSaleDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage('Error: User not authenticated');
        return;
      }

      const { data, error } = await supabase
        .from('sale')
        .insert([
          { 
            account_id: user.id,
            name: saleName,
            description: saleDescription,
            is_active: true
          }
        ]);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Sale inserted successfully!');
        setSaleName('');
        setSaleDescription('');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleSaleSubmit}>
        <label>Name:</label>
        <input type="text" value={saleName} onChange={(e) => setSaleName(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={saleDescription} onChange={(e) => setSaleDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ProfilePage;