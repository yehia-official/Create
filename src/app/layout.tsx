import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Quizzy | منصة الاختبارات الإلكترونية',
  description: 'A modern, flexible, and responsive online exam system designed to streamline academic assessments efficiently.',
  openGraph: {
    title: 'Quizzy | منصة الاختبارات الإلكترونية',
    description: 'A modern, flexible, and responsive online exam system designed to streamline academic assessments efficiently.',
    url: 'https://quizzy-app.com', // Replace with your actual domain
    siteName: 'Quizzy',
    images: [
      {
        url: '/og-image.png', // Using the local image you will upload
        width: 1200, // Recommended OG image width
        height: 630, // Recommended OG image height
        alt: 'Quizzy - Online Exam Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <FirebaseClientProvider>{children}</FirebaseClientProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
