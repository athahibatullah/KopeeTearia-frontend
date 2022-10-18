import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const DataSlice = createSlice({
  name: "DataSlice",
  initialState: {
    APIData: [],
    TotalPrice: { regularPrice: 0, discountPrice: 0 },
    selected: {},
    message: { show: false, status: "", operation: ""},
    Menu: [
      { name: "Espresso", price: 4.5, category: "Espresso Bar" },
      { name: "Machhiatto", price: 4.5, category: "Espresso Bar" },
      { name: "Americano", price: 4.5, category: "Espresso Bar" },
      { name: "White Coffee with Milk", price: 2.6, category: "Espresso Bar" },
      { name: "Cafe Latte", price: 3.5, category: "Espresso Bar" },
      { name: "Cappucchino", price: 5.5, category: "Espresso Bar" },
      { name: "Tea", price: 5.5, category: "Espresso Bar" },

      { name: "Hot Chocolate", price: 3.5, category: "Specialty Drinks" },
      { name: "Fruit Smoothie", price: 4.5, category: "Specialty Drinks" },
      { name: "JitterBug", price: 4.5, category: "Specialty Drinks" },

      { name: "Butterfinger", price: 4.0, category: "Specialty Lattes" },
      { name: "Blackberry Mocha", price: 5.45, category: "Specialty Lattes" },
      { name: "Maple Latte", price: 4.5, category: "Specialty Lattes" },

      { name: "Today's Brew", price: 3.2, category: "Coffee" },
      { name: "Cafe Vanilla", price: 3.45, category: "Coffee" },
      { name: "Cafe Mocha", price: 3.5, category: "Coffee" },
    ],
  },
  reducers: {
    storeAPIData: (state, data) => {
      state.APIData = data.payload;
    },
    storeTotalPrice: (state, data) => {
      state.TotalPrice = data.payload;
    },
    addData: (state, data) => {
      state.APIData.push(data.payload);
    },
    selectData: (state, data) =>{
      state.selected = data.payload;
    },
    showMessage: (state, data) => {
      state.message.show = true;
      state.message.status = data.payload.status;
      state.message.operation = data.payload.operation;
    }
    // updateData: (state, data) => {
    //   state.  
    // }
    // addTotalPrice: (state, data) => {
    //   if (data.payload.isDiscounted) {
    //     const discountPrice =
    //       parseFloat(data.payload.regularPrice) -
    //       parseFloat(data.payload.regularPrice) * 0.25;
    //     state.TotalPrice.discountPrice = parseFloat(state.TotalPrice.regularPrice) + discountPrice;
    //   }
    //   const regularPrice =
    //     parseFloat(state.TotalPrice.regularPrice) +
    //     parseFloat(data.payload.regularPrice);
    //   state.TotalPrice.regularPrice = regularPrice;
      
    //   // else{
    //   //   const discountPrice =
    //   // }
    // },
  },
});

export const { storeAPIData, addData, storeTotalPrice, selectData, showMessage} =
  DataSlice.actions;
export default DataSlice.reducer;
