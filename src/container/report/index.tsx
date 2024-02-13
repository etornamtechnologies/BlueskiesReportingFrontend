import { Breadcrumb, Col, Row } from "antd"
import AppLayout from "../../layout"

const ReportIndex: React.FC = () => {

  return (
    <AppLayout
      header={(
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <Breadcrumb.Item>
                REPORT
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      )}
    >
      
    </AppLayout>
  )
}

export default ReportIndex