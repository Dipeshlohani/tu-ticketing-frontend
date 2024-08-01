'use client';
import React from 'react';
import { Typography, Button, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Pagination, Box, tableCellClasses, Chip } from '@mui/material';
import { PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@mui/material/Pagination';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_ALL_USERS } from '@/graphql/queries';
// import { useSnackbar } from '@/components/Snackbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
    fontSize: '0.7rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function UserManagementPage() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  // const { showSnackbar } = useSnackbar();

  if (loading) return <p>Loading...</p>;
  if (error) {
    // showSnackbar('Failed to fetch users', 'error');
    return <p>Error :(</p>;
  }

  return (
    <Grid className="container mx-auto px-4 py-8" sx={{ maxWidth: '150' }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3} mr={3}>
        <Grid item xs={4}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>User Management</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
              <TextField
                className="max-w-xs"
                placeholder="Search users..."
                type="search"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ p: 1.5 }} href='/users/add'>Add New User</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table size="small">
            <TableHead>
              <StyledTableRow hover role="checkbox" tabIndex={-1}>
                <StyledTableCell>S.N.</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.getAllUsers.map((user, index) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{user.name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell>
                    <Chip label={user.status} color={user.status === 'ACTIVE' ? 'success' : 'error'} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button color='error' variant="contained" size="small" sx={{ mr: 1 }}>Block</Button>
                    <Button variant="contained" size="small" sx={{ mr: 1 }} startIcon={<EditIcon />} >Edit</Button>
                    <Button color='primary' variant="contained" size="small" sx={{ mr: 1 }}>Reset Password</Button>
                    <Button color='error' variant="contained" size="small" startIcon={<DeleteIcon />} >Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Grid container justifyContent="center" className="bg-indigo-100 dark:bg-indigo-800 px-4 py-3" sx={{ mt: 2 }}>
          <Pagination count={3} color="primary">
            {/* <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" variant="contained" color="primary">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem> */}
          </Pagination>
        </Grid>
      </div>
    </Grid>
  );
}
