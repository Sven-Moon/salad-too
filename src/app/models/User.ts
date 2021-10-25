import { Contacts } from "./Contact";

export interface User {
  id: string
  name: string
  phoneNumber: string
  email: string
  contacts?: Contacts
  img: string
  password?: string
}

export type Users = User[]
