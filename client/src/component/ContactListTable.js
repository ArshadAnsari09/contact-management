import * as React from "react";
import Button from "react-bootstrap/Button";
import { Stack, TextField } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

//columns in table
const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "mobileNumber", label: "Mobile Number", minWidth: 170 },
  {
    id: "tags",
    label: "Tags",
    minWidth: 100,
    align: "left",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "left",
  },
  {
    id: "updatedAt",
    label: "Updated At",
    minWidth: 170,
    align: "left",
  },
  {
    id: "dateOfBilling",
    label: "Date Of Billing",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "left",
  },
];

export default function StickyHeadTable(props) {
  //creating states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredContacts, setFilteredContacts] = React.useState([]);

  //storing contact come as props in filteredContact
  React.useEffect(() => {
    setFilteredContacts(props.contacts);
  }, [props.contacts]);

  //filterCriteria state
  const [filterCriteria, setFilterCriteria] = React.useState({
    name: "",
    mobileNumber: "",
    tags: "",
    createdAt: "",
    dateOfBilling: "",
    updatedAt: "",
    status: "",
  });
  console.log("initially: ", filteredContacts);

  //handling page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //handling rows per page
  const handleChangeRowsPerPage = (event) => {
    //converting string to number using +
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //handling filter
  const handleSubmit = () => {
    //extracting values from filterCriteria state
    const {
      name,
      mobileNumber,
      tags,
      createdAt,
      updatedAt,
      dateOfBilling,
      status,
    } = filterCriteria;
    // Check if all filter criteria are empty
    if (
      name.length === 0 &&
      mobileNumber.length === 0 &&
      tags.length === 0 &&
      createdAt.length === 0 &&
      updatedAt.length === 0 &&
      dateOfBilling.length === 0 &&
      status.length === 0
    ) {
      // Set filteredContacts to the original contacts
      return;
    }
    // console.log(status);
    let isStatus = false;
    let statusValue;
    if (status.toLowerCase() === "active") {
      isStatus = true;
      statusValue = true;
    } else if (status.toLowerCase() === "inactive") {
      isStatus = true;
      statusValue = false;
    } else {
      isStatus = false;
    }
    // console.log(status);
    // console.log(name);
    // console.log(mobileNumber);
    // console.log(tags);
    // console.log(createdAt);
    // console.log(updatedAt);
    // console.log(dateOfBilling);

    //filtered result data
    const userExits = props.contacts.filter(
      (user) =>
        user.name.toLowerCase() === name.toLowerCase() ||
        user.tags.toLowerCase() === tags.toLowerCase() ||
        user.mobileNumber === mobileNumber ||
        user.createdAt === createdAt ||
        user.updatedAt === updatedAt ||
        user.dateOfBilling === dateOfBilling ||
        (isStatus && user.status === statusValue)
    );
    // console.log(userExits);
    //updating filteredContacts state
    setFilteredContacts(userExits);
  };

  // console.log(filteredContacts);

  return (
    <div>
      <Stack gap={1} direction="horizontal" className="justify-content-between">
        <TextField
          label="Name"
          value={filterCriteria.name}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, name: e.target.value })
          }
          sx={{ padding: "0px", width: "15%" }}
        />
        <TextField
          label="Mobile Number"
          value={filterCriteria.mobileNumber}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              mobileNumber: e.target.value,
            })
          }
          sx={{ padding: "0px", width: "16%" }}
        />
        <TextField
          label="Tags"
          value={filterCriteria.tags}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, tags: e.target.value })
          }
          sx={{ padding: "0px", width: "8%" }}
        />
        <TextField
          label="Created At"
          value={filterCriteria.createdAt}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              createdAt: e.target.value,
            })
          }
          sx={{ padding: "0px", width: "15%" }}
        />
        <TextField
          label="Date of Billing"
          value={filterCriteria.dateOfBilling}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              dateOfBilling: e.target.value,
            })
          }
          sx={{ padding: "0px", width: "15%" }}
        />
        <TextField
          label="Updated At"
          value={filterCriteria.updatedAt}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              updatedAt: e.target.value,
            })
          }
          sx={{ padding: "0px", width: "15%" }}
        />
        <TextField
          label="Status"
          value={filterCriteria.status}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              status: e.target.value,
            })
          }
          sx={{ marginRight: "100px", width: "9%" }}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ marginRight: "68px", width: "150px" }}
        >
          Filter
        </Button>
      </Stack>
      <Paper
        sx={{
          width: "94%",
          //   height: "420px",
          overflowX: "auto",
          overflowY: "auto",
        }}
        className="mt-3"
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/*table columns */}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="fw-bold"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* displaying data in table */}
              {filteredContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];

                        // Handle the "Status" field specifically
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value ? "Active" : "Inactive"}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* adding pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
