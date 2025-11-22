export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tckn: string;
  jobGroup: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface UserFilterParams {
  page: number;
  pageSize: number;
  search?: string;
  tcknPrefix?: string;
  jobGroup?: string[];
  sortBy?: keyof User;
  sortDirection?: 'asc' | 'desc';
}