import { Badge, IconButton } from "@material-ui/core";
import { NotificationsNone } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import DropDownMenu from "./UI/DropDownMenu";

const NotificationItems = [
  {
    body: "Sharkawy Ordered an Apple Watch 1",
    date: new Date(),
    href: "/notification",
  },
  {
    body: "Sharkawy Ordered an Apple Watch 2",
    date: new Date(),
    href: "/notification",
  },
  {
    body: "Sharkawy Ordered an Apple Watch 3",
    date: new Date(),
    href: "/notification",
  },
  {
    body: "Sharkawy Ordered an Apple Watch 4",
    date: new Date(),
    href: "/notification",
  },
];

const NotificationIcon = () => {
  const [openNotification, setOpenNotification] = useState(false);

  const anchorRef = useRef(null);

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };
  const handleClose = (event) => {
    setOpenNotification(!openNotification);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };
  return (
    <>
      <IconButton
        color="default"
        aria-haspopup="true"
        ref={anchorRef}
        onClick={handleOpenNotification}
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsNone />
        </Badge>
      </IconButton>
      <DropDownMenu
        anchorEl={anchorRef.current}
        onClick={handleClose}
        open={openNotification || false}
        close={() => setOpenNotification(false)}
        items={NotificationItems}
      />
    </>
  );
};

export default NotificationIcon;
