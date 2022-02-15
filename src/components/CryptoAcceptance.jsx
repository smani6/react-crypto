import React, { useEffect } from "react";
import { Select } from "antd";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Icon from "react-crypto-icons";
import { Ada, Btc, Dgb, Doge, Etc, Eth, Sia } from "react-cryptocoins";
const { Option } = Select;

const coins = ["Shiba", "Ether", "Dogecoin", "Ada"];
const networkData = {
  Bitcoin: ["BlockChain", "Ethereum"],
  Ether: ["Ethereum"],
  Shiba: ["Ethereum", "Avalanche", "Solano"],
  Dogecoin: ["Solano"],
};

const coinToIconMap = {
  Bitcoin: <Btc color={"#f2a900"} />,
  Ether: <Eth />,
  Ada: <Ada />,
  Dogecoin: <Doge />,
  Shiba: <Sia />,
};

function CryptoAcceptance({ mrchDetails, onCryptoSave }) {
  const [merchantDetails, setMerchantDetails] = React.useState(
    mrchDetails[["cryptoAcceptance"]]
  );
  const [networks, setNetworks] = React.useState(networkData[coins[0]]);
  const [secondNetwork, setSecondNetwork] = React.useState(
    networkData[coins[0]][0]
  );

  const handleCoinChange = (value) => {
    setNetworks(networkData[value]);
    setSecondNetwork(networkData[value][0]);
  };

  const onSecondNetworkChange = (value) => {
    setSecondNetwork(value);
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values["cryptos"]);
    values["cryptos"].forEach((ele) => {
      let selectedCoin = ele["selectedCoin"];
      let walletAddress = ele["walletAddress"];
      console.log("Merchant Details :: " + JSON.stringify(merchantDetails));

      setMerchantDetails((preValue) => {
        return {
          ...preValue,
          [selectedCoin]: walletAddress,
        };
      });

      // setMerchantDetails((preValue) => {
      //   console.log(preValue); // { bitcoin : ['Blockchain'] }

      //   if (selectedCoin in preValue) {
      //     if (!(selectedNetwork in preValue[selectedCoin]))
      //       preValue[selectedCoin].push(selectedNetwork);
      //     return {
      //       ...preValue,
      //     };
      //   } else {
      //     return {
      //       ...preValue,
      //       [selectedCoin]: [selectedNetwork],
      //     };
      //   }
      // });
    });
  };

  useEffect(() => {
    onCryptoSave && onCryptoSave(mrchDetails, merchantDetails);
  }, [merchantDetails]);

  const onSave = () => {
    console.log(merchantDetails);
    onCryptoSave && onCryptoSave(merchantDetails);
  };

  return (
    <>
      <div>
        <div
          style={{
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          Configured Crypto Coins and Wallet Address
        </div>
        {merchantDetails &&
          Object.keys(merchantDetails).map((key, idx) => {
            let coinName = key;
            let walletAddr = merchantDetails[key];
            return (
              <Row className="mrch-details" key={idx}>
                <Col span={2}>
                  {idx + 1} {")"}{" "}
                </Col>
                <Col span={6} style={{ marginLeft: "20px" }}>
                  <Row>
                    <Col>{key} </Col>
                    <Col style={{ marginLeft: "40px" }}>
                      {
                        <span style={{ marginTop: "10px" }}>
                          {coinToIconMap[key]}
                        </span>
                      }
                    </Col>
                  </Row>
                </Col>
                <Col span={14}>{walletAddr}</Col>
              </Row>
            );
          })}
      </div>
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="cryptos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                      style={{ width: "100%" }}
                    >
                      <Row>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            name={[name, "selectedCoin"]}
                            style={{ width: "60%" }}
                          >
                            <Select
                              defaultValue={coins[0]}
                              style={{ width: 160 }}
                              // onChange={handleCoinChange}
                            >
                              {coins.map((coin) => (
                                <Option key={coin}>{coin}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={15} style={{ marginLeft: "10px" }}>
                          <Form.Item
                            {...restField}
                            name={[name, "walletAddress"]}
                            style={{ width: "100%" }}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Col>
                      </Row>

                      {/* <Form.Item {...restField} name={[name, "selectedNetwork"]}>
                      <Select
                        style={{ width: 160, marginLeft: "20px" }}
                        value={secondNetwork}
                        onChange={onSecondNetworkChange}
                      >
                        {networks.map((city) => (
                          <Option key={city}>{city}</Option>
                        ))}
                      </Select>
                    </Form.Item> */}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ background: "orange" }}
              >
                Add Crypto
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CryptoAcceptance;
