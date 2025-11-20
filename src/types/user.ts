// Define the User structure matching the case study
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tckn: string; // Turkish Identity Number
  jobGroup: string;
  createdAt: string;
}

// API Response structure
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Filter parameters sent to the API
export interface UserFilterParams {
  page: number;
  pageSize: number;
  search?: string;     // For Name/Surname
  tcknPrefix?: string; // For TCKN filtering
  jobGroup?: string;   // For Dropdown
  sortBy?: keyof User;
  sortDirection?: 'asc' | 'desc';
}