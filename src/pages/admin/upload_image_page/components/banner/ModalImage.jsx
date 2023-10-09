import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  Row,
  Switch,
  Upload,
  message,
} from "antd";
import { useContext, useState } from "react";
import {
  updateDocument,
  uploadFile,
} from "../../../../../services/firebaseService";
import UploadImageContext from "../../UploadImageContext";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function ModalImage() {
  const context = useContext(UploadImageContext);
  const { isModalImage, setIsModalImage, dataImage, loadManga } = context;
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleChangeCover = ({ fileList: newFileList }) =>
    setFileList2(newFileList);
  const handleChangeIndex = ({ fileList: newFileList }) =>
    setFileList3(newFileList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file) => {
    if (file.imgUrl) {
      return window.open(file.imgUrl);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Modal
      title={`Sửa ảnh bìa ${dataImage?.nameManga}`}
      open={isModalImage}
      onCancel={() => setIsModalImage(false)}
      onOk={() => form.submit()}
      width={768}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);

          const urlMain = await uploadFile(
            values.imgMain[0].originFileObj,
            `manga/${dataImage.nameManga}/logo/${values.imgMain[0].name
              .toString()
              .padStart(2, "0")}`
          );

          const urlCover = await uploadFile(
            values.imgCover[0].originFileObj,
            `manga/${dataImage.nameManga}/logo/${values.imgCover[0].name
              .toString()
              .padStart(2, "0")}`
          );

          const params = {
            ...dataImage,
            imgCover: urlCover,
            imgMain: urlMain,
          };
          console.log(params);
          setIsLoading(false);
          updateDocument("manga", dataImage.id, params)
            .then(() => {
              message.success("Cập nhật ảnh bìa thành công!");
              loadManga();
              setIsModalImage(false);
            })
            .finally(() => setIsLoading(false));
        }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              name="imgMain"
              label="imgMain"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ${label}",
                },
              ]}
            >
              <Upload
                multiple
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChangeCover}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="imgCover"
              label="imgCover"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ${label}",
                },
              ]}
            >
              <Upload
                multiple
                fileList={fileList2}
                onPreview={handlePreview}
                onChange={handleChangeIndex}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={8}>
            <Form.Item
              name="isImgIndex"
              label="Trang bìa"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="imgIndex"
              label="imgIndex"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                multiple
                fileList={fileList3}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                customRequest={dummyRequest}
                className="upload-list-inline"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </Modal>
  );
}
export default ModalImage;
