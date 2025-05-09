import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import { createClient } from '@supabase/supabase-js'

const ButtonForward: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    loading?: boolean;
    secondary?: boolean;
  }
> = ({ disabled, children, secondary }, ref) => {
  return (
    <button
      ref={ref}
      className={[
        styles.button,
        secondary ? styles.secondarybutton : undefined,
      ].join(" ")}
      onClick={async () => {
        const supabase = createClient('https://ddxszckemjhsxlgnwvjq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkeHN6Y2tlbWpoc3hsZ253dmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NTA3OTMsImV4cCI6MjA2MjMyNjc5M30.3n2QWJiAn9uvFWKTJFm0XMWPMo3I_6Mm8_q8kmKmgCI')
        if (!supabase) {
          console.error('Supabase client is not initialized')
          return
        }
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        console.log('Supabase data:', data)
        if (error) {
          console.error('Error logging in with Google:', error)
        } else {
          console.log('Redirecting to Google login...')
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonForward);
