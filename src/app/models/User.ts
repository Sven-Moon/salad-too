export interface User {
  name: string
  phoneNumber: string
  email: string
  contacts: string[]
  img: string
}

export type Users = User[]

export interface Contact {
  email: string
  name: string
  img: string
}

export type Contacts = Contact[]
