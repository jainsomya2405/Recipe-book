import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable({ providedIn: "root" })
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "A Test Recipe",
  //     "This is simple a test",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUM40hs3gEY9IOimECm6GmY0w8rnV12ZACtcFHAcQIUU-2N4vu&usqp=CAU",
  //     [
  //       new Ingredient("Apple", 5),
  //       new Ingredient("Orange", 4),
  //       new Ingredient("Bread", 1),
  //     ]
  //   ),
  //   new Recipe(
  //     "Another Recipe",
  //     "This is another test",
  //     "https://homemadehooplah.com/wp-content/uploads/2016/02/baileys-cookies-and-cream-parfaits-1-500x500.jpg",
  //     [
  //       new Ingredient("Mango", 5),
  //       new Ingredient("French Fries", 25),
  //       new Ingredient("Milk", 5),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  AddIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
