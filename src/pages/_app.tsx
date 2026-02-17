import '../app/globals.css'; // CSS toàn cục

import 'antd/dist/reset.css'; // CSS của Ant Design
import '../styles/client.css'; // CSS của Tailwind (client)

import AdminLayout from '@/components/admin/admin_layout';
import ClientLayout from '@/components/client/client_layout';


import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps, router }: AppProps) {

  // Kiểm tra nếu là trang admin
  if (router.pathname.startsWith('/admin')) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  }
  if (router.pathname.startsWith('/auth/login')) {
    console.log('Đang ở trang login');
    return (
      <Component {...pageProps} />
    );
  }

  if (router.pathname.startsWith('/auth/register')) {
    console.log('Đang ở trang login');
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