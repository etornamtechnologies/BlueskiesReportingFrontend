import { Breadcrumb, Col, Row } from "antd"
import AppLayout from "../../layout"
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem"
import useAuth from "../../hooks/useAuth"



const DashboardIndex: React.FC = () => {
  useAuth()

  return (
    <AppLayout>
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        <iframe
          title="Dashboard"
          src="http://localhost:8088/login?token=1234abcd456&next=/superset/dashboard/9?standalone=3"
          width="100%"
          height="800px"
          sandbox="allow-same-origin allow-scripts"
          frameBorder="0"
        ></iframe>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default DashboardIndex