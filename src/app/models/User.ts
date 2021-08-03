export interface User {
  id: string
  name: string
  phoneNumber: string
  email: string
  contacts: Contacts
  img: string
  password?: string
}

export type Users = User[]

export interface Contact {
  email: string
  name: string
  img: string
  selected?: boolean
}

export type Contacts = Contact[]
