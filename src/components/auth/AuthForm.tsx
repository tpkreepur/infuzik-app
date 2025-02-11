'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add auth logic here
    setIsLoading(false);
  };

  return (
    <div className="luxury-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded-md border border-platinum/20 bg-white/50 dark:bg-charcoal/50 focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full px-4 py-2 rounded-md border border-platinum/20 bg-white/50 dark:bg-charcoal/50 focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md border border-platinum/20 bg-white/50 dark:bg-charcoal/50 focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
        )}

        <Button
          variant="primary"
          className="w-full"
          type="submit"
          isLoading={isLoading}
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>

        <div className="text-center text-sm">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-gold hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link href="/sign-in" className="text-gold hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
