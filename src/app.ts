import { inject, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from 'aurelia-router';
import { AuthService } from "common/services/auth-service";
import { EventAggregator } from "aurelia-event-aggregator";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap';
import * as moment from 'moment';
import { AuthorizeStep } from "pipeline-steps/authorize-step";

@inject(AuthService, EventAggregator)
export class App {
  router: Router;
  message: string;
  authService: AuthService;
  currentUser: string;
  ea: EventAggregator;
  subscription: any;
  error: string;

  constructor(AuthService: AuthService, EventAggregator: EventAggregator) {
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.message = `Hello Everyone! It is here ${moment().format('YYYY')}`;
  }

  attached(): void {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aquila360';
    config.addAuthorizeStep(AuthorizeStep);
    // config.options.pushState = true;
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName("component/home/home"), nav: true, title: 'Home' },
      { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('component/about/about'), nav: true, title: 'About Us' },
      { route: 'todos', name: 'todo', moduleId: PLATFORM.moduleName('component/todos/todos'), nav: true, title: 'Todo List' },
      { route: 'todos/:fullName/:description/detail', name: 'todoDetail', moduleId: PLATFORM.moduleName('component/todo/todo'), title: 'View Todo' },
      { route: 'jobs', name: 'jobs', moduleId: PLATFORM.moduleName('jobs/index'), title: 'View Jobs', nav: true },
      // { route: 'posts', name: 'posts', moduleId: PLATFORM.moduleName("component/posts/index"), title: 'All Posts' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('component/posts/view'), title: 'View Post' },
      { route: 'post/:slug/edit', name: 'post-edit', moduleId: PLATFORM.moduleName('component/posts/edit'), title: 'Edit Post', settings: { auth: true } },
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('component/posts/tag-view'), title: 'View Posts by Tag' },
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('component/posts/archive-view'), title: 'View Posts by Archive' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('component/auth/login'), title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('component/auth/signup'), title: 'Sign Up' },
      { route: 'newpost', name: 'newpost', moduleId: PLATFORM.moduleName('component/posts/create'), title: 'New Post', settings: { auth: true } },
      // { route: 'files/*path', name: 'files', moduleId: PLATFORM.moduleName('files/index'), nav: 0, title: 'Files', href: '#files' }
    ]);
    // config.mapUnknownRoutes('not-found');
    // console.log('test', this.router.navigation);
  }

  detached(): void {
    this.subscription.dispose();
  }

  logout(): void {
    this.authService.logout().then(data => {
      this.ea.publish('user', null);
      console.log(data.success);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    })
  }
}
