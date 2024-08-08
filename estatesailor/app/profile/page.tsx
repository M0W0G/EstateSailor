'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getUser, fetchSales, addSale, addItem } from '@/app/utils/userUtils';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [selectedSale, setSelectedSale] = useState<string>('');
  const [saleName, setSaleName] = useState('');
  const [saleDescription, setSaleDescription] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      if (currentUser) {
        try {
          const salesData = await fetchSales(currentUser.id);
          setSales(salesData);
        } catch (error) {
          setMessage(`Error fetching sales: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    };
    initUser();
  }, []);

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        setMessage('Error: User not authenticated');
        return;
      }

      await addSale(user.id, saleName, saleDescription);
      setMessage('Sale added successfully!');
      setSaleName('');
      setSaleDescription('');
      const updatedSales = await fetchSales(user.id);
      setSales(updatedSales);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        setMessage('Error: User not authenticated');
        return;
      }

      if (!selectedSale) {
        setMessage('Error: Please select a sale');
        return;
      }

      await addItem(selectedSale, itemName, itemDescription);
      setMessage('Item added successfully!');
      setItemName('');
      setItemDescription('');
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      
      <h2>Add New Sale</h2>
      <form onSubmit={handleSaleSubmit}>
        <label>Sale Name:</label>
        <input type="text" value={saleName} onChange={(e) => setSaleName(e.target.value)} />
        <label>Sale Description:</label>
        <input type="text" value={saleDescription} onChange={(e) => setSaleDescription(e.target.value)} />
        <button type="submit">Add Sale</button>
      </form>

      <h2>Add Item to Sale</h2>
      <select value={selectedSale} onChange={(e) => setSelectedSale(e.target.value)}>
        <option value="">Select a sale</option>
        {sales.map((sale) => (
          <option key={sale.id} value={sale.id}>{sale.name}</option>
        ))}
      </select>
      <form onSubmit={handleItemSubmit}>
        <label>Item Name:</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <label>Item Description:</label>
        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
      
      <p>{message}</p>
    </div>
  );
};

export default ProfilePage;