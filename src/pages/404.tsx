export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Không tìm thấy trang</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Quay về trang chủ
            </a>
        </div>
    );
}