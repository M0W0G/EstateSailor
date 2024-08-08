
import { supabase } from "@/lib/supabase";

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const fetchSales = async (userId: string) => {
  const { data, error } = await supabase
    .from('sale')
    .select('id, name')
    .eq('account_id', userId)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }

  return data || [];
};

export const addSale = async (userId: string, saleName: string, saleDescription: string) => {
  const { data, error } = await supabase
    .from('sale')
    .insert([
      { 
        account_id: userId,
        name: saleName,
        description: saleDescription,
        is_active: true
      }
    ]);

  if (error) {
    console.error('Error adding sale:', error);
    throw error;
  }

  return data;
};

export const addItem = async (saleId: string, itemName: string, itemDescription: string) => {
  const { data, error } = await supabase
    .from('item')
    .insert([
      { 
        sale_id: saleId,
        name: itemName,
        description: itemDescription,
        is_active: true
      }
    ]);

  if (error) {
    console.error('Error adding item:', error);
    throw error;
  }

  return data;
};