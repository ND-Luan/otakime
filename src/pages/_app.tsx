import '../styles/globals.css';

import 'antd/dist/reset.css'; // CSS của Ant Design
import '../styles/client.css'; // CSS của Tailwind (client)

import AdminLayout from '@/components/admin/admin_layout';
import ClientLayout from '@/components/client/client_layout';

import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  // Kiểm tra nếu là trang admin
  if (router.pathname.startsWith('/admin')) {
    return (
      <Component {...pageProps} />
    );
  }

  // Mặc định là client
  return (
    <ClientLayout>
      <Component {...pageProps} />
    </ClientLayout>
  );
}