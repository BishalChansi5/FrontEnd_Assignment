import type { ApiUser } from "../type/user.api";
const formatAddress = (address: ApiUser["address"]) => {
  if (!address) return undefined;
  return `${address.address}, ${address.city}, ${address.state}, ${address.country} `;
};
export const mapUserFromApi = (user: ApiUser) => ({
  id: String(user.id),
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  age: user.age,
  address: formatAddress(user.address),
});
