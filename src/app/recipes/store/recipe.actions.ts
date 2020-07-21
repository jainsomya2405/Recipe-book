import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[Recipes] Set Recipes";
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";
export const ADD_RECIPES = "[Recipes] Add Recipes";
export const UPDATE_RECIPES = "[Recipes] Update Recipes";
export const DELETE_RECIPES = "[Recipes] Delete Recipes";
export const STORE_RECIPES = "[Recipes] Store Recipes";

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPES;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPES;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesAction =
  | SetRecipes
  | FetchRecipes
  | AddRecipes
  | UpdateRecipes
  | DeleteRecipes
  | StoreRecipes;
