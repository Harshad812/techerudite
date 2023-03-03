export interface UserDetailPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface UserDetailResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
