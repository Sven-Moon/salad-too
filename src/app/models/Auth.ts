import { Contacts } from "./User";

export interface AuthResp {
  id: string;
  name: string;
  email: string;
  img: string;
  phoneNumber: string;
  token: string;
  contacts: Contacts
}

export interface AuthReg {
  email: string;
  name: string;
  password: string;
}
