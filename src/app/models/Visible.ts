
export interface Visible {
  [id: string]: {
    itemsVisible: boolean,
    items: {
      [itemId: string]: {
        ingredientsVisible: boolean
      }
    },
  }
}
