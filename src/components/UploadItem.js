import React from "react";
import { Form, Input, InputNumber, Button, message,TreeSelect} from "antd";
import { uploadItem } from "../utils"; //upload item

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

class UploadItem extends React.Component {
    state = {
        loading: false
    };

    fileInputRef = React.createRef();

    handleSubmit = async (values) => {
        const formData = new FormData();
        const { files } = this.fileInputRef.current;

        if (files.length > 5) {
            message.error("You can at most upload 5 pictures.");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("donor", values.donor);
        formData.append("weight", values.weight);

        this.setState({
            loading: true
        });
        try {
            await uploadItem(formData);
            message.success("upload successfully");
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
            <Form
                {...layout}
                name="nest-messages"
                onFinish={this.handleSubmit}
                style={{ maxWidth: 1000, margin: "auto" }}
            >
                <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Food',
                                value: 'Food',

                            },
                            {
                                title: 'Clothes',
                                value: 'Clothes',
                            },
                            {
                                title: 'Electronics',
                                value: 'Electronics',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item name="donor" label="Donor" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="weight"
                    label="Weight"
                    rules={[{ required: true, type: "number", min: 0 }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="picture" label="Image" rules={[{ required: true }]}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={this.fileInputRef}
                        multiple={true}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default UploadItem;