import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
  Box,
  TableSortLabel,
  Chip,
} from '@mui/material';
import { useUserTableStore } from '../../store/userTableStore';
import { fetchUsers } from '../../services/userService';
import type { User } from '../../types/user';

const UserTable = () => {
  const store = useUserTableStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', store.page, store.pageSize, store.search, store.tcknPrefix, store.jobGroup, store.sortBy, store.sortDirection],
    queryFn: () => fetchUsers(store),
    placeholderData: (previousData) => previousData,
  });

  const handleSort = (property: keyof User) => {
    store.setSorting(property);
  };

  if (isError) {
    return <Alert severity="error">Error fetching data: {(error as Error).message}</Alert>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {isLoading && !data ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={store.sortBy === 'firstName'}
                      direction={store.sortBy === 'firstName' ? store.sortDirection : 'asc'}
                      onClick={() => handleSort('firstName')}
                    >
                      First Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={store.sortBy === 'lastName'}
                      direction={store.sortBy === 'lastName' ? store.sortDirection : 'asc'}
                      onClick={() => handleSort('lastName')}
                    >
                      Last Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={store.sortBy === 'email'}
                      direction={store.sortBy === 'email' ? store.sortDirection : 'asc'}
                      onClick={() => handleSort('email')}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={store.sortBy === 'tckn'}
                      direction={store.sortBy === 'tckn' ? store.sortDirection : 'asc'}
                      onClick={() => handleSort('tckn')}
                    >
                      TCKN
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                        active={store.sortBy === 'jobGroup'}
                        direction={store.sortBy === 'jobGroup' ? store.sortDirection : 'asc'}
                        onClick={() => handleSort('jobGroup')}
                      >
                        Job Group
                      </TableSortLabel>
                  </TableCell>
                  <TableCell>
                     <TableSortLabel
                        active={store.sortBy === 'createdAt'}
                        direction={store.sortBy === 'createdAt' ? store.sortDirection : 'asc'}
                        onClick={() => handleSort('createdAt')}
                      >
                        Created At
                      </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((user) => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.tckn}</TableCell>
                    <TableCell>
                      <Chip label={user.jobGroup} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {data?.data.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No users found matching the criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={data?.totalCount || 0}
            page={store.page - 1}
            onPageChange={(_, newPage) => store.setPage(newPage + 1)}
            rowsPerPage={store.pageSize}
            onRowsPerPageChange={(e) => store.setPageSize(parseInt(e.target.value, 10))}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
    </Paper>
  );
};

export default UserTable;
