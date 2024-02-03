import { Col, Row, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../../services/firebaseService";

import {
  CardBackgroundImage,
  CardImage,
  SkeletionMovie,
  TopBarFilterClientView,
} from "../../../components";
function MangaPageClient() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments("manga")
      .then((manga) => {
        setData(manga);
        document.title = `Otakime - Manga`;
        const el = document.querySelector("meta[name='description']");
        el.setAttribute(
          "content",
          "Đọc ngay những tựa truyện được Việt hóa chất lượng bởi Otakime."
        );
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  }, []);
  return (
    <Spin spinning={isLoading} tip="Đang tải dữ liệu...">
      {/* <div className="sm:pr-[15rem] sm:pl-[15rem] md:pr-[10rem] md:pl-[10rem] flex flex-col gap-4"></div> */}
      <div className="flex flex-col gap-4">
        <TopBarFilterClientView
          title="Truyện mới nhất"
          onChange={(value) => {
            console.log(value);
          }}
        />

        <Row gutter={[16, 16]}>
          {data.length === 0 ? (
            <>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <SkeletionMovie />
              </Col>
            </>
          ) : (
            data?.map((item, index) => {
              const ageClassification = item.ageClassification[0];
              return (
                <Col xs={12} sm={12} md={12} lg={12} xl={6} key={index}>
                  {item.imgMain ? (
                    <CardImage
                      to={`/manga/${item.urlManga}`}
                      src={item?.imgMain}
                      // title={item.nameManga}
                      isAgeClassification
                      ageClassification={ageClassification}
                      objectFit={"cover"}
                      height={"auto"}
                    />
                  ) : (
                    <CardBackgroundImage
                      to={`/manga/${item.urlManga}`}
                      src={item?.imgMain}
                      // title={item.nameManga}
                      isAgeClassification
                      ageClassification={ageClassification}
                    />
                  )}
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </Spin>
  );
}

export default MangaPageClient;
