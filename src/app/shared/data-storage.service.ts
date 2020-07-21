import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as RecipeAction from "../recipes/store/recipe.actions";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   this.http
  //     .put("https://ng-recipe-book-6946f.firebaseio.com/recipes.json", recipes)
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  // fetchingRecipes() {
  //   return this.http
  //     .get<Recipe[]>("https://ng-recipe-book-6946f.firebaseio.com/recipes.json")
  //     .pipe(
  //       map((recipes) => {
  //         return recipes.map((recipe) => {
  //           return {
  //             ...recipe,
  //             ingredients: recipe.ingredients ? recipe.ingredients : [],
  //           };
  //         });
  //       }),
  //       tap((recipes) => {
  //         // this.recipeService.setRecipes(recipes);
  //         this.store.dispatch(new RecipeAction.SetRecipes(recipes));
  //       })
  //     );
  // }
}
