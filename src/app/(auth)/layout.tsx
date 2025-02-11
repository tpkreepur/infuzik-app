export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-platinum to-white dark:from-charcoal dark:to-charcoal-dark min-h-screen">
      {children}
    </div>
  );
}
