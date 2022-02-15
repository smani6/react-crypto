import React from "react";
import { Card, Avatar, Button, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CryptoAcceptance from "./CryptoAcceptance";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

const { Meta } = Card;

function MerchantDetails({ merchantDetails, onCryptoSave }) {
  const onSave = (mrchDetails, cryptAcceptance) => {
    console.log("In Mrch Details On Save Method");
    console.log("MerchantDetails :: " + JSON.stringify(mrchDetails));
    console.log("cryptAcceptance :: " + JSON.stringify(cryptAcceptance));

    mrchDetails["cryptoAcceptance"] = cryptAcceptance;
    console.log(
      "MerchantDetails After Update :: " + JSON.stringify(mrchDetails)
    );
    writeStorage("merchantDetails", mrchDetails);
  };
  return (
    <>
      <Row className="mrch-container">
        <Col span={6} className="mrch-card">
          <Card
            style={{ width: 320 }}
            cover={
              <img
                alt="example"
                padding="10px"
                width="100%"
                height="140px"
                src="data:image/png;base64,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"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <div className="mrch-details">
              <div className="label">Merchant Name: </div>
              <div>Amazon </div>
            </div>
            <div className="mrch-details">
              <div className="label">Merchant GMR ID: </div>
              <div>12345 </div>
            </div>
            <div className="mrch-details">
              <div className="label">Merchant Bank: </div>
              <div>Wells Fargo</div>
            </div>
            <div className="mrch-details">
              <div className="label">Merchant Pincode: </div>
              <div>400310 </div>
            </div>
            <div className="mrch-details">
              <div className="label">Merchant URL: </div>
              <div>https://amazon.com </div>
            </div>
          </Card>
        </Col>

        <Col span={12} className="mrch-card">
          <Card title="Crypto Acceptance" className="center">
            <div>
              <CryptoAcceptance
                mrchDetails={merchantDetails}
                onCryptoSave={onSave}
              />
            </div>
          </Card>
        </Col>
        <Col span={6} className="mrch-card">
          <Card
            style={{ width: 400 }}
            className="center"
            title="Merchant API Details"
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Row className="mrch-details">
              <Col className="label">Merchant Preference: </Col>
              <Col>Real Time</Col>
            </Row>
            <Row className="mrch-details">
              <Col className="label">Merchant Notification</Col>
              <Col>Enabled</Col>
            </Row>
            <Row className="mrch-details">
              <Col className="label">Merchant Service URL</Col>
              <Col>https://service.amazon.com</Col>
            </Row>
            <Row className="mrch-details">
              <Col className="label">Merchant Intent To Credit</Col>
              <Col>Yes</Col>
            </Row>
            <Row className="mrch-details">
              <Col className="label">Merchant Purchase Consent</Col>
              <Col>True</Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default MerchantDetails;
