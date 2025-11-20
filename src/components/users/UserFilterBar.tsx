import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import { useUserTableStore } from '../../store/userTableStore';
import { JOB_GROUPS } from '../../services/mockData';
import { useDebounce } from '../../hooks/useDebounce';

const UserFilterBar = () => {
  const {
    setSearch,
    setTcknPrefix,
    setJobGroup,
    resetFilters,
    search,
    tcknPrefix,
    jobGroup,
  } = useUserTableStore();

  const [localSearch, setLocalSearch] = useState(search || '');
  const [localTckn, setLocalTckn] = useState(tcknPrefix || '');

  const debouncedSearch = useDebounce(localSearch, 500);
  const debouncedTckn = useDebounce(localTckn, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    setTcknPrefix(debouncedTckn);
  }, [debouncedTckn, setTcknPrefix]);

  const handleReset = () => {
    setLocalSearch('');
    setLocalTckn('');
    resetFilters();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Search Name/Surname"
          variant="outlined"
          size="small"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <TextField
          label="TCKN Prefix"
          variant="outlined"
          size="small"
          type="number"
          value={localTckn}
          onChange={(e) => setLocalTckn(e.target.value)}
          sx={{ minWidth: 150 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Job Group</InputLabel>
          <Select
            value={jobGroup || ''}
            label="Job Group"
            onChange={(e) => setJobGroup(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {JOB_GROUPS.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ ml: 'auto' }}>
          Reset Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default UserFilterBar;