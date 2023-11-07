import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./SideBar.css";
import InboxIcon from "@mui/icons-material/Inbox";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const SideBar = () => {
  return (
    <div className="sideBar">
      <Button startIcon={<AddIcon />} className="compose_btn">
        Compose
      </Button>
      <Button startIcon={<InboxIcon />} style={{ textTransform: "none" }}>
        {" "}
        Inbox
      </Button>
      <Button
        startIcon={<MarkEmailReadIcon />}
        style={{ textTransform: "none" }}
      >
        Sent
      </Button>
    </div>
  );
};

export default SideBar;