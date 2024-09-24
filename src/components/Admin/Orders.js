import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  TextField, TablePagination, IconButton, FormControl, InputLabel,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Print, Email } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { feedData } from './data';
import "./Orders.css"

const orderStatus = ["Pending", "Processing", "Shipped", "Cancelled", "On Hold"];

const Orders = () => {
  const [orderFilter, setOrderFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState("Shipped")
  const navigate = useNavigate()

  const handleFilterChange = (event) => {
    setOrderFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token !== 'JWTAdminToken') {
      navigate("/account/login")
    }
  }, [navigate]);

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
    <Paper style={{ width: '100%' }}>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {/* Dropdown Filter */}
        <Select value={orderFilter} onChange={handleFilterChange} style={{ marginRight: '20px' }}>
          <MenuItem value="all">All Orders</MenuItem>
          <MenuItem value="cancelled">Cancelled Orders</MenuItem>
        </Select>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search by Order #, PO #, or Purchaser"
          onChange={handleSearchChange}
          value={searchTerm}
          style={{ flexGrow: 1, marginRight: '20px' }}
        />
        
        <FormControl sx={{ m: 1, minWidth: 180 }} style={{ margin: 0 }}>
          <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Order Status"
            autoWidth
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {orderStatus.map((item, key) => <MenuItem key={`order${key}`} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        
        <DatePicker label="Date From" />
        <DatePicker label="Date To" />

        {/* Print & Email Buttons */}
        <IconButton><Print /></IconButton>
        <IconButton><Email /></IconButton>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>PO Number</TableCell>
              <TableCell>Total Charge</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Shipped Date</TableCell>
              <TableCell>Purchaser</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((row) =>
                row.orderNumber.includes(searchTerm) ||
                row.poNumber.includes(searchTerm) ||
                row.purchaser.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((row) => (
                <TableRow key={row.orderNumber}>
                  <TableCell>{row.orderNumber}</TableCell>
                  <TableCell>{row.poNumber}</TableCell>
                  <TableCell>{row.totalCharge}</TableCell>
                  <TableCell>{row.orderDate}</TableCell>
                  <TableCell>{row.shippedDate}</TableCell>
                  <TableCell>{row.purchaser}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell><Button>View Details</Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={feedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper></DemoContainer></LocalizationProvider>
  );
};

export default Orders;