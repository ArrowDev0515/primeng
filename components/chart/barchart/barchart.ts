import {Component, ElementRef, AfterViewInit, OnDestroy, DoCheck, SimpleChange, Input, Output, EventEmitter, IterableDiffers} from 'angular2/core';

@Component({
    selector: 'p-barChart',
    template: `
        <div>
            <canvas [attr.width]="width" [attr.height]="height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `
})
export class BarChart implements AfterViewInit, OnDestroy, DoCheck {

    @Input() animation: boolean = true;

    @Input() animationSteps: number = 60;

    @Input() animationEasing: string = "easeOutQuart";

    @Input() showScale: boolean = true;

    @Input() scaleOverride: boolean = false;

    @Input() scaleSteps: number = null;

    @Input() scaleStepWidth: number = null;

    @Input() scaleStartValue: number = null;

    @Input() scaleLineColor: string = 'rgba(0,0,0,.1)';

    @Input() scaleLineWidth: number = 1;

    @Input() scaleShowLabels: boolean = true;

    @Input() scaleLabel: string = '<%=value%>';

    @Input() scaleIntegersOnly: boolean = true;

    @Input() scaleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() scaleFontSize: number = 12;

    @Input() scaleFontStyle: string = 'normal';

    @Input() scaleFontColor: string = '#666';

    @Input() responsive: boolean = false;

    @Input() maintainAspectRatio: boolean = true;

    @Input() showTooltips: boolean = true;

    @Input() tooltipFillColor: string = 'rgba(0,0,0,0.8)';

    @Input() tooltipFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() tooltipFontSize: number = 14;

    @Input() tooltipFontStyle: string = 'normal';

    @Input() tooltipFontColor: string = '#fff';

    @Input() tooltipTitleFontFamily: string = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    @Input() tooltipTitleFontSize: number = 14;

    @Input() tooltipTitleFontStyle: string = 'bold';

    @Input() tooltipTitleFontColor: string = '#fff';

    @Input() tooltipYPadding: number = 6;

    @Input() tooltipXPadding: number = 6;

    @Input() tooltipCaretSize: number = 8;

    @Input() tooltipCornerRadius: number = 6;

    @Input() tooltipXOffset: number = 10;

    @Input() tooltipTemplate: string = "<%if (label){%><%=label%>: <%}%><%= value %>";

    @Input() multiTooltipTemplate: string = "<%= value %>";

    @Input() value: any;

    @Input() width: string;

    @Input() height: string;

    @Input() scaleBeginAtZero: boolean = true;

    @Input() scaleShowGridLines: boolean = true;

    @Input() scaleGridLineColor: string = "rgba(0,0,0,.05)";

    @Input() scaleGridLineWidth: number = 1;

    @Input() scaleShowHorizontalLines: boolean = true;

    @Input() scaleShowVerticalLines: boolean = true;

    @Input() barShowStroke: boolean = true;

    @Input() barStrokeWidth: number = 2;

    @Input() barValueSpacing: number = 5;

    @Input() barDatasetSpacing: number  = 1;

    @Input() legend: any;

    @Input() legendTemplate: string = "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>";

    @Output() onBarsSelect: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    chart: any;

    differ: any;

    constructor(private el: ElementRef, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }

    ngDoCheck() {
        let changes = null;
        try {
            changes = this.differ.diff(this.value);
        } catch (e) {
            if(this.value) {
                changes = this.differ.diff(this.value.datasets);
            }
        }

        if(changes && this.initialized) {
            if (this.chart) {
                this.chart.destroy();
            }

            this.initChart();
        }
    }

    ngOnDestroy() {
        if(this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }

    onCanvasClick(event) {
        if(this.chart) {
            let activeBars = this.chart.getBarsAtEvent(event);
            if(activeBars) {
                this.onBarsSelect.emit({originalEvent: event, bars: activeBars});
            }
        }
    }

    initChart() {
        if(this.value) {
            this.chart = new Chart(this.el.nativeElement.children[0].children[0].getContext("2d")).Bar(this.value, {
                animation: this.animation,
                animationSteps: this.animationSteps,
                animationEasing: this.animationEasing,
                showScale: this.showScale,
                scaleOverride: this.scaleOverride,
                scaleSteps: this.scaleSteps,
                scaleStepWidth: this.scaleStepWidth,
                scaleStartValue: this.scaleStartValue,
                scaleLineColor: this.scaleLineColor,
                scaleLineWidth: this.scaleLineWidth,
                scaleLabel: this.scaleLabel,
                scaleShowLabels: this.scaleShowLabels,
                scaleIntegersOnly: this.scaleIntegersOnly,
                scaleBeginAtZero: this.scaleBeginAtZero,
                scaleFontFamily: this.scaleFontFamily,
                scaleFontSize: this.scaleFontSize,
                scaleFontStyle: this.scaleFontStyle,
                scaleFontColor: this.scaleFontColor,
                responsive: this.responsive,
                maintainAspectRatio: this.maintainAspectRatio,
                showTooltips: this.showTooltips,
                tooltipFillColor: this.tooltipFillColor,
                tooltipFontFamily: this.tooltipFontFamily,
                tooltipFontSize: this.tooltipFontSize,
                tooltipFontStyle: this.tooltipFontStyle,
                tooltipFontColor: this.tooltipFontColor,
                tooltipTitleFontFamily: this.tooltipTitleFontFamily,
                tooltipTitleFontSize: this.tooltipTitleFontSize,
                tooltipTitleFontStyle: this.tooltipTitleFontStyle,
                tooltipTitleFontColor: this.tooltipTitleFontColor,
                tooltipYPadding: this.tooltipYPadding,
                tooltipXPadding: this.tooltipXPadding,
                tooltipCaretSize: this.tooltipCaretSize,
                tooltipCornerRadius: this.tooltipCornerRadius,
                tooltipXOffset: this.tooltipXOffset,
                tooltipTemplate: this.tooltipTemplate,
                multiTooltipTemplate: this.multiTooltipTemplate,
                scaleShowGridLines: this.scaleShowGridLines,
                scaleGridLineColor: this.scaleGridLineColor,
                scaleGridLineWidth: this.scaleGridLineWidth,
                scaleShowHorizontalLines: this.scaleShowHorizontalLines,
                scaleShowVerticalLines: this.scaleShowVerticalLines,
                barShowStroke: this.barShowStroke,
                barStrokeWidth: this.barStrokeWidth,
                barValueSpacing: this.barValueSpacing,
                barDatasetSpacing: this.barDatasetSpacing
            });

            if(this.legend) {
                this.legend.innerHTML = this.chart.generateLegend();
            }
        }
    }
    
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
}