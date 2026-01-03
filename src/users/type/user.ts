export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number | string;
  address?: string;
}
export type UserFormValues = Omit<User, "id">;
