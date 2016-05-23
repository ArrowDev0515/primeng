import {Component} from '@angular/core';
import {Toolbar} from '../../../components/toolbar/toolbar';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SplitButton} from '../../../components/splitbutton/splitbutton';
import {SplitButtonItem} from '../../../components/splitbutton/splitbuttonitem';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/toolbar/toolbardemo.html',
    directives: [Toolbar,Button,SplitButton,SplitButtonItem,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class ToolbarDemo {

}
