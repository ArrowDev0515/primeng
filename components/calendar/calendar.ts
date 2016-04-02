import {Component,ElementRef,AfterContentInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {Button} from '../button/button';

@Component({
    selector: 'p-calendar',
    template:  `
        <input *ngIf="!inline" type="text" [attr.style]="style" [attr.class]="styleClass" [attr.placeholder]="placeholder"
                [value]="value||''" (input)="valueChange.emit($event.target.value)" [readonly]="readonlyInput"
                [disabled]="disabled" (mouseenter)="hovered=true" (mouseleave)="hovered=false" (focus)="focused=true" (blur)="focused=false"
                [ngClass]="{'ui-inputfield ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,
                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}"
        ><button type="button" icon="fa-calendar" pButton *ngIf="showIcon" (click)="onButtonClick($event)" class="ui-datepicker-trigger"></button>
        <div *ngIf="inline"></div>
    `,
    directives: [Button]
})
export class Calendar implements AfterContentInit,OnChanges,OnDestroy {

    @Input() value: string;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Input() readonlyInput: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Input() placeholder: string;

    @Input() inline: boolean = false;

    @Input() showAnim: string;

    @Input() dateFormat: string;

    @Input() showButtonPanel: boolean;

    @Input() monthNavigator: boolean;

    @Input() yearNavigator: boolean;

    @Input() numberOfMonths: number;

    @Input() showWeek: boolean;

    @Input() showOtherMonths: boolean;

    @Input() selectOtherMonths: boolean;

    @Input() defaultDate: any;

    @Input() minDate: any;

    @Input() maxDate: any;

    @Input() disabled: any;
    
    @Input() showIcon: boolean;

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    hovered: boolean;

    focused: boolean;

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterContentInit() {
        setTimeout(() => {
            jQuery(this.el.nativeElement.children[0]).datepicker({
                showAnim: this.showAnim,
                dateFormat: this.dateFormat,
                showButtonPanel: this.showButtonPanel,
                changeMonth: this.monthNavigator,
                changeYear: this.yearNavigator,
                numberOfMonths: this.numberOfMonths,
                showWeek: this.showWeek,
                showOtherMonths: this.showOtherMonths,
                selectOtherMonths: this.selectOtherMonths,
                defaultDate: this.defaultDate,
                minDate: this.minDate,
                maxDate: this.maxDate,
                onSelect: (dateText: string) => {
                    this.stopNgOnChangesPropagation = true;
                    this.onSelect.emit(dateText);
                    this.valueChange.emit(dateText);
                }
            });
            this.initialized = true;
        }, 10);

    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                if(key == 'value' && this.stopNgOnChangesPropagation) {
                    continue;
                }

                jQuery(this.el.nativeElement.children[0]).datepicker('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).datepicker('destroy');
        this.initialized = false;
    }
    
    onButtonClick(event,input) {
        jQuery(this.el.nativeElement.children[0]).focus();
    }
}