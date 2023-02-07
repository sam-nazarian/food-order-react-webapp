import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

/*
The item in cart state will have this object:
  cartCtx.addItem({
  id: props.id,
  name: props.name,
  amount: amount,
  price: props.price,
});
*/

// shouldn't be recreated when comonent is reevaluated
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id); //find existing item
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // if an existing item already exits then add a counter to the amount instead of adding a new one
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount, //add the amount which was added by current action to already added item
      };

      updatedItems = [...state.items]; //update arr immutably without editting original one
      updatedItems[existingCartItemIndex] = updatedItem; //update that item
    } else {
      updatedItems = state.items.concat(action.item); //concat returns a new arr, updating state in an immutable way
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id); //remove the item obj from array entirly
    } else {
      // remove 1 quantity from amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; //update amount for existing item
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    // since these two are connected to each other & when one updates the other also updates, use a reducer instead of a state
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
