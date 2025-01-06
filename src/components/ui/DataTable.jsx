import React, { useState, useEffect } from "react";
import { getUsers } from "../../helper/apiCallouts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Grid2 as Grid,
} from "@mui/material";

// Hardcoded columns for the table.

const columns = [
  { id: "fname", label: "First Name" },
  { id: "lname", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "DOB", label: "DOB" },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);

  // Demo data for testing purposes without api call.

  // const demoData = [{
  //   fname: "Gautam",
  //   lname: "Sharma",
  //   email: "gautam.sharma@gmail.com",
  //   dob: "12/12/2000",
  // },
  // {
  //   fname: "test",
  //   lname: "test",
  //   email: "test.sharma@gmail.com",
  //   dob: "10/03/2003",
  // },
  // {
  //   fname: "Yours",
  //   lname: "truly",
  //   email: "truly.yours@gmail.com",
  //   dob: "12/10/2004",
  // }]

  // State for storing search values.
  const [searchFname, setSearchFname] = useState("");
  const [searchLname, setSearchLname] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const handleFnameSearch = (e) => {
    setSearchFname(e.target.value);
  };

  const handleLnameSearch = (e) => {
    setSearchLname(e.target.value);
  };

  const handleEmailSearch = (e) => {
    setSearchEmail(e.target.value);
  };

  useEffect(() => {
    // Fetching user data from the API.
    async function fetchData() {
      const { data } = await getUsers();
      setRows(data);
    }
    fetchData();
  }, []);

  // Filterting rows based on search and displaying them.
  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.fname
      .toLowerCase()
      .includes(searchFname.toLowerCase());
    const matchesLname = row.lname
      .toLowerCase()
      .includes(searchLname.toLowerCase());
    const matchesEmail = row.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    return matchesSearch && matchesLname && matchesEmail;
  });

  return (
    <div>
      <h1 className="text-xl font-medium my-3">All Users</h1>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by FirstName"
            variant="outlined"
            fullWidth
            value={searchFname}
            onChange={handleFnameSearch}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Search by Last Name"
            variant="outlined"
            fullWidth
            value={searchLname}
            onChange={handleLnameSearch}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Search by Email"
            variant="outlined"
            fullWidth
            value={searchEmail}
            onChange={handleEmailSearch}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.fname}</TableCell>
                  <TableCell>{row.lname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
