import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, des: string, imagePath: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = des;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}

