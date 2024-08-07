"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (loginData) {
        console.log(loginData);
        router.push('/'); // Redirect to homepage
      }

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center mt-10">
        <form onSubmit={login} className="grid gap-4">
          <div className="grid">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}