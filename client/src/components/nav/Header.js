import React, { useEffect, useState } from "react";
import { Menu, Badge, Avatar, Dropdown, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  SearchOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  HistoryOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import firebase from "firebase";
import Search from "../forms/Search";
import { cartReducer } from "../../reducers/CartReducer";
import Menubar from "./Menubar";

const { SubMenu, Item, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const [visible, setVisible] = useState(true);
  const [searchIcon, setSearchIcon] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  let { user, cart, search } = useSelector((state) => {
    return { ...state };
  });

  useEffect(() => {
    if (window.innerWidth < 700) {
      setSearchIcon(true);
    }
  }, [window.innerWidth]);

  const handleClick = (e) => {
    //        console.log(e.key)
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const menu = (
    <Menu>
      {user ? (
        <Item icon={<ProfileOutlined />}>{user.name}</Item>
      ) : (
        <Menu.Item key="1" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

      {!user ? null : (
        <Menu.Item key="2" onClick={logout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      )}
      {user && (
        <Item key="3" icon={<OrderedListOutlined />}>
          My Order
        </Item>
      )}

      {user && (
        <Item key="4" icon={<HistoryOutlined />}>
          My History
        </Item>
      )}
    </Menu>
  );

  const showSearchPage = () => {
    setVisible(!visible);
  };

  return (
    <>
    <div className="row " style={{background:"#1e4a73",textAlign:"center",height:"100px"}}>
      <div className="col">
      <a href="/" style={{color:"white",
    fontSize:"25px",lineHeight:"100px"}}>Ecommerce</a>

      </div>
      <div className="col m-auto" >
           <Search />
      </div>
      <div className="col m-auto">
        <span style={{ marginRight: "20px" }}>
          <Dropdown.Button
            overlay={menu}
            placement="bottomCenter"
            icon={<UserOutlined />}
          ></Dropdown.Button>
        </span>
        <Link to="/cart">
          <Badge count={cart.length} offset={[-2, 5]}>
            <Avatar
              style={{ background: "none",fontSize:"25px" }}
              icon={<ShoppingCartOutlined />}
            />
          </Badge>
        </Link>
      </div>
    </div>
<div>
<Menubar />

</div>
    </>
  );
};

export default Header;
