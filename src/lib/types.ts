export interface User {
  name: string;
  number: string;
}

export interface UserResponse {
  error?: string;
  user?: User;
}

export interface CallResponse {
  error?: string;
  twiml?: string;
}
