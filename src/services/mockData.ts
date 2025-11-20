import type { User } from "../types/user";

const getRandomDate = () => {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const JOB_GROUPS = ['Engineer', 'Doctor', 'Teacher', 'Lawyer', 'Manager', 'Designer'];

export const MOCK_USERS: User[] = Array.from({ length: 100 }).map((_, index) => {
  const id = (index + 1).toString();
  const firstNames = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Mustafa', 'Can'];
  const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Öztürk', 'Arslan'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const job = JOB_GROUPS[Math.floor(Math.random() * JOB_GROUPS.length)];
  
  const tckn = Math.floor(10000000000 + Math.random() * 90000000000).toString();

  return {
    id,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    tckn,
    jobGroup: job,
    createdAt: getRandomDate(),
  };
});