import {Component,OnInit} from '@angular/core';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {InputText} from '../../../components/inputtext/inputtext';
import {InputTextarea} from '../../../components/inputtextarea/inputtextarea';
import {Button} from '../../../components/button/button';
import {Dropdown} from '../../../components/dropdown/dropdown';
import {SelectItem} from '../../../components/api/selectitem';
import {Listbox} from '../../../components/listbox/listbox';
import {Dialog} from '../../../components/dialog/dialog';
import {Panel} from '../../../components/panel/panel';
import {DataTable} from '../../../components/datatable/datatable';
import {DataGrid} from '../../../components/datagrid/datagrid';
import {AutoComplete} from '../../../components/autocomplete/autocomplete';
import {Calendar} from '../../../components/calendar/calendar';
import {SplitButton} from '../../../components/splitbutton/splitbutton';
import {SplitButtonItem} from '../../../components/splitbutton/splitbuttonitem';
import {Password} from '../../../components/password/password';
import {RadioButton} from '../../../components/radiobutton/radiobutton';
import {LineChart} from '../../../components/chart/linechart/linechart';
import {Tree} from '../../../components/tree/tree';
import {Menu} from '../../../components/menu/menu';
import {PanelMenu} from '../../../components/panelmenu/panelmenu';
import {PickList} from '../../../components/picklist/picklist';
import {Carousel} from '../../../components/carousel/carousel';
import {OrderList} from '../../../components/orderlist/orderlist';
import {TreeNode} from '../../../components/api/treenode';
import {UITreeNode} from '../../../components/tree/uitreenode';
import {TreeNodeTemplateLoader} from '../../../components/tree/treenodetemplateloader';
import {Header} from '../../../components/common/header';
import {Column} from '../../../components/column/column';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {NodeService} from '../service/nodeservice';
import {CountryService} from '../service/countryservice';
import {HTTP_PROVIDERS}    from '@angular/http';
import {MenuItem} from '../../../components/api/menumodel';

@Component({
    templateUrl: 'showcase/demo/responsive/responsivedemo.html',
    directives: [PanelMenu,Menu,PickList,Carousel,OrderList,Tree,TreeNodeTemplateLoader,UITreeNode,LineChart,RadioButton,Password,SplitButton,SplitButtonItem,AutoComplete,Header,DataGrid,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES,InputText,InputTextarea,Button,Dropdown,Listbox,Dialog,Panel,DataTable,Column,Calendar],
    providers: [HTTP_PROVIDERS,CarService,CountryService,NodeService]
})
export class ResponsiveDemo implements OnInit {

    cities: SelectItem[];

    files: TreeNode[];

    sourceCars: Car[];

    targetCars: Car[];

    data: any;

    selectedCity: string;

    val: string;

    options: SelectItem[];

    selectedOption: string;

    display: boolean = false;

    cars: Car[];

    cars1: Car[];

    cars2: Car[];

    cars3: Car[];

    date: string;

    text: string;

    filteredCountriesSingle: any[];
    
    items1: MenuItem[];
    
    items2: MenuItem[];

    showDialog() {
        this.display = true;
    }

    constructor(private carService: CarService, private countryService: CountryService, private nodeService: NodeService) {
        this.cars2 = [
            {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
            {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
            {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
            {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
            {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
            {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
            {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
            {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
            {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
        ];

        this.cities = [];
        this.cities.push({label:'Select Cities', value:'Select Cities'});
        this.cities.push({label:'New York', value:'New York'});
        this.cities.push({label:'Rome', value:'Rome'});
        this.cities.push({label:'London', value:'London'});
        this.cities.push({label:'Istanbul', value:'Istanbul'});
        this.cities.push({label:'Paris', value:'Paris'});

        this.options = [];
        this.options.push({label:'Option 1', value:'Option 1'});
        this.options.push({label:'Option 2', value:'Option 2'});
        this.options.push({label:'Option 3', value:'Option 3'});
        this.options.push({label:'Option 4', value:'Option 4'});
        this.options.push({label:'Option 5', value:'Option 5'});

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
        this.nodeService.getFiles().then(files => this.files = files);
        this.carService.getCarsSmall().then(cars1 => this.cars1 = cars1);
        this.carService.getCarsSmall().then(cars3 => this.sourceCars = cars3);
        this.targetCars = [];
        
        this.items1 = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'fa-plus'},
                {label: 'Open', icon: 'fa-download'}
            ]
        },
        {
            label: 'Edit',
            items: [
                {label: 'Undo', icon: 'fa-refresh'},
                {label: 'Redo', icon: 'fa-repeat'}
            ]
        }];
        
        this.items2 = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search', 
                        icon: 'fa-search', 
                        items: [
                            {
                                label: 'Text', 
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            {label: 'Save', icon: 'fa-save'},
                            {label: 'Update', icon: 'fa-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            {label: 'Delete', icon: 'fa-minus'}
                        ]
                    }
                ]
            }
        ];
    }

    filterCountrySingle(event) {
        let query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountriesSingle = this.filterCountry(query, countries);
        });
    }

    filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }

}
