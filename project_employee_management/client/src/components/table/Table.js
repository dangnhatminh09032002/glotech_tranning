import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function RowTableConf({ row, rowNumber, handleFetchDelete, handleFetchEdit }) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [inputFirstName, setInputFirstName] = useState(row.firstName);
  const [inputLastName, setInputLastName] = useState(row.lastName);
  const [inputEmail, setInputEmail] = useState(row.email);
  const [inputDepartment, setInputDepartment] = useState(row.department);

  const handleChangeInputFirstName = (event) => {
    setInputFirstName(event.target.value);
  };
  const handleChangeInputLastName = (event) => {
    setInputLastName(event.target.value);
  };
  const handleChangeInputEmail = (event) => {
    setInputEmail(event.target.value);
  };
  const handleChangeInputDepartment = (event) => {
    setInputDepartment(event.target.value);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">{rowNumber}</TableCell>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.firstName}</TableCell>
      <TableCell align="center">{row.lastName}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.department}</TableCell>
      <TableCell align="center">
        <Box>
          <Button variant="outlined" sx={{ mx: 1 }}>
            Login As
          </Button>
          <Button variant="outlined" sx={{ mx: 1 }} onClick={handleOpenEdit}>
            Edit
          </Button>
          <Button variant="outlined" sx={{ mx: 1 }}>
            View
          </Button>
          <Button
            variant="outlined"
            sx={{ mx: 1 }}
            onClick={handleClickOpenDelete}
          >
            Delete
          </Button>
        </Box>
      </TableCell>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete this employee?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleFetchDelete(row.id);
              handleCloseDelete();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseDelete} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Chinh sua</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={inputFirstName}
                onChange={handleChangeInputFirstName}
                autoFocus
                margin="dense"
                id="first_name"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={inputLastName}
                onChange={handleChangeInputLastName}
                autoFocus
                margin="dense"
                id="last_name"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={inputEmail}
                onChange={handleChangeInputEmail}
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={inputDepartment}
                onChange={handleChangeInputDepartment}
                autoFocus
                margin="dense"
                id="department"
                label="Department"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button
            onClick={() => {
              handleFetchEdit({
                id: row.id,
                firstName: inputFirstName,
                lastName: inputLastName,
                email: inputEmail,
                department: inputDepartment,
              });
              handleCloseEdit();
            }}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}

export default function BasicTable({
  rows,
  handleFetchDelete,
  handleFetchEdit,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Row</TableCell>
            <TableCell align="center">Employee ID</TableCell>
            <TableCell align="center">First name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Department</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <RowTableConf
              key={index}
              rowNumber={index + 1}
              row={row}
              handleFetchDelete={handleFetchDelete}
              handleFetchEdit={handleFetchEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
