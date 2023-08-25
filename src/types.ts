// src/types.ts
export interface Character {
    id: number;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    url: string
    // Add more fields as needed
}

export type inputType = "height" | "mass" | "hair_color" | "skin_color" | "eye_color" | "birth_year" | "gender";

