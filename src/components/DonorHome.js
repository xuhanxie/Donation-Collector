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
    Popconfirm
} from "antd";
import {
    LeftCircleFilled,
    RightCircleFilled,
    InfoCircleOutlined,
    DeleteOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import {getItemById, getItemsByDonor,deleteItem} from "../utils";
import UploadItem from "./UploadItem";

const { TabPane } = Tabs;

class ItemList extends React.Component {
    state = {
        loading: false,
        items: []
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true
        });

        try {
            const resp = await getItemById(this.props.itemsId);
            this.setState({
                items: resp
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
        const { loading, items } = this.state;

        return (
            <List
                loading={loading}
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Text>Item Name: {item.name}</Text>} //backend
                            description={
                                <>
                                    <Text>Item Category: {item.category}</Text>
                                    <br />
                                    <Text>Item Description: {item.description}</Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    }
}

class ViewItemsButton extends React.Component {
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
        const { modalVisible } = this.state;

        const modalTitle = `Items of ${item.name}`;

        return (
            <>
                <Button onClick={this.openModal} shape="round">
                    View Item
                </Button>
                {modalVisible && (
                    <Modal
                        title={modalTitle}
                        centered={true}
                        visible={modalVisible}
                        closable={false}
                        footer={null}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <ItemList stayId={item.id} />
                    </Modal>
                )}
            </>
        );
    }
}

class RemoveItemButton extends React.Component {
    state = {
        loading: false
    };

    handleRemoveItem = async () => {
        const { item, onRemoveSuccess } = this.props;
        this.setState({
            loading: true
        });

        try {
            await deleteItem(item.id);
            onRemoveSuccess();
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
                title="Are you sureï¼Ÿ"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
                <Button
                    loading={this.state.loading}
                    onClick={this.handleRemoveItem}
                    //danger={true}
                    //shape="round"
                    //type="primary"
                    style={{ border: "none" }}
                    size="large"
                    icon={<DeleteOutlined />}
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
        data: []//[]{id: 1, name: "backend item name" }
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true
        });

        try {
            const resp = await getItemsByDonor();
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
                            actions={[<ViewItemsButton item={element} />]}
                            extra={
                                <RemoveItemButton
                                    item={element}
                                    onRemoveSuccess={this.loadData}
                                />
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
        );
    }
}

class DonorHome extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                <TabPane tab="My Item" key="1">
                    <MyItems />
                </TabPane>
                <TabPane tab="Upload Item" key="2">
                    <UploadItem />
                </TabPane>
            </Tabs>
        );
    }
}

export default DonorHome;