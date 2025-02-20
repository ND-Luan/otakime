import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import theme from '@/theme/themeConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
}