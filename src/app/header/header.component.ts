import {
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { map } from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipesActions from "../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() featureSelected = new EventEmitter<string>();
  isAuthenticated = false;
  private authSubs: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authSubs = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onFetchData() {
    // this.dataStorageService.fetchingRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature)
  // }

  onLogout() {
    // this.authService.logOut();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }
}
