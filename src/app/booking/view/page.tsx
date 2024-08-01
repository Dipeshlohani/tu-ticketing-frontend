'use client';
import { useQuery, gql } from '@apollo/client';
import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Typography, Button, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Pagination, Box, tableCellClasses, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Ticket from '@/components/Ticket';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { GET_BOOKINGS } from '@/graphql/queries';
import UploadBookingPage from '@/components/UploadBooking';
import BookingForm from '@/components/BookingForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
    fontSize: '0.8rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Component() {
  const { loading, error, data } = useQuery(GET_BOOKINGS);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({
    category: "",
    subcategory: '',
    createdAt: '',
    createdBy: "",
    nagarpalikaTax: '',
    name: '',
    parkRevenue: '',
    pawanMediaRevenue: '',
    paymentMethod: '',
    phone: '',
    price: '',
    remarks: '',
    ticket_no: '',
    visitors: ''
  });

  const handleClickOpenEdit = (booking) => {
    const sanitizedBooking = {
      ...booking,
    };
    setSelectedBooking(sanitizedBooking);
    setOpenEditDialog(true);
  };

  const handleClickOpenPdf = (booking) => {
    const sanitizedBooking = {
      ...booking,
    };
    setSelectedBooking(sanitizedBooking);
    setOpenPdfDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedBooking(null);
  };

  const handleClosePdf = () => {
    setOpenPdfDialog(false);
    setSelectedBooking(null);
  };

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current ? ticketRef.current : null,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Grid container sx={{ maxWidth: '150', mx: 'auto', px: 2, py: 4 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <Grid item xs={4}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>Booking Management</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
              <TextField
                sx={{ maxWidth: '20rem' }}
                placeholder="Search bookings..."
                type="search"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ p: 1 }} href='/booking/add'>Add New Booking</Button>
            </Grid>
            <Grid item>
              <UploadBookingPage />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, overflow: 'hidden', fontSize: '2px' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <StyledTableRow hover role="checkbox" tabIndex={-1}>
                <StyledTableCell sx={{ maxWidth: 5 }}>S.N.</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Ticket No.</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Name</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 5 }}>Qty</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Category</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Subcategory</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Price</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Pawan Media</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Nagarpalika Tax</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Park Revenue</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Phone</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Paid mode</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 200 }}>Created at</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 200 }}>Created By</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Remarks</StyledTableCell>
                <StyledTableCell align="center" sx={{ maxWidth: 50 }}>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.bookings.map((booking, index) => (
                <StyledTableRow key={booking._id}>
                  <StyledTableCell sx={{ maxWidth: 5 }}>{index + 1}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.ticket_no}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.name}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 5 }}>{booking?.visitors}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.category.name || booking?.category}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.subcategory.name || booking.subcategory}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.price}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.pawanMediaRevenue}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.nagarpalikaTax}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.parkRevenue}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.phone}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.paymentMethod}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 200 }}>{new Date(booking?.createdAt).toLocaleString()}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 200 }}>{booking?.createdBy}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>{booking?.remarks}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: 50 }}>
                    <Grid container>
                      <Grid item>
                        <Button onClick={() => handleClickOpenEdit(booking)}><EditIcon sx={{ fontSize: '1rem' }} color="primary" /></Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => handleClickOpenPdf(booking)}><PictureAsPdfRoundedIcon sx={{ fontSize: '1rem' }} color="primary" /></Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={() => handleClickOpenPdf(booking)}><ShareIcon sx={{ fontSize: '1rem' }} color="primary" /></Button>
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
      <Dialog open={openPdfDialog} onClose={handleClosePdf} fullWidth maxWidth="sm">
        {/* <DialogTitle>Generate PDF</DialogTitle> */}
        <DialogContent>
          <Ticket booking={selectedBooking} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrint} variant="contained" color="primary" startIcon={<PrintIcon />}>Print</Button>
          <Button onClick={handleClosePdf} variant="contained" color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEdit} fullWidth maxWidth="md">
        {/* <DialogTitle>Edit Booking</DialogTitle> */}
        <DialogContent>
          <BookingForm initialData={selectedBooking} onClose={handleCloseEdit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
