import type { User, PaginatedResponse, UserFilterParams } from '../types/user';
import { MOCK_USERS } from './mockData';

// Simulate backend delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// We keep a local reference to mutate the data for this session
const inMemoryUsers = [...MOCK_USERS];

export const fetchUsers = async (params: UserFilterParams): Promise<PaginatedResponse<User>> => {
  await delay(600); 

  let filteredData = [...inMemoryUsers];

  // 1. Filter by Search
  if (params.search) {
    const lowerSearch = params.search.toLowerCase();
    filteredData = filteredData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch)
    );
  }

  // 2. Filter by TCKN Prefix
  if (params.tcknPrefix) {
    filteredData = filteredData.filter((user) => user.tckn.startsWith(params.tcknPrefix!));
  }

  // 3. Filter by Job Group
  if (params.jobGroup) {
    filteredData = filteredData.filter((user) => user.jobGroup === params.jobGroup);
  }

  // 4. Sorting
  if (params.sortBy) {
    filteredData.sort((a, b) => {
      const aValue = a[params.sortBy!];
      const bValue = b[params.sortBy!];
      
      if (aValue < bValue) return params.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return params.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 5. Pagination
  const totalCount = filteredData.length;
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount,
    page: params.page,
    pageSize: params.pageSize,
  };
};

// New function to create a user
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  await delay(800); // Simulate network request

  // Simulate server-side validation
  const exists = inMemoryUsers.some(u => u.email === userData.email || u.tckn === userData.tckn);
  if (exists) {
    throw new Error('User with this Email or TCKN already exists.');
  }

  const newUser: User = {
    ...userData,
    id: (inMemoryUsers.length + 1).toString(),
    createdAt: new Date().toISOString(),
  };

  // Add to beginning of list so it's visible
  inMemoryUsers.unshift(newUser);
  
  return newUser;
};