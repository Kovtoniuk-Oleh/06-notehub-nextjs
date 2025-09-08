import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'NoteHub — простір, де думки набувають форми',
  description: 'Manage your notes efficiently',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/icon-192x192.png',
    other: [{ rel: 'icon', url: '/icon-512x512.png', sizes: '512x512' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* fallback favicon for older browsers */}
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
      </head>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
