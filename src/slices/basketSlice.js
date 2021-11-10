import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]; // Se manda product a traves de dispatch "addToBasket"
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        // Si el item del basket es igual al que viene del click
        (basketItem) => basketItem.id === action.payload.id
      );
      //Si lo encuentra crea una copia del basket:

      let newBasket = [...state.items];

      if (index >= 0) {
        //The item exist in the basket... remove it....
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as is not in the Cart`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
//Crear una constante con el Total del carro con un reduce
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
