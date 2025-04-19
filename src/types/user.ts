export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
}
