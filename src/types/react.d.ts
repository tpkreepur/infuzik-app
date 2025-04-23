// filepath: src/react.d.ts
import * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Add the stripe-pricing-table element
      'stripe-pricing-table': React.DetailedHTMLProps<
        // It accepts standard HTML attributes
        React.HTMLAttributes<HTMLElement> & {
          // Define specific attributes used by the element
          'pricing-table-id': string;
          'publishable-key': string;
        },
        // It's an HTMLElement
        HTMLElement
      >;
    }
  }
}
