// .\src\components\sections\PricingContent.tsx
'use client';
import Script from 'next/script';
import * as React from 'react';

export default function PricingContent() {
  // State to manage loading/rendering of the Stripe table
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    // Ensure this runs only on the client side
    setIsClient(true);
  }, []);

  return (
    // Add styling for centering and width if needed
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-charcoal dark:text-platinum mb-8">
        Choose Your Plan
      </h2>
      {isClient && ( // Conditionally render Stripe component on client
        <>
          <Script async src="https://js.stripe.com/v3/pricing-table.js" />
          <stripe-pricing-table
            pricing-table-id="prctbl_1RBdLdRwjsjk6b5zBnebrq4t"
            publishable-key="pk_live_51QkAHfRwjsjk6b5z8Xr8FzlpXxg3hyMJjEZ5BErMlSHqw52aZOtM8qNljetH17QcOg7AW4aPQcjtpeAy2BaahNJE00QLuNRy44" // Replace with your actual Key
          />
        </>
      )}
      {!isClient && ( // Optional: Show a placeholder while loading
        <div className="text-center p-10 text-gray-500">Loading pricing...</div>
      )}
    </div>
  );
}
