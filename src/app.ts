import { inject, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from 'aurelia-router';
import { AuthService } from "common/services/auth-service";
import { EventAggregator } from "aurelia-event-aggregator";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap';
import * as moment from 'moment';

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

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aquila360';
    // config.options.pushState = true;
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName("component/home/home"), nav: true, title: 'Home' },
      { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('component/about/about'), nav: true, title: 'About Us' },
      { route: 'todos', name: 'todo', moduleId: PLATFORM.moduleName('component/todos/todos'), nav: true, title: 'Todo List' },
      { route: 'todos/:fullName/:description/detail', name: 'todoDetail', moduleId: PLATFORM.moduleName('component/todo/todo'), title: 'View Todo' },
      { route: 'jobs', name: 'jobs', moduleId: PLATFORM.moduleName('jobs/index'), title: 'View Jobs', nav: true },
      // { route: 'posts', name: 'posts', moduleId: PLATFORM.moduleName("component/posts/index"), title: 'All Posts' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('component/posts/view'), title: 'View Post' },
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('component/posts/tag-view'), title: 'View Posts by Tag' },
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('component/posts/archive-view'), title: 'View Posts by Archive' },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('component/auth/login'), title: 'Login' },
      // { route: 'files/*path', name: 'files', moduleId: PLATFORM.moduleName('files/index'), nav: 0, title: 'Files', href: '#files' }
    ]);
    // config.mapUnknownRoutes('not-found');
    // console.log('test', this.router.navigation);
  }

  detached() {
    this.subscription.dispose();
  }

  logout(): void {
    this.authService.logout().then(data => {
      this.ea.publish('user', null);
      console.log(data.success)
    }).catch(error => {
      this.error = error.message;
    })
  }
}
