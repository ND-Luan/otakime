import { Button, Col, Input, Row, Select, Space, Table } from "antd";
import { useEffect } from "react";

export default function MangaPage() {
    
    useEffect(() => {

    }, []);

    return <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col>
                <Input placeholder="Search by title or author" style={{ width: 300 }} />
            </Col>
            <Col>
                <Input placeholder="Search by title or author" style={{ width: 300 }} />
            </Col>
            <Col>
                <Select placeholder="Select status" style={{ width: 200 }} />
            </Col>
            <Col>
                <Button type="primary">Search</Button>
            </Col>
        </Row>
        <Table>
            <Table.Column title="Title" dataIndex="title" key="title" />
            <Table.Column title="Author" dataIndex="author" key="author" />
            <Table.Column title="Status" dataIndex="status" key="status" />
            <Table.Column title="Published Date" dataIndex="publishedDate" key="publishedDate" />
        </Table>
    </Space>
}