import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'; // Ant Design
import { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentInitialProps } from 'next/document';

const MyDocument = () => (
    <Html lang="en">
        <Head>
            {/* Thêm các meta tag hoặc link nếu cần */}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export const getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    // Tạo cache cho Ant Design
    const antDesignCache = createCache();

    // Tạo cache (hoặc xử lý CSS riêng) cho HeroUI nếu cần
    // HeroUI thường không yêu cầu xử lý đặc biệt, nhưng nếu cần, bạn có thể tạo cache tương tự.

    const originalRenderPage = ctx.renderPage;

    // Ghi đè renderPage để bọc ứng dụng với StyleProvider của Ant Design
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={antDesignCache}>
                    <App {...props} />
                </StyleProvider>
            ),
        });

    // Lấy các props ban đầu
    const initialProps = await ctx.defaultGetInitialProps(ctx);

    // Trích xuất style từ cache của Ant Design
    const antDesignStyle = extractStyle(antDesignCache, true);

    // HeroUI có thể sử dụng CSS thông qua Tailwind hoặc các file CSS tĩnh (không cần xử lý đặc biệt).
    // Nếu HeroUI cần xử lý CSS riêng, bạn có thể thêm logic tương tự ở đây.

    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                {/* CSS của Ant Design */}
                <style dangerouslySetInnerHTML={{ __html: antDesignStyle }} />
                {/* Nếu HeroUI cần thêm CSS, bạn có thể thêm các style khác tại đây */}
            </>
        ),
    };
};

MyDocument.getInitialProps = getInitialProps;

export default MyDocument;
