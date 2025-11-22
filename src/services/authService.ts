import type { UserProfile } from "../store/authStore";

interface LoginResponse {
  token: string;
  user: UserProfile;
}

export const loginMockService = async (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === 'bugra123') {
        resolve({
          token: 'fake-jwt-token-xyz-123',
          user: {
            id: '1',
            email: email,
            fullName: 'Demo User',
            role: email.includes('admin') ? 'admin' : 'user',
          },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};
