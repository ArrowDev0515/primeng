import {Component} from '@angular/core';
import {ContextMenu} from '../../../components/contextmenu/contextmenu';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {Button} from '../../../components/button/button';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'showcase/demo/contextmenu/contextmenudemo.html',
    directives: [ContextMenu,Button,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ContextMenuDemo {

}