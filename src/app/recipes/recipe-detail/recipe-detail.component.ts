import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
// import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import * as RecipesActions from "../store/recipe.actions";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: any;

  constructor(
    // private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    //   this.recipe = this.recipeService.getRecipe(this.id);
    // });
    this.route.params
      .pipe(
        map((params) => {
          return +params["id"];
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("recipe");
        }),
        map((recipeState) => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.AddIngredientsToShoppingList(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onClickEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDelete() {
    // this.recipeService.onDeleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
    this.router.navigate(["/recipes"]);
  }
}
