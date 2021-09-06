import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AuthService } from 'common/services/auth-service';

@inject(AuthService)
export class AuthorizeStep {
  authService: AuthService;

  constructor(AuthService: AuthService) {
    this.authService = AuthService
  }

  run(navigationInstruction, next) {

    //if the user needs to be logged in, check for login
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      //check for login
      //pretend login check fails
      if (!this.authService.currentUser) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
