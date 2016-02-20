import {Component, ElementRef, OnInit, OnDestroy, OnChanges, AfterViewInit, Input, Output, SimpleChange, EventEmitter} from 'angular2/core';
import {AccordionTab} from './accordiontab';

@Component({
    selector: 'p-accordion',
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion implements OnDestroy, OnChanges, AfterViewInit {

    @Input() activeIndex: number = 0;

    @Input() multiple: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    tabPanels: AccordionTab[];

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.tabPanels = [];
        this.initialized = false;
    }

    addTab(tab: AccordionTab) {
        this.tabPanels.push(tab);
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).puiaccordion({    
            activeIndex: this.activeIndex,
            multiple: this.multiple,
            change: (event: Event, ui: any) => {
                this.stopNgOnChangesPropagation = true;
                this.activeIndexChange.next(ui.index);
                this.onChange.next({originalEvent: event, ui: ui});
            }
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (this.initialized) {
            for (var key in changes) {
                if (key == 'activeIndex' && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }

                jQuery(this.el.nativeElement.children[0]).puiaccordion('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).puiaccordion('destroy');
        this.initialized = false;
    }
}