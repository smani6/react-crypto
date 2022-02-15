import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Spin,
  Alert,
  Row,
  Col,
  Typography,
  Avatar,
  Button,
} from "antd";
import { AudioOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../images/visa-logo-full-blue.png";
import MerchantDetails from "../components/MerchantDetails";
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const delay = 1;

function MerchantOnboarding() {
  const [merchantDetails, setMerchantDetails] = useState({});
  const [showMrchDetails, setShowMrchDetails] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // call api
    // sleep for 10 secs // show spinner
    showMrchDetails && setShowSpinner(true);
    let timer1 = setTimeout(() => {
      setShowSpinner(false);
      setMerchantDetails({
        merchantName: "Amazon",
        merchantCity: "India",
        cryptoAcceptance: {
          Bitcoin: "0xe4008E32269D95A8945fC6A6EBB0B5e072735dF00",
        },
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [showMrchDetails]);

  const onCryptoSave = () => {};
  return (
    <Layout className="layout">
      <Header>
        <Row>
          <Col span={8} className="logo">
            <img src={logo} width="120px" height="60px" />
          </Col>

          <Col
            span={12}
            style={{ justifyContent: "center", marginTop: "20px" }}
          >
            <Title
              style={{
                fontSize: "28px",
                marginTop: "10px",
                marginLeft: "50px",
              }}
            >
              Merchant OnBoarding
            </Title>
          </Col>
          <Col span={2}>
            <Avatar
              style={{ lineHeight: "36px", marginTop: "10px" }}
              size={48}
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "10px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <div className="site-layout-content">
          <div style={{ margin: "0 auto", width: "600px", marginTop: "60px" }}>
            <Search
              placeholder="Enter GMR ID"
              enterButton="Retrive Details"
              size="large"
              suffix={suffix}
              onSearch={() => setShowMrchDetails(true)}
            />
          </div>

          {showMrchDetails && merchantDetails["merchantName"] && (
            <MerchantDetails
              merchantDetails={merchantDetails}
              onCryptoSave={onCryptoSave}
            />
          )}

          {/* <Row style={{ margin: "0 auto", width: "600px", marginTop: "60px" }}>
            <Button type="primary"> SAVE Details</Button>
          </Row> */}

          {showSpinner && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "inherit",
                marginTop: "10%",
              }}
            >
              <Spin
                style={{ flex: 1, alignSelf: "center" }}
                tip="Retrieving Merchant Details..."
              ></Spin>{" "}
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Vsa Design ©2018 Created by Visa
      </Footer>
    </Layout>
  );
}

export default MerchantOnboarding;
