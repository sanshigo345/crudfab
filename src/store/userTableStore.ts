import { create } from 'zustand';
import type { UserFilterParams, User } from '../types/user';

interface UserTableState extends UserFilterParams {
  setSearch: (search: string) => void;
  setTcknPrefix: (prefix: string) => void;
  setJobGroup: (job: string[]) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSorting: (field: keyof User) => void;
  resetFilters: () => void;
}

const initialState: UserFilterParams = {
  page: 1,
  pageSize: 10,
  search: '',
  tcknPrefix: '',
  jobGroup: [],
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

export const useUserTableStore = create<UserTableState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search, page: 1 }),
  setTcknPrefix: (prefix) => set({ tcknPrefix: prefix, page: 1 }),
  setJobGroup: (job) => set({ jobGroup: job, page: 1 }),
  setPage: (page) => set({ page }),
  setPageSize: (size) => set({ pageSize: size, page: 1 }),
  setSorting: (field) =>
    set((state) => ({
      sortBy: field,
      sortDirection: state.sortBy === field && state.sortDirection === 'asc' ? 'desc' : 'asc',
    })),
  resetFilters: () => set({ ...initialState }),
}));