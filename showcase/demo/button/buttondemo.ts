import {Component} from 'angular2/core';
import {TabView} from '../../../components/tabview/tabview';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'components/button/buttondemo.html',
    directives: [CodeHighlighter,Button,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class ButtonDemo {

    clicks: number = 0;

    count() {
        this.clicks++;
    }
}