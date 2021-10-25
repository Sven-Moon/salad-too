export interface Contact {
  id: string
  email: string
  name: string
  img: string
  selected?: boolean
}

export type Contacts = Contact[]
