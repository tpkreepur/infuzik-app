import AuthForm from '@/components/auth/AuthForm';

export default function SignIn() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif">Welcome Back</h1>
          <p className="mt-2 premium-text">
            Sign in to access your personalized experience
          </p>
        </div>
        <AuthForm mode="signin" />
      </div>
    </main>
  );
}
