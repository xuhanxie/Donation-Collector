import React from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Checkbox,
    Radio,
    Space,
} from "antd";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    CompassOutlined,
    ShoppingOutlined,
} from "@ant-design/icons";
import { signup } from "../utils";
const { Option } = Select;
class SignupForm extends React.Component {
    formRef = React.createRef();

    state = {
        //弹窗
        displayNGOModal: false,
        displayDonorModal: false,
        asNGO: false,
        loading: false,
    };

    ngoSignupOnclick = () => {
        this.setState({
            asNGO: true,
            displayNGOModal: true,
        });
    };
    donorSignupOnclick = () => {
        this.setState({
            displayDonorModal: true,
            asNGO: false
        });
    };

    handleCancel = () => {
        this.setState({
            displayNGOModal: false,
            displayDonorModal: false,
        });
    };

    onFinish = () => {
        this.setState({
            displayNGOModal: false,
            displayDonorModal: false,
        });

    };

    handleDonatorChange = () => {
        this.setState({
            asNGO: false,
        });
    };

    handleNGOChange = () => {
        this.setState({
            asNGO: true,
        });
    };

    handleSubmit = async () => {
        const formInstance = this.formRef.current;
        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            await signup(formInstance.getFieldsValue(true), this.state.asNGO);
            message.success("Sign Up Successfully!");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
        console.log(" submit");
    };

    // onFinish = (data) => {
    //   signup(data)
    //     .then(() => {
    //       this.setState({
    //         displayModal: false,
    //       });
    //       message.success(`Successfully Signed Up!`);
    //     })
    //     .catch((err) => {
    //       message.error(err.message);
    //     });
    // };

    // addNGO = () => {
    //   let x = document.getElementById("extraNgo");
    //   x.style.display = "block";
    // };

    // removeNGO = () => {
    //   let x = document.getElementById("extraNgo");
    //   x.style.display = "none";
    // };
    renderNGOSignUp = () => {
        return (
            <Form
                name="normal_signup"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                ref={this.formRef}
                // preserve={flase}
            >
                {/* email */}
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* password */}
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Please input your password!" },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* name */}
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Name"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* phone number */}
                <Form.Item
                    name="contact"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Phone Number"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* address */}
                <Form.Item
                    name="address"
                    rules={[
                        { required: true, message: "Please input your address!" },
                    ]}
                >
                    <Input
                        prefix={<HomeOutlined />}
                        placeholder="Address"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* extra ego info */}
                {/* <Form.List name="extraInfo">
              <Form.Item
                name="radio-button"
                label="Status"
                rules={[{ required: true, message: "Please pick one!" }]}
              >
                <Radio.Group>
                  <Radio value="Donator" onClick={this.removeNGO}>
                    Donator
                  </Radio>
                  <Radio value="NGO" onClick={this.addNGO}>
                    NGO
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <div name="extraNgo">
                <Form.Item>1</Form.Item>
                <Form.Item>2</Form.Item>
              </div>
            </Form.List> */}

                {/* preffered pick-up radius */}
                <Form.Item
                    name="distance"
                    rules={[
                        {
                            required: true,
                            message: "Please input preffered pick-up radius!",
                        },
                    ]}
                    label="Pick-up radius"
                >
                    <InputNumber
                        prefix={<CompassOutlined />}
                        // placeholder="Pick-up radius"
                        disabled={this.state.loading}
                        addonAfter="KM"
                        defaultValue={0}
                    />
                </Form.Item>
                <Form.Item
                    name="prefCategory"
                    rules={[
                        {
                            required: true,
                            message: "Please input preffered donation category!",
                        },
                    ]}
                    label="Preferred Category"
                >
                    <Select
                        placeholder="Select a category"
                        allowClear>
                        <Option value="food">Food</Option>
                        <Option value="clothes">Clothes</Option>
                        <Option value="electronics">Electronics</Option>
                    </Select>
                </Form.Item>

                {/* prefered pick-up weight */}
                <Form.Item
                    name="prefWeight"
                    rules={[
                        {
                            required: true,
                            message: "Please input preffered pick-up weight!",
                        },
                    ]}
                    label="Pick-up weight"
                >
                    <InputNumber
                        prefix={<ShoppingOutlined />}
                        // placeholder="Pick-up weight"
                        disabled={this.state.loading}
                        addonAfter="KG"
                        defaultValue={0}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    disabled={this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        )
    }
    renderDonorSignUp = () => {
        return (
            <Form
                name="normal_signup"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        disabled={this.state.loading}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Please input your password!" },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* name */}
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: "Please input your name!" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Name"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* phone number */}
                <Form.Item
                    name="contact"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined />}
                        placeholder="Phone Number"
                        disabled={this.state.loading}
                    />
                </Form.Item>

                {/* address */}
                <Form.Item
                    name="address"
                    rules={[
                        { required: true, message: "Please input your address!" },
                    ]}
                >
                    <Input
                        prefix={<HomeOutlined />}
                        placeholder="Address"
                        disabled={this.state.loading}
                    />
                </Form.Item>
                <Button
                    type="primary"
                    disabled={this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        )
    }
    render = () => {
        return (
            <>
                <Button type="danger" size={"medium"} onClick={this.ngoSignupOnclick}>
                    Sign Up As Ngo
                </Button>
                <Button type="danger" size={"medium"} onClick={this.donorSignupOnclick}>
                    Sign Up As Donor
                </Button>
                <Modal
                    title="SIGN UP"
                    visible={this.state.displayNGOModal}
                    onCancel={this.handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div>{this.renderNGOSignUp()}</div>
                </Modal>
                <Modal title="SIGN UP"
                       visible={this.state.displayDonorModal}
                       onCancel={this.handleCancel}
                       footer={null}
                       destroyOnClose={true}
                >
                    <div>{this.renderDonorSignUp()}</div>

                </Modal>
            </>
        );
    };
}

export default SignupForm;
