"use client"
import React from 'react';
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/products';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Signin = () => {
    return (
        <div className='w-[30%] mx-auto'>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
    )
}

export default Signin
