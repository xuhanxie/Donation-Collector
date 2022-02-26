import {
  message,
  Tabs,
  List,
  Card,
  Image,
  Carousel,
  Button,
  Tooltip,
  Space,
  Modal,
  Menu,
  Dropdown,
} from "antd";
import {
  LeftCircleFilled,
  RightCircleFilled,
  InfoCircleOutlined,
  PlusOutlined,
  GiftOutlined,
  SkinOutlined,
  WifiOutlined
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import {useState} from 'react';
//
// getReservationsByItem
import { searchCatagory, addItemToCart} from "../utils";

const { TabPane } = Tabs;


const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to collecting cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};


export class ItemDetailInfoButton extends React.Component {
  state = {
      modalVisible: false
  };

  openModal = () => {
      this.setState({
          modalVisible: true
      });
  };

  handleCancel = () => {
      this.setState({
          modalVisible: false
      });
  };

  render() {
      const { item } = this.props;
      const { name, description, address, weight} = item;
      const { modalVisible } = this.state;
      return (
          <>
              <Tooltip title="View Item Details">
                  <Button
                      onClick={this.openModal}
                      style={{ border: "none" }}
                      size="large"
                      icon={<InfoCircleOutlined />}
                  />
              </Tooltip>
              {modalVisible && (
                  <Modal
                      title={name}
                      centered={true}
                      visible={modalVisible}
                      closable={false}
                      footer={null}
                      onCancel={this.handleCancel}
                  >
                      <Space direction="vertical">
                          <Text strong={true}>Description</Text>
                          <Text type="secondary">{description}</Text>
                          <Text strong={true}>Address</Text>
                          <Text type="secondary">{address}</Text>
                          <Text strong={true}>Weight</Text>
                          <Text type="secondary">{weight}</Text>
                      </Space>
                  </Modal>
              )}
          </>
      );
  }
}

class MyItems extends React.Component {
  state = {
    loading: false,
    category:["food", "clothes", "electronics"],
    data: []
  };

  // componentDidMount() {
  //   this.loadData();
  // }

  loadData = async (category) => {
    this.setState({
      loading: true
    });

    try {
      const resp = await searchCatagory(category);
      this.setState({
        data: resp
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  handleButtonClick = (e) => {
    message.info("Click on right button.");
    console.log("click right button", e);
  }
  handleMenuClick =(e) => {
    console.log(e);
    if (e.key === "food") {
      console.log(e.key);
      this.loadData(this.state.category[0]);
    }
    else if (e.key === "clothes") {
      console.log(e.key);
      this.loadData(this.state.category[1]);
    }
    else if (e.key === "electronics") {
      console.log(e.key);
      this.loadData(this.state.category[2]);
    }
  }
  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="food" icon={<GiftOutlined />} >
        Food
      </Menu.Item>
      <Menu.Item key="clothes" icon={<SkinOutlined />}>
        Clothes
      </Menu.Item>
      <Menu.Item key="electronics" icon={<WifiOutlined />}>
        Electronics
      </Menu.Item>
    </Menu>
  );
  render() {
    return (
      <>
      <Dropdown.Button onClick={this.handleButtonClick} overlay={this.menu}>
              Categories
      </Dropdown.Button>
      <List className="donationList"
        loading={this.state.loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        dataSource={this.state.data}
        renderItem={(element) => (
          <List.Item>
            <Card
              key={element.id}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {element.name}
                  </Text>
                  <ItemDetailInfoButton item={element} />
                </div>
              }
              // actions={[<ViewReservationsButton item={element} />]}
              extra={
                <AddToCartButton itemId={element.id} />
              }
            >
              {
                <Carousel
                  dots={false}
                  arrows={true}
                  prevArrow={<LeftCircleFilled />}
                  nextArrow={<RightCircleFilled />}
                >
                  {element.images.map((image, index) => (
                    <div key={index}>
                      <Image src={image.url} width="100%" />
                    </div>
                  ))}
                </Carousel>
              }
            </Card>
          </List.Item>
        )}
      />
      </>
    );
  }
}

class NGOMainPage extends React.Component {

  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Donation Items" key="1">
          <MyItems />
        </TabPane>
        <TabPane tab="Cart" key="2"></TabPane>
      </Tabs>
      // <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
      //   <TabPane tab="Donation Items" key="1">
      //     <MyItems />
      //   </TabPane>
      //   <TabPane tab="Cart" key="2">
      //     <MyItems />
      //   </TabPane>
      // </Tabs>
    );
  }
}

export default NGOMainPage;
