'use client';
import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  Typography, Button, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Box, tableCellClasses,
  Pagination, Paper, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { GET_ALL_CATEGORIES } from '@/graphql/queries';
import { DELETE_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY } from '@/graphql/mutations';
import { useSnackbar } from '@/components/Snackbar';

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

export default function CategoryManagementPage() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_CATEGORIES);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [editCategory, setEditCategory] = useState(null);
  const { showSnackbar } = useSnackbar();

  const handleDelete = (id: string) => {
    deleteCategory({ variables: { id } })
      .then(() => {
        showSnackbar('Category deleted successfully', 'success');
        refetch();
      })
      .catch(() => {
        showSnackbar('Failed to delete category', 'error');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    // showSnackbar('Failed to fetch categories', 'error');
    return <p>Error :(</p>;
  }

  return (
    <Grid className="container mx-auto px-4 py-8" sx={{ maxWidth: '150' }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3} mr={3}>
        <Grid item xs={4}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>Category Management</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
              <TextField
                className="max-w-xs"
                placeholder="Search category..."
                type="search"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ p: 1.5 }} href='/category/add'>Add New Category</Button>
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
                {/* <StyledTableCell>ID</StyledTableCell> */}
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.categories.map((category, index) => (
                <StyledTableRow key={category._id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  {/* <StyledTableCell>{category._id}</StyledTableCell> */}
                  <StyledTableCell>{category.name}</StyledTableCell>
                  <StyledTableCell>{category.description}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1 }}
                      onClick={() => setEditCategory(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      color='error'
                      variant="contained"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Grid container justifyContent="center" className="bg-indigo-100 dark:bg-indigo-800 px-4 py-3" sx={{ mt: 2 }}>
          <Pagination count={Math.ceil(data.categories.length / 10)} color="primary" />
        </Grid>
      </div>
    </Grid>
  );
}
