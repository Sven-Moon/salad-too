export interface User {
  id: string
  name: string
  phoneNumber: string
  email: string
  contacts: string[]
  profileImage: string
  signedIn: boolean
}

export type Users = User[]

export interface Contact {
  id: string
  name: string
  phoneNumber: string
  img: string
}

export type Contacts = Contact[]
