
export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface AgeGroup {
  id: string;
  name: string;
  ageRange: string;
  quota: number;
  enrolled: number;
}

export interface Application {
  id: string;
  childName: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  ethnicity: string;
  address: string;
  ageGroupId: string;
  parentName: string;
  phoneNumber: string;
  email: string;
  docBirthCert: string | null;
  docResidence: string | null;
  status: ApplicationStatus;
  createdAt: string;
}

export type UserRole = 'PARENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
