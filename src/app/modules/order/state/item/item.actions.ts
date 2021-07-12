import { createAction, props } from '@ngrx/store';
import { CartItem, Item } from 'src/app/models/Item';
import { ItemGroup } from 'src/app/models/ItemGroup';
import { Contact, User } from 'src/app/models/User';

export const setItemOwner = createAction(
  '[Owner Pick] Set Item Owner', props<{ contact: Contact }>()
);

export const setLastItemOwnerAsItemOwner = createAction(
  '[Type Select] Set Last (current) Owner as Item Owner', props<{ owner: Contact }>()
);

export const setItemGroup = createAction(
  '[Item Type Select] Set Item Type',
  props<{ itemGroup: string }>()
);

export const clearItemGroup = createAction('[Item Select] Clear Item Group');

export const setItemId = createAction(
  '[Item Select] Set Item Id (from user selection)',
  props<{ id: string }>()
);

export const loadItem = createAction(
  '[Item Select] Set Item Properties',
  props<{ item: Item }>()
);

export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ data: any }>()
);

export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: any }>()
);

// ======== CUSTOMIZE ========
export const filterIngredientType = createAction(
  '[Customize] Update Picked Ingredient Type',
  props<{ ingredientType: string }>()
);

export const toggleIngredient = createAction(
  '[Customize] Toggle Ingredient',
  props<{ ingredient: string }>()
)

export const clearItem = createAction(
  '[Item Type Select] Clear Item'
);

export const deselectAllIngredientsOfType = createAction(
  '[Customize] Deselect Ingredients of Type',
  props<{ ingredientsToRemove: string[] }>()
);

export const updatePrice = createAction(
  '[Customize] Update Current Item Price'
);

// ======== CART ========
export const editCartItem = createAction(
  '[Cart] Return Cart Item to Customize',
  props<{ item: CartItem }>()
)
