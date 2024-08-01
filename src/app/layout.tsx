// src/app/RootLayout.tsx
'use client';

import { ApolloProvider } from "@apollo/client";
import client from "../app/lib/apolloClient";
import { AuthProvider } from '../context/AuthContext';
import { SnackbarProvider } from "@/components/Snackbar";
import { Box, Hidden, Grid } from '@mui/material';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoutes';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body>
        <SnackbarProvider>
          <ApolloProvider client={client}>
            <AuthProvider>
              {isLoginPage ? (
                children
              ) : (
                <ProtectedRoute>
                  <Box sx={{ display: 'flex' }}>
                    <Hidden mdUp>
                      <Sidebar open={sidebarOpen} onClose={toggleSidebar} temporary />
                    </Hidden>
                    <Grid container={sidebarOpen && 'container'}>
                      <Hidden mdDown>
                        {sidebarOpen && <Grid item xs={2}>
                          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                        </Grid>}
                      </Hidden>
                      <Grid item xs={12} md={10}>
                        <Navbar onMenuClick={toggleSidebar} />
                        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                          {children}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </ProtectedRoute>
              )}
            </AuthProvider>
          </ApolloProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
