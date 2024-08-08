'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";
import { fetchItems, addItem } from '@/app/utils/userUtils';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react'; // Import the ArrowLeft icon

const SalePage = () => {
  const params = useParams();
  const router = useRouter(); // Add this line to use the router
  const [sale, setSale] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        loadItems(data.id);
      }
    };

    fetchSale();
  }, [params.id]);

  const loadItems = async (saleId: string) => {
    try {
      const saleItems = await fetchItems(saleId);
      setItems(saleItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleCreateItem = async () => {
    if (sale && newItemName) {
      try {
        await addItem(sale.id, newItemName, newItemDescription);
        await loadItems(sale.id);
        setNewItemName('');
        setNewItemDescription('');
        setIsDialogOpen(false);
      } catch (error) {
        console.error('Error creating item:', error);
      }
    }
  };

  if (!sale) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Button 
        onClick={() => router.push('/profile2')} 
        className="mb-4"
        variant="outline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
      </Button>

      <h1 className="text-3xl font-bold mb-4">{sale.name}</h1>
      <p className="text-lg mb-4">{sale.description}</p>
      
      <Card className="w-full max-w-md mx-auto mb-4">
        <CardHeader>
          <CardTitle>Your Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {items.map((item) => item && (
              <div key={item.id} className="mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full max-w-md mx-auto block">Create New Item</Button>
        </DialogTrigger>
        <DialogContent className="bg-white bg-opacity-90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Item</DialogTitle>
            <DialogDescription className="text-lg">
              Enter the details for your new item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={newItemName} 
                onChange={(e) => setNewItemName(e.target.value)} 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input 
                id="description" 
                value={newItemDescription} 
                onChange={(e) => setNewItemDescription(e.target.value)} 
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateItem}>Create Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalePage;