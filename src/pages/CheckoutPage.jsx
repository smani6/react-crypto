import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Spin,
  Button,
  Row,
  Col,
  Select,
  Image,
  Alert,
  Typography,
  Avatar,
} from "antd";
import { ethers } from "ethers";
import {
  AudioOutlined,
  HeartOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import logo from "../images/visa-logo-full-blue.png";
import CoinbaseWallet from "../images/coinbase-wallet.png";
import MyEtherWallet from "../images/my-ether-wallet.png";
import MetaMaskPayout from "../components/MetaMaskPayout";
import ShowPopUp from "../components/showPopup";
import { Modal, Checkbox } from "antd";
import ErrorMessage from "../components/ErrorMessage";
import TxList from "../components/TxList";
const { Title } = Typography;

const { Search } = Input;
const { Header, Content, Footer } = Layout;

const { Option } = Select;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const style = { background: "#0092ff", padding: "8px 0" };
const productsArray = [
  {
    name: "Basics Polo TShirt",
    imageIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rNQnaq91cWupLJJuU3aKgRMqv1beFeAoMg&usqp=CAU",
    size: "XL, Color : Blue",
    brand: "Basics",
    price: "$15",
    width: "90px",
  },
  {
    name: "Classic TShirt Harajuku Punk High Quality",
    imageIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJRNiyPrcimc_Wwwo_vjcVy5z6bbLrqMfYviZoMvk4M_2FsHaKHyr2QnG80yC5FjybQ9U&usqp=CAU",
    size: "XL, Color : Grey",
    brand: "Punk",
    price: "$10",
    width: "90px",
  },
  {
    name: "Bluetooth Speakers",
    imageIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEr_JnDQzfkX7Nw9_Cwp1dXw1y55JmS_0JFw&usqp=CAU",
    size: "Color : Black",
    brand: "Anker",
    price: "$25",
    width: "120px",
  },
  {
    name: "XioMi Mi TV Stick",
    imageIcon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdkOyt0fFhGRIdM8w_f2-URAP2K7EOkxuEg&usqp=CAU",
    size: "Color : Blue",
    brand: "XioMi",
    price: "$30",
    width: "120px",
  },
];

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

const delay = 1;

function CheckoutPage() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMetaMaskSection, setShowMetaMaskSection] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [showEhereumConversion, setShowEhereumConversion] = useState(false);
  const [showBitcoinConversion, setShowBitcoinConversion] = useState(false);
  const [showPaymentConfirmationSection, setShowPaymentConfirmationSection] =
    useState(false);
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: "0.00002",
      addr: "0xe9b44B01d341485a2729B5d701704127873DDda7",
    });
    setShowPaymentConfirmationSection(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = () => {
    console.log("In OnClick");
    // setShowMetaMaskSection(!showMetaMaskSection);
    setIsModalVisible(true);
  };

  const connectToMetaMask = async ({}) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = provider.getNetwork();
      if (network) {
        // setShowSpinner(true);
        // console.log("Show Spinner :: " + showSpinner);
        setTimeout(function () {
          setIsModalVisible(false);
          setShowCoins(true);
          // setShowSpinner(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEthereumSelection = () => {
    setShowEhereumConversion(!showEhereumConversion);
  };

  const onBitcoinSelection = () => {
    setShowBitcoinConversion(!showBitcoinConversion);
  };

  return (
    <>
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
              <Title>Checkout Page</Title>
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
            <div>
              <Row gutter={16} style={{ margin: "0 auto", width: "90%" }}>
                {showPaymentConfirmationSection && txs && txs.length != 0 && (
                  <Row
                    style={{
                      marginTop: "40px",
                      width: "70%",
                      margin: "0 auto",
                    }}
                  >
                    <Col span={24}>
                      <Alert
                        message="Payment Success"
                        description={<TxList txs={txs} />}
                        type="success"
                        showIcon
                      />
                    </Col>
                  </Row>
                )}

                <Col
                  className="gutter-row"
                  span={16}
                  style={{
                    border: "1px solid grey",
                    marginTop: "20px",
                    padding: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Row gutter={16} className="product-list-header">
                    <Col span={14}>PRODUCT</Col>
                    <Col span={4}>QUANTITY</Col>
                    <Col span={3}>PRICE</Col>
                  </Row>

                  {productsArray.map((product) => {
                    return (
                      <Row gutter={16} style={{ padding: "20px 0" }}>
                        <Col span={14}>
                          <Row>
                            <Col span={6}>
                              <Image
                                width={product["width"]}
                                src={product["imageIcon"]}
                              />
                            </Col>
                            <Col span={18}>
                              <Row>
                                <Col
                                  style={{
                                    fontSize: "16px",
                                    paddingBottom: "0 0 10px 0",
                                  }}
                                >
                                  {product["name"]}
                                </Col>
                              </Row>
                              <Row>
                                <Col style={{ fontSize: "12px" }}>
                                  Size: {product["size"]}
                                </Col>
                              </Row>
                              <Row>
                                <Col style={{ fontSize: "12px" }}>
                                  Brand: {product["brand"]}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={4}>
                          <Select defaultValue="1" style={{ width: 120 }}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                          </Select>
                        </Col>
                        <Col span={3}>{product["price"]}</Col>
                        <Col span={1}>
                          <HeartOutlined />
                        </Col>
                        <Col span={2}>
                          <DeleteOutlined />
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    border: "1px solid grey",
                    marginTop: "20px",
                    padding: "10px",
                    marginLeft: "20px",
                    borderRadius: "6px",
                  }}
                >
                  <Row
                    style={{ fontSize: "20px", justifyContent: "center" }}
                    className="product-list-header"
                  >
                    Total Price
                  </Row>

                  <Row
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      fontFamily:
                        "Helvetica, inherit Arial, sans-serif !important",
                    }}
                  >
                    <Col span={24}>
                      <Row>
                        <Col span={16}>Sub Total Price: </Col>
                        <Col span={8}>USD 80</Col>
                      </Row>

                      <Row style={{ marginTop: "10px" }}>
                        <Col span={16}>Delivery: </Col>
                        <Col span={8}>USD 5</Col>
                      </Row>

                      <Row style={{ marginTop: "10px" }}>
                        <Col span={16}>Total Price: </Col>
                        <Col span={8}>USD 85</Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    {" "}
                    <Button type="primary" block>
                      {" "}
                      We Accept
                    </Button>{" "}
                  </Row>

                  <Row style={{ marginTop: "20px" }}>
                    <Col style={{ width: "90px", marginTop: "10px" }}>
                      <Icon icon="logos:visa" width="64" />{" "}
                    </Col>
                    <Col style={{ width: "90px" }}>
                      <Icon icon="logos:mastercard" width="64" />{" "}
                    </Col>
                    <Col style={{ width: "90px" }}>
                      <Icon icon="fontisto:american-express" width="64" />{" "}
                    </Col>
                    <Col style={{ width: "90px" }} className="show-metamask">
                      <a
                        href="javascript:void(0)"
                        onClick={() => handleClick()}
                      >
                        {/* <Icon icon="logos:metamask" width="128" height="64" />{" "} */}
                        <Icon
                          icon="fontisto:wallet"
                          width="48"
                          color="darkblue"
                        />
                      </a>
                    </Col>
                  </Row>
                  {
                    <Modal
                      title="Select Wallet"
                      visible={isModalVisible}
                      onCancel={handleCancel}
                    >
                      <Row>
                        <a href="javascript:void(0)">
                          {" "}
                          <Image
                            width={200}
                            src={CoinbaseWallet}
                            preview={false}
                          />{" "}
                        </a>
                      </Row>
                      <Row>
                        {" "}
                        <a href="javascript:void(0)">
                          {" "}
                          <Image
                            width={200}
                            src={MyEtherWallet}
                            preview={false}
                          />{" "}
                        </a>
                      </Row>
                      <Row style={{ paddingLeft: "10px" }}>
                        <a
                          href="javascript:void(0)"
                          onClick={() => connectToMetaMask(true)}
                        >
                          {" "}
                          <Icon
                            icon="logos:metamask"
                            width="180"
                            height="80"
                          />{" "}
                        </a>
                      </Row>
                    </Modal>
                  }

                  {showCoins && (
                    <Row
                      style={{ marginTop: "40px" }}
                      className="payment-section"
                    >
                      <Row style={{ fontWeight: "400" }}>
                        {" "}
                        Please select a Payment Coin matching with Merchant
                        Payment
                      </Row>
                      <Row style={{ padding: "20px 10px" }}>
                        <Col span={12}>
                          {" "}
                          <Checkbox onChange={onBitcoinSelection}>
                            <span style={{ fontSize: "16px" }}>Bitcoin </span>
                          </Checkbox>{" "}
                        </Col>
                        <Col span={12}>
                          {" "}
                          <Checkbox onChange={onEthereumSelection}>
                            <span style={{ fontSize: "16px" }}>Ethereum</span>
                          </Checkbox>{" "}
                        </Col>
                      </Row>

                      <Row style={{ marginTop: "20px" }}>
                        {(showEhereumConversion || showBitcoinConversion) && (
                          <Row>
                            <Row>
                              {" "}
                              {showEhereumConversion &&
                                "Amount to be Paid in ETH : 0.0002"}
                              {showBitcoinConversion &&
                                "Amount to be Paid in BTC : 0.00001"}
                            </Row>
                            <Row style={{ width: "100%" }}>
                              <form
                                className="m-4"
                                onSubmit={handleSubmit}
                                style={{ width: "100%" }}
                              >
                                <footer className="p-4">
                                  <button
                                    type="submit"
                                    className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                                  >
                                    Pay now
                                  </button>
                                  <ErrorMessage message={error} />
                                </footer>
                              </form>
                            </Row>
                          </Row>
                        )}
                      </Row>
                    </Row>
                  )}

                  {showMetaMaskSection && <MetaMaskPayout />}
                </Col>
              </Row>
            </div>

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
                  tip="Fetching Details..."
                ></Spin>{" "}
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Visa Design ©2018 Created by Visa
        </Footer>
      </Layout>
    </>
  );
}

export default CheckoutPage;
