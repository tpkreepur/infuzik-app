'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // To show submission status

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default page reload
    setStatus('Sending...');

    // Simulate submission for demonstration
    console.log('Form Data:', { name, email, message });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    setStatus('Message sent successfully!'); // Update status
    // Optionally clear fields after successful submission
    // setName('');
    // setEmail('');
    // setMessage('');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // Removed 'space-between', added padding-top/bottom for spacing if needed
      className="flex flex-col items-center justify-center min-h-screen p-6 pt-20 pb-10" // Added pt-20 assuming fixed navbar
    >
      <section className="w-full max-w-md bg-white dark:bg-charcoal rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-charcoal dark:text-platinum mb-6">
          Contact Us
        </h1>
        <p className="text-charcoal dark:text-platinum mb-6 text-center">
          We would love to hear from you! Please fill out the form below.
        </p>
        {/* Add onSubmit handler to the form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name Input with Label */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-charcoal/80 dark:text-platinum/80 mb-1"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2 bg-white dark:bg-gray-700 focus:ring-gold focus:border-gold"
              required
            />
          </div>

          {/* Email Input with Label */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal/80 dark:text-platinum/80 mb-1"
            >
              Your Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2 bg-white dark:bg-gray-700 focus:ring-gold focus:border-gold"
              required
            />
          </div>

          {/* Message Textarea with Label */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-charcoal/80 dark:text-platinum/80 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2 h-32 bg-white dark:bg-gray-700 focus:ring-gold focus:border-gold"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'Sending...'} // Disable button while sending
            className="bg-gold text-white rounded-lg py-2 px-4 hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Submission Status Message */}
          {status && (
            <p
              className={`text-center text-sm ${
                status.includes('Failed') || status.includes('error')
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </section>
    </motion.section>
  );
}
