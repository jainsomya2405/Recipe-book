import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService} from "./auth.service";
import {  Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as frommApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  closeSuns: Subscription;
  storeSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<frommApp.AppState>
  ) {}

  ngOnInit() {
    this.storeSubs = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObs = this.authService.signUp(email, password);
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }

    // authObs.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.router.navigate(["/recipes"]);
    //   },
    //   (errorMes) => {
    //     console.log(errorMes);
    //     this.error = errorMes;
    //     this.showErrorAlert(errorMes);
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  onHandleError() {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.closeSuns) {
      this.closeSuns.unsubscribe();
    }
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
  }

  private showErrorAlert(errorMes: string) {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = errorMes;
    this.closeSuns = componentRef.instance.close.subscribe(() => {
      this.closeSuns.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
