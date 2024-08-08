'use client';

import React, { useState, useEffect } from 'react';
import { getUser, fetchSales } from '@/app/utils/userUtils';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';

const Profile2Page = () => {
  const [user, setUser] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    const initUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      if (currentUser) {
        const userSales = await fetchSales(currentUser.id);
        setSales(userSales);
      }
    };
    initUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hi {user?.email || 'Guest'}</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Your Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {sales.map((sale) => (
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
    </div>
  );
};

export default Profile2Page;