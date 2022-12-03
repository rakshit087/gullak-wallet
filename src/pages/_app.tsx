import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { SWCProvider } from '../contexts/SWCContext';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <SWCProvider>
          <Component {...pageProps} />
        </SWCProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
