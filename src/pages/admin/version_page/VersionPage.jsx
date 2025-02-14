import { Steps } from "antd";
import React from "react";
const description = "This is a description.";
export default function VersionPage() {
  return (
    <div>
      <Steps
        direction="vertical"
        current={1}
        items={[
          {
            title: "Version 1.0.0",
            description: (
              <div>
                <p>Xây dựng giao diện client và admin</p>
                <p>CRUD Manga và Movie</p>
                <p>CRUD Category</p>
                <p>Upload ảnh</p>
              </div>
            ),
          },
          {
            title: "Version 1.0.1",
            description: (
              <div>
                <p>Thêm version project trong admin</p>
              </div>
            ),
          },
          {
            title: "Waiting",
            description,
          },
        ]}
      />
    </div>
  );
}
