import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { createUser } from '../../services/userService';
import { JOB_GROUPS } from '../../services/mockData';

const userSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Invalid email format'),
  tckn: z.string().regex(/^\d{11}$/, 'TCKN must be exactly 11 digits'),
  jobGroup: z.string().min(1, 'Please select a job group'),
});

type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal = ({ open, onClose }: AddUserModalProps) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      tckn: '',
      jobGroup: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      enqueueSnackbar('User created successfully!', { variant: 'success' });

      handleClose();
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    reset();
    mutation.reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="tckn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="TCKN (11 Digits)"
                  fullWidth
                  inputProps={{ maxLength: 11 }}
                  error={!!errors.tckn}
                  helperText={errors.tckn?.message}
                />
              )}
            />

            <Controller
              name="jobGroup"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.jobGroup}>
                  <InputLabel>Job Group</InputLabel>
                  <Select {...field} label="Job Group">
                    {JOB_GROUPS.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : 'Create User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserModal;