'use client';

import React, { useState, useEffect } from 'react';
import { getUser, fetchSales, addSale } from '@/app/utils/userUtils';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';

const Profile2Page = () => {
  const [user, setUser] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [newSaleName, setNewSaleName] = useState('');
  const [newSaleDescription, setNewSaleDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadSales = async (userId: string) => {
    try {
      const userSales = await fetchSales(userId);
      setSales(userSales);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      if (currentUser) {
        await loadSales(currentUser.id);
      }
    };
    initUser();
  }, []);

  const handleCreateSale = async () => {
    if (user && newSaleName) {
      try {
        await addSale(user.id, newSaleName, newSaleDescription);
        await loadSales(user.id);  // Reload the sales list
        setNewSaleName('');
        setNewSaleDescription('');
        setIsDialogOpen(false);
      } catch (error) {
        console.error('Error creating sale:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription className="text-lg">{user?.email || 'Guest'}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="w-full max-w-md mx-auto mb-4">
        <CardHeader>
          <CardTitle>Your Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {sales.map((sale) => sale && (
              <Link href={`/sales/${sale.id}`} key={sale.id}>
                <div className="mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <h3 className="font-semibold">{sale.name}</h3>
                  <p className="text-sm text-gray-500">{sale.description}</p>
                </div>
              </Link>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full max-w-md mx-auto block">Create New Sale</Button>
        </DialogTrigger>
        <DialogContent className="bg-white bg-opacity-90 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Sale</DialogTitle>
            <DialogDescription className="text-lg">
              Enter the details for your new sale.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={newSaleName} 
                onChange={(e) => setNewSaleName(e.target.value)} 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Input 
                id="description" 
                value={newSaleDescription} 
                onChange={(e) => setNewSaleDescription(e.target.value)} 
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateSale}>Create Sale</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile2Page;