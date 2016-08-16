import {NgModule,Component,ElementRef,AfterContentInit,Input,Output,EventEmitter,ContentChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../common';

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;
    
    public tabs: AccordionTab[] = [];

    constructor(protected el: ElementRef) {}

    addTab(tab: AccordionTab) {
        this.tabs.push(tab);
    }    
}

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-helper-reset ui-state-default" [ngClass]="{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}"
            (click)="toggle($event)" (mouseenter)="hover = true" (mouseleave)="hover=false">
            <span class="fa fa-fw" [ngClass]="{'fa-caret-down': selected, 'fa-caret-right': !selected}"></span>
            <a href="#" *ngIf="!headerFacet">{{header}}</a>
            <a href="#" *ngIf="headerFacet">
                <ng-content select="header"></ng-content>
            </a>
        </div>
        <div class="ui-accordion-content ui-helper-reset ui-widget-content" [style.display]="selected ? 'block' : 'none'">
            <ng-content></ng-content>
        </div>
    `
})
export class AccordionTab {

    @Input() header: string;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @ContentChild(Header) headerFacet;

    constructor(protected accordion: Accordion) {
        this.accordion.addTab(this);
    }

    toggle(event) {
        if(this.disabled) {
            event.preventDefault();
            return;
        }

        let index = this.findTabIndex();

        if(this.selected) {
            this.selected = !this.selected;
            this.accordion.onClose.emit({originalEvent: event, index: index});
        }
        else {
            if(!this.accordion.multiple) {
                for(var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                }
            }

            this.selected = true;

            this.accordion.onOpen.emit({originalEvent: event, index: index});
        }

        event.preventDefault();
    }

    findTabIndex() {
        let index = -1;
        for(var i = 0; i < this.accordion.tabs.length; i++) {
            if(this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Accordion,AccordionTab],
    declarations: [Accordion,AccordionTab]
})
export class AccordionModule { }