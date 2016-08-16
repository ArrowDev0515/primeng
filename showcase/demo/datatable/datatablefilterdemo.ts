import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DataTable} from '../../../components/datatable/datatable';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {InputText} from '../../../components/inputtext/inputtext';
import {Car} from '../domain/car';
import {Column} from '../../../components/column/column';
import {Header} from '../../../components/common';
import {DataTableSubmenu} from './datatablesubmenu.component';
import {CarService} from '../service/carservice';

@Component({
    templateUrl: 'showcase/demo/datatable/datatablefilterdemo.html',
    directives: [DataTable,Column,Header,InputText,DataTableSubmenu,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class DataTableFilterDemo implements OnInit {

    cars: Car[];

    constructor(private carService: CarService) {}

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
    }
}