import { Breadcrumb, Col, Row } from "antd"
import AppLayout from "../../layout"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"

const DashboardIndex: React.FC = () => {
  return (
    <AppLayout>
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default DashboardIndex