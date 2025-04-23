// filepath: src/app/pricing/page.tsx
import * as React from 'react';
import Script from 'next/script';

function PricingPage() {
  return (
    <div>
      <Script async src="https://js.stripe.com/v3/pricing-table.js" />
      <stripe-pricing-table
        pricing-table-id="prctbl_1RBdLdRwjsjk6b5zBnebrq4t"
        publishable-key="pk_live_51QkAHfRwjsjk6b5z8Xr8FzlpXxg3hyMJjEZ5BErMlSHqw52aZOtM8qNljetH17QcOg7AW4aPQcjtpeAy2BaahNJE00QLuNRy44"
      />
    </div>
  );
}

export default PricingPage;
