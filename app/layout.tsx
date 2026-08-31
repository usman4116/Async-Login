import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'AetherSync — Authentication Portal',
  description: 'Sign in to AetherSync Desktop with Clerk Auth',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey="pk_test_bXV0dWFsLWdhemVsbGUtNjIzNC5jbGVyay5hY2NvdW50cy5kZXYk"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#f97316',
          colorBackground: '#0d0d11',
          colorInputBackground: '#141419',
          colorInputText: '#ffffff',
          borderRadius: '0.75rem',
        },
      }}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
