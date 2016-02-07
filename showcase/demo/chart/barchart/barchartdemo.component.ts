import {Component} from 'angular2/core';
import {BarChart} from '../../../../components/chart/barchart/barchart';
import {TabView} from '../../../../components/tabview/tabview';
import {TabPanel} from '../../../../components/tabview/tabpanel';
import {Growl} from '../../../../components/growl/growl';
import {Button} from '../../../../components/button/button';
import {Message} from '../../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/chart/barchart/barchartdemo.component.html',
    directives: [BarChart,Button,Growl,TabPanel,TabView,ROUTER_DIRECTIVES]
})
export class BarChartDemoComponent {

    data: any;

    msgs: Message[];

    constructor() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: '#90CAF9',
                    strokeColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: '#C5E1A5',
                    strokeColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }

    onSelect(event) {
        if(event.bars) {
            this.msgs = [];
            for(var i = 0; i < event.bars.length; i++) {
                this.msgs.push({severity: 'info', summary: 'Bar Selected', 'detail': event.bars[i].label + ' ' + event.bars[i].value});
            }

        }
    }
}