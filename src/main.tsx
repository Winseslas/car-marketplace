/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utils/I18nConfig";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './pages/index'
import ContactPage from './pages/contact'
import SignInPage from './pages/authentication/sign-in'
import SignUpPage from './pages/authentication/sign-up'
import DashboardPage from './pages/dashboard'
import InvoicesPage from './pages/dashboard.invoices'

interface RootComponentState {
  router: any;
}

class RootComponent extends Component<object, RootComponentState> {
  constructor(props: object) {
    super(props);

    this.state = {
      router: createBrowserRouter([
        {
          element: <RootLayout />,
          children: [
            { path: '/', element: <IndexPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '/sign-in/*', element: <SignInPage /> },
            { path: '/sign-up/*', element: <SignUpPage /> },
            {
              element: <DashboardLayout />,
              path: 'dashboard',
              children: [
                { path: '/dashboard', element: <DashboardPage /> },
                { path: '/dashboard/invoices', element: <InvoicesPage /> },
              ],
            },
          ],
        },
      ]),
    };
  }

  render() {
    return (
      <React.StrictMode>
        <React.Suspense fallback='loading...'>
          <RouterProvider router={this.state.router} />
        </React.Suspense>
      </React.StrictMode>
    );
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<RootComponent />);
}
