import {Component} from 'angular2/core';
import {TieredMenu} from '../../../components/tieredmenu/tieredmenu';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/tieredmenu/tieredmenudemo.component.html',
    directives: [TieredMenu,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class TieredMenuDemoComponent {

}