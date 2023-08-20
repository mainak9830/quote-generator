import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import awsExports from '../src/aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
