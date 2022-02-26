import React from "react";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import SignupForm from "./components/SignupForm";
import {Dropdown, Button, Menu} from "antd";
import { UserOutlined } from "@ant-design/icons";
import DonorHome from "./components/DonorHome";
import NGOMainPage from "./components/NGOMainPage";

class App extends React.Component {
  state = {
    authed: false,
    asNGO: false,
  };

  componentDidMount() {
    //check the existence of token in local storage
    const authToken = localStorage.getItem("authToken");
    const asNGO = localStorage.getItem("asNGO") === "true";
    this.setState({
      authed: authToken !== null,
      asNGO,
    });
  }

  renderLoginContent = () => {
    if (!this.state.authed) {
      return <LoginForm handleLoginSuccess={this.handleLoginSucces}/>;
    }

    if (this.state.asNGO) {
      return <NGOMainPage/>;
    }

    return <DonorHome/>;
  };

  handleLoginSucces = (token, asNGO) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asNGO", asNGO);
    this.setState({authed: true, asNGO});
  };
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };
  userMenu = (
      <Menu>
        <Menu.Item key="logout" onClick={this.handleLogOut}>
          Log Out
        </Menu.Item>
      </Menu>
  );

  render() {
    let logoUrl =
        "https://lh3.googleusercontent.com/kR336RQiLl2T5YPjI24kCQUP8FfsSkCY0CVoMsPpC62hBam0qHQ-qyKtcsmlaxep2FiFKgE9mkw9axkxCIKa_Xt0JDNMEbzTACuiE9YXYzPdaNPYQB65os9dfPjY7RH2kbVikD7Vkw=w2400";
    return (
        <>
          <header className="App-header">
            <div className="header">
              <div className="slogan">
                <img src={logoUrl} className="logo" height={70} width={80}/>
                <div className="title">Donations</div>
              </div>
              {!this.state.authed && (
                  <div className="signUp-div">
                    <SignupForm/>
                  </div>
              )}
              {
                this.state.authed && (
                    <div>
                      <Dropdown trigger="click" overlay={this.userMenu} style={{marginTop: 20}}>
                        <Button icon={<UserOutlined/>} shape="circle"/>
                      </Dropdown>
                    </div>
                )
              }
            </div>
          </header>
          <div className="loginForm">{this.renderLoginContent()}</div>

          <Footer/>
        </>
    );
  }
}
export default App;