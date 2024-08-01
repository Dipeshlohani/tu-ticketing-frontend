'use client';
import { Typography, Button, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Pagination, Box, tableCellClasses } from '@mui/material';
import { PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_ALL_SUBCATEGORIES } from '@/graphql/queries';
import { DELETE_SUBCATEGORY } from '@/graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from '@/components/Snackbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SubcategoryListPage() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_SUBCATEGORIES);
  const [deleteSubcategory] = useMutation(DELETE_SUBCATEGORY);
  const { showSnackbar } = useSnackbar();

  const handleDelete = (id) => {
    deleteSubcategory({ variables: { id } })
      .then(() => {
        showSnackbar('Subcategory deleted successfully', 'success');
        // Refetch subcategories after deletion
        refetch();
      })
      .catch(() => {
        showSnackbar('Failed to delete subcategory', 'error');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading subcategories</p>;

  return (
    <Grid className="container mx-auto px-4 py-8" sx={{ maxWidth: '150' }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3} mr={3}>
        <Grid item xs={4}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>Sub Category Management</Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
              <TextField
                className="max-w-xs"
                placeholder="Search subcategory..."
                type="search"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" sx={{ p: 1.5 }} href='/subcategory/add'>Add New SubCategory</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table size="small">
            <TableHead>
              <StyledTableRow hover role="checkbox" tabIndex={-1}>
                <StyledTableCell sx={{ maxWidth: 5 }}>S.N.</StyledTableCell>
                {/* <StyledTableCell sx={{ maxWidth: 50 }}>ID</StyledTableCell> */}
                <StyledTableCell sx={{ maxWidth: 50 }}>Name</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Price</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Pawan Media</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Nagarpalika Tax</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Park Revenue</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Category</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: 50 }}>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.subcategories.map((subcategory, index) => (
                <StyledTableRow key={subcategory._id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  {/* <StyledTableCell>{subcategory._id}</StyledTableCell> */}
                  <StyledTableCell>{subcategory.name}</StyledTableCell>
                  <StyledTableCell>{subcategory.price}</StyledTableCell>
                  <StyledTableCell>{subcategory.pawanmedia}</StyledTableCell>
                  <StyledTableCell>{subcategory.nagarpalika_tax}</StyledTableCell>
                  <StyledTableCell>{subcategory.park}</StyledTableCell>
                  <StyledTableCell>{subcategory.category.name}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="contained" size="small" startIcon={<EditIcon />} sx={{ mr: 1 }}>Edit</Button>
                    <Button color='error' variant="contained" size="small" startIcon={<DeleteIcon />} onClick={() => handleDelete(subcategory._id)}>Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Grid container justifyContent="center" className="bg-indigo-100 dark:bg-indigo-800 px-4 py-3" sx={{ mt: 2 }}>
          <Pagination count={3} color="primary">
            <PaginationItem>
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
            </PaginationItem>
          </Pagination>
        </Grid>
      </div>
    </Grid>
  );
}
