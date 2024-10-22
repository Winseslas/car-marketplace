'use client';

import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import "./index.css";
import "./utils/I18nConfig";

// Import the layouts
import RootLayout from './layouts/root-layout';
import DashboardLayout from './layouts/dashboard-layout';

// Import the components
import IndexPage from './pages/index';
import ContactPage from './pages/contact';
import DashboardPage from './pages/dashboard';
import InvoicesPage from './pages/dashboard.invoices';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import Profile from './pages/user/profile';
import MyListing from "./components/MyListing";
import Favorites from "./components/Favorites";
import Billing from "./components/Billing";
import CreateCar from "./components/CreateCar";

type RootComponentProps = object

interface RootComponentState {
  router: ReturnType<typeof createBrowserRouter>;
}

class RootComponent extends Component<object, RootComponentState> {
  constructor(props: RootComponentProps) {
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
            { path: '/forgot-password/*', element: <ForgotPasswordPage /> },
            {
              path: '/profile/*',
              element: <Profile />,
              children: [
                { path: '', element: <Navigate to="my-listing" replace /> },
                { path: 'my-listing', element: <MyListing /> },
                { path: 'favorites', element: <Favorites /> },
                {
                  path: 'settings',
                  element: (<div>
                    <div className="bg-white p-4 text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow"
                      style={{ backgroundColor: '#e6edf7' }}>
                      <div className="overflow-hidden">
                        <div className="w-[565px] md:w-full text-start text-sm font-light text-surface dark:text-white">
                          <div className="flex items-center justify-between border-gray-200 px-4 py-3 sm:px-6">
                            <p className="text-2xl font-bold">Settings</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)
                },
                { path: 'billing', element: <Billing /> },
                { path: 'create-car', element: <CreateCar /> },
              ],
            },
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
