export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age?: number ;
  address?: Address;
}
export interface Address {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  state: string;
  stateCode: string;
}
