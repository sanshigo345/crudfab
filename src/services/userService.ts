import type { User, PaginatedResponse, UserFilterParams } from '../types/user';
import { MOCK_USERS } from './mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const inMemoryUsers = [...MOCK_USERS];

export const fetchUsers = async (params: UserFilterParams): Promise<PaginatedResponse<User>> => {
  await delay(600); 

  let filteredData = [...inMemoryUsers];

  if (params.search) {
    const lowerSearch = params.search.toLowerCase();
    filteredData = filteredData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerSearch) ||
        user.lastName.toLowerCase().includes(lowerSearch)
    );
  }

  if (params.tcknPrefix) {
    filteredData = filteredData.filter((user) => user.tckn.startsWith(params.tcknPrefix!));
  }

  if (params.jobGroup && params.jobGroup.length > 0) {
    filteredData = filteredData.filter((user) => params.jobGroup!.includes(user.jobGroup));
  }

  if (params.sortBy) {
    filteredData.sort((a, b) => {
      const aValue = a[params.sortBy!];
      const bValue = b[params.sortBy!];
      
      if (aValue < bValue) return params.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return params.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

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

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  await delay(800);

  const exists = inMemoryUsers.some(u => u.email === userData.email || u.tckn === userData.tckn);
  if (exists) {
    throw new Error('409: User with this Email or TCKN already exists.');
  }

  if (userData.firstName.toLowerCase() === 'error') {
    throw new Error('400: Invalid name parameter detected.');
  }

  const newUser: User = {
    ...userData,
    id: (inMemoryUsers.length + 1).toString(),
    createdAt: new Date().toISOString(),
  };

  inMemoryUsers.unshift(newUser);
  
  return newUser;
};