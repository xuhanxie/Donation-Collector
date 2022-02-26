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
  Popconfirm
} from "antd";
import {
  LeftCircleFilled,
  RightCircleFilled,
  InfoCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  GiftOutlined,
  SkinOutlined,
  WifiOutlined
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
//
// getReservationsByItem
import { searchCatagory, addToCart} from "../utils";

const { TabPane } = Tabs;

// class ReservationList extends React.Component {
//   state = {
//     loading: false,
//     items: []
//   };

//   componentDidMount() {
//     this.loadData();
//   }

//   loadData = async () => {
//     this.setState({
//       loading: true
//     });

//     try {
//       const resp = await getItems(this.props.stayId);
//       this.setState({
//         items: resp
//       });
//     } catch (error) {
//       message.error(error.message);
//     } finally {
//       this.setState({
//         loading: false
//       });
//     }
//   };

//   render() {
//     const { loading, items } = this.state;

//     return (
//       <List
//         loading={loading}
//         dataSource={items}
//         renderItem={(item) => (
//           <List.Item>
//             <List.Item.Meta
//               title={<Text>Item Name: {item.ngo.name}</Text>} //backend
//               description={
//                 <>
//                   <Text>description {item.ngo.description}</Text>
//                   <br />
//                   <Text>Category: {item.ngo.category}</Text>
//                   <br />
//                   <Text>Donor: {item.ngo.donor}</Text>
//                   <br />
//                   <Text>Weight: {item.ngo.weight}</Text>
//                 </>
//               }
//             />
//           </List.Item>
//         )}
//       />
//     );
//   }
// }

// class ViewReservationsButton extends React.Component {
//   state = {
//     modalVisible: false
//   };

//   openModal = () => {
//     this.setState({
//       modalVisible: true
//     });
//   };

//   handleCancel = () => {
//     this.setState({
//       modalVisible: false
//     });
//   };

//   render() {
//     const { item } = this.props;
//     const { modalVisible } = this.state;

//     const modalTitle = `Reservations of ${item.name}`;

//     return (
//       <>
//         <Button onClick={this.openModal} shape="round">
//           View Item
//         </Button>
//         {modalVisible && (
//           <Modal
//             title={modalTitle}
//             centered={true}
//             visible={modalVisible}
//             closable={false}
//             footer={null}
//             onCancel={this.handleCancel}
//             destroyOnClose={true}
//           >
//             {/* <ReservationList stayId={item.id} /> */}
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

class AddItemButton extends React.Component {
  state = {
    loading: false
  };

  handleAddItem = async () => {
    const { item, onAddSuccess } = this.props;
    this.setState({
      loading: true
    });

    try {
      await addToCart(item.id);
      onAddSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    return (
      <Popconfirm
        title="Are you sure？"
        icon={<QuestionCircleOutlined style={{ color: "green" }} />}
      >
        <Button
          loading={this.state.loading}
          onClick={this.handleAddItem}
          //danger={true}
          //shape="round"
          //type="primary"
          style={{ border: "none" }}
          size="large"
          icon={<PlusOutlined />}
        ></Button>
      </Popconfirm>
    );
  }
}
// onClick={this.openModal}
//             style={{ border: "none" }}
//             size="large"
//             icon={<InfoCircleOutlined />}

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
    const { name, description, category, donor, weight} = item; //guest_number->weight
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
              <Text strong={true}>Category</Text>
              <Text type="secondary">{category}</Text>
              <Text strong={true}>Donor</Text>
              <Text type="secondary">{donor}</Text>
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

  render() {
    return (
      <List
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
                <AddItemButton item={element} onAddSuccess={this.loadData} />
              }
            >
              {
                <Carousel
                  dots={false}
                  arrows={true}
                  prevArrow={<LeftCircleFilled />}
                  nextArrow={<RightCircleFilled />}
                >
                  {/* {item.images.map((image, index) => (
                    <div key={index}>
                      <Image src={image.url} width="100%" />
                    </div>
                  ))} */}
                </Carousel>
              }
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

// function handleButtonClick(e) {
//   message.info("Click on right button.");
//   console.log("click right button", e);
// }
// 1. 因为item在myitem里渲染，我的思路是在这个class里面再加三个状态，分别是food，cloth，electronic，
// click的时候通过handleMenuClick function改变相应状态，然后重新渲染对应的item，通过search Category。
// 具体实现的时候还是各种报错。
// function handleMenuClick(e) {
//   if (e.key === "food") {
    
//   }
//   else if (e.key === "clothes") {

//   }
//   else if (e.key === "electronics") {

//   }

// }

function handleButtonClick(e) {
  message.info("Click on right button.");
  console.log("click right button", e);
}


function handleMenuClick(e) {
  if (e.key === "food") {
    MyItems.loadData("food");
  }
  else if (e.key === "clothes") {
    MyItems.loadData("clothes");
  }
  else if (e.key === "electronics") {
    MyItems.loadData("electronics");
  }
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="food" icon={<GiftOutlined />}>
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



class NGOMainPage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Donation Items" key="1">
            <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
              Categories
            </Dropdown.Button>
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
