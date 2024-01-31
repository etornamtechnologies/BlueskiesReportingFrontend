import { InfoCircleFilled } from '@ant-design/icons'
import { Button, Col, Modal, Row } from 'antd'
import React from 'react'

type Props = {
  open: boolean
  okBtnText?: string
  cancelBtnText?: string
  onOk: ()=> void
  onCancel: () => void
  title: string
  description: string
  loading?: boolean
}

const ConfirmModal: React.FC<Props> = ({
  open,
  okBtnText = 'OK',
  cancelBtnText = 'CANCEL',
  description,
  title,
  onOk,
  onCancel,
  loading = false
}) => {

  return (
    <Modal
      open={open}
      footer={false}
      onCancel={onCancel}
      onOk={onOk}
      title={(
        <>
          <InfoCircleFilled style={{ color: '#fbbc52' }} /><span style={{ marginLeft: 20 }}>{title}</span> 
        </>
      )}
    >
      <Row>
        <Col span={24}>
          <span> { description } </span>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button style={{ marginRight: 10 }} onClick={onCancel}>{cancelBtnText}</Button>
          <Button loading={loading} onClick={onOk}>{okBtnText}</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default ConfirmModal