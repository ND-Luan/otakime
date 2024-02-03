import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table } from "antd";
import { useContext } from "react";
import UploadImageContext from "../UploadImageContext";

function TableUploadImage() {
  const context = useContext(UploadImageContext);
  const {
    dataTable,
    isLoadingTable,
    setIsModalChapter,
    setIsModalImage,
    setDataImage,
    loadMangaChapter,
    loadManga,
    setDataMangaObj,
  } = context;

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Tên manga",
      dataIndex: "nameManga",
    },

    {
      title: "Ảnh Main",
      dataIndex: "imgMain",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Ảnh Cover Desktop",
      dataIndex: "imgCoverDesktop",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Ảnh Cover Mobile",
      dataIndex: "imgCoverMobile",
      render: (text, record, index) => <Image src={text} width={100} />,
    },
    {
      title: "Thao tác",
      align: "right",
      render: (text, record, index) => {
        return (
          <Space wrap>
            <Button
              onClick={() => {
                loadMangaChapter(record);
                setDataMangaObj(record);
                setIsModalChapter(true);
              }}
              icon={<UploadOutlined />}
            >
              Chapter
            </Button>
            <Button
              onClick={() => {
                setIsModalImage(true);
                loadManga(record);
                setDataImage(record);
              }}
              icon={<UploadOutlined />}
            >
              Ảnh bìa
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={dataTable}
      columns={columns}
      loading={isLoadingTable}
      rowKey="id"
    />
  );
}
export default TableUploadImage;
