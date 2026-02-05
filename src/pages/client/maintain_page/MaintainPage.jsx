import { Card } from "antd";
import React from "react";

export default function MaintainPage() {
  return (
    // <div className="h-screen w-screen flex items-center justify-center">
    //   <Card style={{ width: "90%", maxWidth: 638 }}>
    //     <div className="flex flex-col gap-4 h-full">
    //       <h3 className="text-xl font-bold text-center">Thông báo bảo trì</h3>
    //       <p className="text-center">TẠM ĐÓNG WEBSITE CỦA OTAKIME</p>
    //       <p>
    //         Vì lí do bảo trì và nâng cấp, chúng mình xin phép tạm ngưng cung cấp
    //         website Otakime. Các bạn sẽ không thể truy cập, bao gồm truyện và
    //         phim phát hành trên Otakime.
    //       </p>
    //       <p>Website sẽ được mở và tiếp tục hiển thị sau 31/1/2024.</p>
    //       <p className="italic">Chúng mình xin lỗi vì sự bất tiện này.</p>
    //     </div>
    //   </Card>
    // </div>
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <h1>Thông báo ngừng hoạt động</h1>
        <h2>ĐÓNG WEBSITE CỦA OTAKIME</h2>
        <p>
          Vì lí do bảo trì và nâng cấp, chúng mình xin phép ngừng hoạt động
          website Otakime kể từ ngày 10/2/2025. Các bạn sẽ không thể truy cập,
          bao gồm truyện và phim phát hành trên Otakime.
        </p>
        <p>
          Mọi thông báo mới nhất về website sẽ được cập nhật trên trang <a href="https://www.facebook.com/Otakime3.0">Facebook của Otakime.</a>
        </p>
        <p>Chúng mình xin lỗi vì sự bất tiện này và cảm ơn các bạn đã ủng hộ.</p>
      </Card>
    </div>
  );
}
