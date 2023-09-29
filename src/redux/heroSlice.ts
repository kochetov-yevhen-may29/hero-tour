import { createSlice } from "@reduxjs/toolkit"
import { Hero } from "../types/hero"

export interface HeroState {
  hero: Hero,
  supperpowers: string
}

const initialState: Omit<Hero, "id"> = {
  name: "",
  superpowers: "",
}

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    
  }
})