export interface LoginRequest{
  email: string,
  password: string
}


export interface RegisterRequest{
  name:     Name;
  email:    string;
  password: string;
  role:     string;
  image:    string;
}

export interface Name {
  first: string;
  last:  string;
}
