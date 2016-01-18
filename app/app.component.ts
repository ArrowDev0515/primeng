import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomePageComponent} from './homepage.component';
import {InputTextDemoComponent} from './components/inputtext/demo/inputtextdemo.component';
import {ButtonDemoComponent} from './components/button/demo/buttondemo.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'HomePage', component: HomePageComponent},
    {path: '/inputtext', name: 'InputTextDemo', component: InputTextDemoComponent},
    {path: '/button', name: 'ButtonDemo', component: ButtonDemoComponent}
])
export class AppComponent {

}