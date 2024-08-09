// src/types/User.ts
export interface User {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: number;
    address?: string; // Optional if not always available
  }
  