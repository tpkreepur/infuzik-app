'use client';

export default function Contact() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <section className="w-full max-w-md bg-white dark:bg-charcoal rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-charcoal dark:text-platinum mb-6">
          Contact Us
        </h1>
        <p className="text-charcoal dark:text-platinum mb-4">
          We would love to hear from you! Please fill out the form below with
          your inquiries.
        </p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2"
            required
          />
          <textarea
            placeholder="Your Message"
            className="border border-charcoal/30 dark:border-platinum/30 rounded-lg p-2 h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gold text-white rounded-lg py-2 hover:bg-gold-dark transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
