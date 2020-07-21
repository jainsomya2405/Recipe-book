import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
    //   (recipe: Recipe[]) => {
    //     this.recipes = recipe;
    //   }
    // );
    // this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.store
      .select('recipe')
      .pipe(
        map((recipeState) => {
          return recipeState.recipes;
        })
      )
      .subscribe((recipe: Recipe[]) => {
        this.recipes = recipe;
      });
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
