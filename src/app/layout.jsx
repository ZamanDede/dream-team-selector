// src/app/layout.jsx
import './globals.css'; // Import the global CSS here
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Marvel Dream Team Selector',
  description: 'Build your dream team from Marvel characters',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar will be rendered here */}
        <header>
          <Navbar />
        </header>
        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
