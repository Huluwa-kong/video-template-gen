'use client';

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { Sun } from 'lucide-react';
import { LoadingIcon } from '@/src/components/Icons'


export default function Nav() {
  // todo: highlight current page route
  // todo: handle login status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  return <nav className="flex justify-between items-center h-[64px]  bg-white shadow px-[128px] text-sm
">
    <div className="flex items-center space-x-8">
      <div className="font-bold">Logo</div>
      <div className="flex items-center space-x-8 text-gray-700">
        <a href="#" className="hover:text-black">Home</a>
        <a href="#" className="hover:text-black">Components</a>
        <a href="#" className="hover:text-black">Pricing</a>
        <a href="#" className="hover:text-black">Contact</a>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <Sun className="mr-[16px]" />
      {
        user ? <Image
          src={user.user_metadata?.avatar_url || '/default-avatar.png'}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        /> : <Button className="px-[8px] py-[4px]" onClick={async () => {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });
          if (error) {
            console.error('Error logging in with Google:', error)
          } else {
            console.log('Redirecting to Google login...')
          }
        }}>Sign in <LoadingIcon loading={loading} /></Button>
      }

    </div>
  </nav>
}