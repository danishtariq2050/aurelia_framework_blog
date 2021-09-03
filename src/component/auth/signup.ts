import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { AuthService } from "common/services/auth-service";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(AuthService, Router, EventAggregator)

export class Signup {
  name: string;
  authService: AuthService;
  error: string;
  router: Router;
  ea: EventAggregator;

  constructor(AuthService: AuthService, Router: Router, EventAggregator: EventAggregator) {
    this.ea = EventAggregator;
    this.authService = AuthService;
    this.router = Router;
  }

  activate() {
    this.error = '';
  }

  signup(): void {
    this.error = '';
    this.authService.signup(this.name)
      .then(data => {
        this.ea.publish('user', data.user);
        this.router.navigateToRoute('home')
      })
      .catch(error => { this.error = error.message })
  }
}
