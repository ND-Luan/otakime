import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Switch,
  Upload,
  message,
} from "antd";
import moment from "moment/moment";
import { useContext, useState } from "react";
import { SelectTag } from "../../../../components";
import Config from "../../../../config";
import { addDocument, uploadFile } from "../../../../services/firebaseService";
import MangaPageContext from "../MangaPageContext";

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

function ModalAddManga(props) {
  const context = useContext(MangaPageContext);
  const { isShowModalAdd, setIsShowModalAdd, loadManga } = context;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [fileListMain, setFileListMain] = useState([]);
  const [fileListCover, setFileListCover] = useState([]);

  const handleChangeMain = ({ fileList: newFileList }) =>
    setFileListMain(newFileList);
  const handleChangeCover = ({ fileList: newFileList }) =>
    setFileListCover(newFileList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
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
      title="Thêm manga"
      open={isShowModalAdd}
      onCancel={() => setIsShowModalAdd(false)}
      okText="Lưu"
      cancelText="Đóng"
      onOk={() => form.submit()}
      width={1000}
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        onFinish={async (values) => {
          setIsLoading(true);
          values.updateAt = moment(values.updateAt).format(Config.dateFormat);

          values.imgMainUrl = await uploadFile(
            values.imgMainFile[0].originFileObj,
            `manga/${values.nameManga}/imgBanner/${values.imgMainFile[0].name}`
          );
          values.imgCoverUrl = await uploadFile(
            values.imgCoverFile[0].originFileObj,
            `manga/${values.nameManga}/imgBanner/${values.imgCoverFile[0].name}`
          );
          //Truyền base64 vào trong File

          values.imgMainFile[0].imgUrl = values.imgMainUrl;
          values.imgCoverFile[0].imgUrl = values.imgCoverUrl;

          // values.imgMainFile = JSON.stringify(values.imgMainFile);
          // values.imgCoverFile = JSON.stringify(values.imgCoverFile);
          values.chapter = []; //Tạo trường chapter cho manga
          // console.log(values);
          async function fetchImageAndConvertToFile(imageUrl) {
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();

              // Tạo đối tượng File từ blob
              const file = new File([blob], "imageName.jpg", {
                type: "image/jpeg",
              });

              return file;
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          }

          const imageUrl =
            "https://firebasestorage.googleapis.com/v0/b/test-54333.appspot.com/o/manga%2Fadasd%2FimgBanner%2FBECK10_000(2).jpg?alt=media&token=c0e4e2b1-30e6-4578-93f6-2cf24a3f5f64";

          fetchImageAndConvertToFile(imageUrl).then(async (file) => {
            if (file) {
              console.log("Converted image to File:", await getBase64(file));
              // Sử dụng file theo nhu cầu của bạn, ví dụ: upload vào Firestore hoặc lưu trữ
            }
          });

          setIsLoading(false);
          // addDocument(`manga`, values)
          //   .then((data) => {
          //     setIsLoading(false);
          //     message.success(
          //       <span>
          //         Thêm manga <b>{values.nameManga}</b> thành công!
          //       </span>
          //     );
          //     loadManga();
          //   })
          //   .finally(() => setIsShowModalAdd(false));
        }}
      >
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="nameManga"
              label="Tên manga"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="nameMangaVie"
              label="Tên manga (Việt)"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="otherName"
              label="Tên khác"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Tác giả"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <Input placeholder="" allowClear></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Thể loại"
              required
              rules={[
                {
                  validator: (_, value) => {
                    if (value && value.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Vui lòng chọn thể loại");
                  },
                },
              ]}
              validateTrigger={["onChange"]} // Validate on tag selection change
            >
              <SelectTag
                onChange={(e) =>
                  form.setFieldsValue({
                    tags: e,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="updateAt"
              label="Ngày cập nhật"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ${label}",
                },
              ]}
            >
              <DatePicker
                format={Config.dateFormat}
                className="w-full"
                placeholder="Chọn ngày cập nhật"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="isStatusManga"
          label="Trạng thái"
          valuePropName="checked"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <Switch
            unCheckedChildren="Không hoạt động"
            checkedChildren="Hoạt động"
          ></Switch>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ${label}",
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="" allowClear></Input.TextArea>
        </Form.Item>
        <Row align="middle" gutter={[12, 12]}>
          <Col span={8}>
            <Form.Item
              name="imgMainFile"
              label="imgMainFile"
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
                listType="picture-card"
                fileList={fileListMain}
                onPreview={handlePreview}
                onChange={handleChangeMain}
                maxCount={1}
                customRequest={dummyRequest}
              >
                {fileListMain.length === 0 ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="imgCoverFile"
              label="imgCoverFile"
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
                listType="picture-card"
                fileList={fileListCover}
                onPreview={handlePreview}
                onChange={handleChangeCover}
                maxCount={1}
                customRequest={dummyRequest}
              >
                {fileListCover.length === 0 ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
          </Col>
          {/* <Col span={8}>
            <Form.Item
              name="imgIndex"
              label="imgIndex"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                listType="picture-card"
                fileList={fileListIndex}
                onPreview={handlePreview}
                onChange={handleChangeIndex}
                maxCount={1}
                customRequest={dummyRequest}
              >
                {fileListIndex.length === 0 ? (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                ) : null}
              </Upload>
            </Form.Item>
          </Col> */}
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
export default ModalAddManga;
