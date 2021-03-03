import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {AppConfigService} from '../../../service/appconfigservice';
import {AppConfig} from '../../../domain/appconfig';

@Component({
    templateUrl: './linechartdemo.html',
    providers: [MessageService]
})
export class LineChartDemo implements OnInit {

    basicData: any;

    multiAxisData: any;

    multiAxisOptions: any;

    lineStylesData: any;

    basicOptions: any;
    
    subscription: Subscription;

    config: AppConfig;

    constructor(private messageService: MessageService, private configService: AppConfigService) {}

    ngOnInit() {
        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#FFA726'
                }
            ]
        }

        this.multiAxisData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 1',
                fill: false,
                borderColor: '#42A5F5',
                yAxisID: 'y-axis-1',
                data: [65, 59, 80, 81, 56, 55, 10]
            }, {
                label: 'Dataset 2',
                fill: false,
                borderColor: '#00bb7e',
                yAxisID: 'y-axis-2',
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        };

        this.multiAxisOptions = {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false
                    }
                }]
            }
        };

        this.lineStylesData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderDash: [5, 5],
                    borderColor: '#66BB6A'
                },
                {
                    label: 'Third Dataset',
                    data: [12, 51, 62, 33, 21, 62, 45],
                    fill: true,
                    borderColor: '#FFA726',
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };
        
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        if (this.config.dark) 
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
        this.basicOptions = {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }]
            }
        };

        this.multiAxisOptions.scales.xAxes = [{
                ticks: {
                    fontColor: '#495057'
                },
                gridLines: {
                    color: '#ebedef'
                }
            }
        ];
        this.multiAxisOptions.scales.yAxes[0].ticks = {
            fontColor: '#495057'
        };
        this.multiAxisOptions.scales.yAxes[0].gridLines = {
            color: '#ebedef'
        };
        this.multiAxisOptions.scales.yAxes[1].ticks = {
            fontColor: '#495057'
        };
        this.multiAxisOptions.scales.yAxes[1].gridLines = {
            color: '#ebedef'
        };
        this.multiAxisOptions.legend = {
            labels:  {
                fontColor: '#495057'
            }
        };
        this.multiAxisOptions = {...this.multiAxisOptions};
    }

    applyDarkTheme() {
        this.basicOptions = {
            legend: {
                labels: {
                    fontColor: '#ebedef'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#ebedef'
                    },
                    gridLines: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#ebedef'
                    },
                    gridLines: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }]
            }
        };

        this.multiAxisOptions.scales.xAxes = [{
                ticks: {
                    fontColor: '#ebedef'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        ];
        this.multiAxisOptions.scales.yAxes[0].ticks = {
            fontColor: '#ebedef'
        };
        this.multiAxisOptions.scales.yAxes[0].gridLines = {
            color: 'rgba(255,255,255,0.2)'
        };
        this.multiAxisOptions.scales.yAxes[1].ticks = {
            fontColor: '#ebedef'
        };
        this.multiAxisOptions.scales.yAxes[1].gridLines = {
            color: 'rgba(255,255,255,0.2)'
        };
        this.multiAxisOptions.legend = {
            labels:  {
                fontColor: '#ebedef'
            }
        };
        this.multiAxisOptions = {...this.multiAxisOptions};
    }
}
