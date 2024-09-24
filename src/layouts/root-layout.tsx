import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { frFR, enUS } from '@clerk/localizations';
import { LanguageProvider, LanguageContext } from '../components/LanguageContext';
import './../App.css';

const PUBLISHABLE_KEY: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

/**
 * A root layout component that handles Clerk auth and routing.
 *
 * @returns The JSX for the root layout.
 */
export default function RootLayout(): JSX.Element {
  const navigate = useNavigate();

  return (
    <LanguageProvider>
      <LanguageContext.Consumer>
        {(value) => {
          const { language } = value as { language: string };
          return (
            <ClerkProvider
              routerPush={(to: string) => navigate(to)}
              routerReplace={(to: string) => navigate(to, { replace: true })}
              publishableKey={PUBLISHABLE_KEY}
              localization={language === 'fr' ? frFR : enUS} 
            >
              <header className="header">
                <div>
                  <div>
                    <p>Clerk + React + React Router App</p>
                  </div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <Link to="/sign-in">Sign In</Link>
                  </SignedOut>
                </div>
              </header>
              <main>
                <Outlet />
              </main>
            </ClerkProvider>
          );
        }}
      </LanguageContext.Consumer>
    </LanguageProvider>
  );
}