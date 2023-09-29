export interface Hero {
  id: number;
  name: string;
  superpowers: string;
}

export const inintialHero: Omit<Hero, "id"> = {
  name: "",
  superpowers: "",
}