import {Component} from 'angular2/core';
import {Fieldset} from '../../../components/fieldset/fieldset';
import {pCode} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/fieldset/fieldsetdemo.html',
    directives: [Fieldset,TabView,TabPanel,pCode,ROUTER_DIRECTIVES]
})
export class FieldsetDemo {

}