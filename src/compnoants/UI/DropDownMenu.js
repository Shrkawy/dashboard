import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

const DropDownMenu = (props) => {
  return (
    <Menu
      open={props.open}
      anchorEl={props.anchorEl}
      elevation={2}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onBackdropClick={props.close}
    >
      {props.items.map((item) => (
        <MenuItem
          component={Link}
          ref={props.ref}
          to={item.href}
          key={item.body}
          onClick={props.onClick}
        >
          {item.body}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default DropDownMenu;
