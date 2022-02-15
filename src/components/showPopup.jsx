import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

function ShowPopUp() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Select Wallet
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Walltet 1</p>
        <p>Walltet 1</p>
      </Modal>
    </>
  );
}

export default ShowPopUp;
