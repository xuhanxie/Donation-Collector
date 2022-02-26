import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Form, Space, Button, Checkbox, message, Card } from "antd";
import { login } from "../utils";

class LoginForm extends React.Component {
    formRef = React.createRef();
    state = {
        asNGO: false,
        loading: false,
    };

    onFinish = () => {
        console.log("finish form");
    };

    handleLogin = async () => {
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
            const { asNGO } = this.state;
            const resp = await login(formInstance.getFieldsValue(true), asNGO);
            this.props.handleLoginSuccess(resp.token, asNGO);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleCheckbox = (e) => {
        this.setState({
            asNGO: e.target.checked,
        });
    };

    render() {
        return (
            // <div
            //   style={{
            //     width: 450,
            //     margin: "200px auto",
            //     display: "flex",
            //     justifyContent: "center",
            //   }}
            // >
            <Card className="login-card" title={"Join us!"}>
                {/* <div className="login-shadow"> */}
                <Form ref={this.formRef} onFinish={this.onFinish}>
                    {/* email */}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            disabled={this.state.loading}
                            prefix={<UserOutlined />}
                            placeholder="Username"
                        />
                    </Form.Item>

                    {/* password */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            disabled={this.state.loading}
                            prefix={<LockOutlined />}
                            placeholder="Password"
                        ></Input.Password>
                    </Form.Item>
                </Form>
                <Space>
                    <Checkbox
                        disabled={this.state.loading}
                        checked={this.state.asNGO}
                        onChange={this.handleCheckbox}
                    >
                        As NGO
                    </Checkbox>

                    <Button
                        onClick={this.handleLogin}
                        disabled={this.state.loading}
                        shape="round"
                        type="danger"
                    >
                        Log In
                    </Button>
                </Space>
                {/* </div> */}
            </Card>

            // </div>
        );
    }
}

export default LoginForm;
