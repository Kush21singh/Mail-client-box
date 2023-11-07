import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./SideBar.css";
import InboxIcon from "@mui/icons-material/Inbox";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { uiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch();
  const showComposeMail = () => {
    dispatch(uiActions.showCompose());
  };
  const showInbox = () => {
    dispatch(uiActions.showInbox());
  };
  const showsentBox = () => {
    dispatch(uiActions.showSent());
  };

  return (
    <div className="sideBar">
      <Button
        startIcon={<AddIcon />}
        className="compose_btn"
        onClick={showComposeMail}
      >
        Compose
      </Button>
      <Button
        startIcon={<InboxIcon />}
        style={{ textTransform: "none" }}
        onClick={showInbox}
      >
        {" "}
        Inbox
      </Button>
      <Button
        startIcon={<MarkEmailReadIcon />}
        style={{ textTransform: "none" }}
        onClick={showsentBox}
      >
        Sent
      </Button>
    </div>
  );
};

export default SideBar;
