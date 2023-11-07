import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxActions } from "../store/inbox-slice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, IconButton, Typography } from "@mui/material";
import useFetchdata from "../store/Fetchdata";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9ec2e6",
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Inbox() {
  const inboxMails = useSelector((state) => state.inbox.emails);

  const [inboxEmails, SetinboxEmails] = React.useState([]);
  const email = localStorage.getItem("userEmail");
  const editedEmail = email.replace("@", "").replace(".", "");
  const [newdata] = useFetchdata(
    `https://mail-box-65f0e-default-rtdb.firebaseio.com/${editedEmail}/inbox.json`
  );
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (newdata) {
      console.log("data", newdata);
      const totalMails = Object.keys(newdata).length;
      localStorage.setItem("totalmails", totalMails.toString());
    }
  }, [newdata]);

  useEffect(() => {
    SetinboxEmails(newdata);
    dispatch(inboxActions.addEmail(newdata));
  }, [newdata]);

  newdata &&
    localStorage.setItem(
      "unseenCount",
      Object.values(newdata).filter((item) => item.seen === "unseen").length
    );

  const handleDelete = (data) => {
    console.log("reducer", Object.keys(inboxMails));

    console.log("base", Object.keys(inboxEmails));
    fetch(
      `https://mail-box-65f0e-default-rtdb.firebaseio.com/${editedEmail}/inbox/${data}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // window.location.reload(true);
      })
      .catch((err) => {
        alert(err.mess);
      });
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Typography variant="h6" style={{ color: "#1976D2" }}>
        Inbox
      </Typography>
      <Container sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {["Status", "Subject", "Sender", "Date", ""].map((head) => (
                  <StyledTableCell key={head}>{head}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inboxMails &&
                Object.keys(inboxMails)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .reverse()
                  .map((data, key) => {
                    return (
                      <StyledTableRow
                        // onClick={() => {
                        //   console.log(data, inboxEmails[data]);
                        // }}
                        key={key}
                        style={{ cursor: "pointer" }}
                      >
                        <StyledTableCell>
                          {inboxMails[data].seen === "seen" ? (
                            <MarkEmailReadIcon />
                          ) : (
                            <MarkEmailUnreadIcon color="primary" />
                          )}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].emailSubject}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].senderEmail}
                        </StyledTableCell>
                        <StyledTableCell>
                          {inboxMails[data].date}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton onClick={() => handleDelete(data)}>
                            {<DeleteOutlineIcon color="error" />}
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={inboxEmails ? Object.keys(inboxEmails).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Container>
  );
}
