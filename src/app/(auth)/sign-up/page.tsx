import AuthForm from '@/components/auth/AuthForm';

export default function SignUp() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif">Begin Your Journey</h1>
          <p className="mt-2 premium-text">
            Create your account to unlock premium features
          </p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
