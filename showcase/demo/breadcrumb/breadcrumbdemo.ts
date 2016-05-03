import {Component} from '@angular/core';
import {Breadcrumb} from '../../../components/breadcrumb/breadcrumb';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/breadcrumb/breadcrumbdemo.html',
    directives: [Breadcrumb,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class BreadcrumbDemo {

}