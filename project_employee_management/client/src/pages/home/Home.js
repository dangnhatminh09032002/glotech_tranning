import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import ResponsiveAppBar from "../../components/appBar/AppBar";
import Table from "../../components/table/Table";

import axios from "axios";

export default function Home({ changeLoginIsFalse, removeCookie }) {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputDepartment, setInputDepartment] = useState("");

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchAdd = async () => {
    try {
      if (
        !inputFirstName ||
        !inputLastName ||
        !inputEmail ||
        !inputDepartment
      ) {
        console.log("Please fill all fields");
      } else {
        const add = await axios
          .post(
            "http://localhost:8080/api/employees",
            {
              firstName: inputFirstName,
              lastName: inputLastName,
              email: inputEmail,
              department: inputDepartment,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setEmployees((emp) => [...emp, response.data]);
            handleClose();
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(add);
      }
    } catch (error) {}
  };

  const handleFetchDelete = async (id) => {
    try {
      const deleteEmp = await axios
        .delete(`http://localhost:8080/api/employees/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setEmployees((emp) => emp.filter((e) => e.id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(deleteEmp);
    } catch (error) {}
  };

  const handleFetchEdit = async (employee) => {
    try {
      const editEmp = await axios
        .put(`http://localhost:8080/api/employees/${employee.id}`, employee, {
          withCredentials: true,
        })
        .then((response) => {
          setEmployees((emp) =>
            emp.map((e) => (e.id === employee.id ? employee : e))
          );
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(editEmp);
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees", { withCredentials: true })
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  return (
    <Container maxWidth="1">
      <ResponsiveAppBar
        removeCookie={removeCookie}
        changeLoginIsFalse={changeLoginIsFalse}
      />

      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button sx={{ mb: 1 }} variant="outlined" onClick={handleClickOpen}>
            Create
          </Button>
        </Box>
        <Table
          rows={employees}
          handleFetchDelete={handleFetchDelete}
          handleFetchEdit={handleFetchEdit}
        />
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>Zo nao ba con</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFetchAdd}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
