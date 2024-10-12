import {Role} from "./Role";

export interface User {
  id: string;
  username: string;
  email?: string | null;
  fullName?: string | null;
  phone?: string | null;
  dob?: Date | null;
  role?: Role | null;
  isActive: boolean;
  createdAt: Date;
}
