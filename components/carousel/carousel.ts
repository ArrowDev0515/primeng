import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,TemplateRef,ContentChild} from 'angular2/core';

@Component({
    selector: 'p-carousel',
    template: `
        <div class="ui-carousel ui-widget-content ui-corner-all">
            <div class="ui-carousel-viewport">
                <ul>
                    <template ngFor [ngForOf]="value" [ngForTemplate]="itemTemplate"></template>
                </ul>
            </div>
        </div>
    `
})
export class Carousel {
    
    @Input() value: any[];

    @Input() numVisible: number;

    @Input() firstVisible: number;

    @Input() headerText: string;

    @Input() effectDuration: any;

    @Input() circular: boolean;

    @Input() breakpoint: number;

    @Input() responsive: boolean;

    @Input() autoplayInterval: number;

    @Input() easing: string;

    @Input() pageLinks: number;

    @Input() style: string;

    @Input() styleClass: string;
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef;

    initialized: boolean;

    carouselElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.carouselElement = jQuery(this.el.nativeElement).find('> .ui-carousel > .ui-carousel-viewport > ul');
        this.carouselElement.puicarousel({
            numVisible: this.numVisible,
            firstVisible: this.firstVisible,
            headerText: this.headerText,
            effectDuration: this.effectDuration,
            circular: this.circular,
            breakpoint: this.breakpoint,
            responsive: this.responsive,
            autoplayInterval: this.autoplayInterval,
            easing: this.easing,
            pageLinks: this.pageLinks,
            style: this.style,
            styleClass: this.styleClass,
            enhanced: true
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.carouselElement.puicarousel('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.carouselElement.puicarousel('destroy');
        this.initialized = false;
        this.carouselElement = null;
    }

}