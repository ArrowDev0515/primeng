import {Component, ElementRef, OnInit, OnDestroy, OnChanges, SimpleChange, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-checkbox',
    template: `
        <div class="ui-chkbox ui-widget">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" name="{{name}}" value="{{value}}" [checked]="isChecked(cb.value)"/>
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick(cb)"
                        (mouseover)="hover=true" (mouseout)="hover=false" 
                        [ngClass]="{'ui-state-hover':hover&&!disabled,'ui-state-active':cb.checked,'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-fw fa-check':cb.checked}"></span>
            </div>
        </div>
    `
})
export class Checkbox {

    @Input() value: any;

    @Input() name: string;

    @Input() disabled: boolean;

    @Input() model: any;
    
    @Input() checked: any;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() modelChange: EventEmitter<any> = new EventEmitter();
    
    @Output() checkedChange: EventEmitter<any> = new EventEmitter();

    hover: boolean;

    onClick(input) {
        if(this.disabled) {
            return;
        }
        
        this.onChange.next(!input.checked);

        if(this.model) {
            if (!input.checked)
                this.addValue(input.value);
            else
                this.removeValue(input.value);

            this.modelChange.next(this.model);
        }
        else {
            this.checkedChange.next(!input.checked);
        }
    }

    isChecked(value) {
        if(this.model)
            return this.findValueIndex(value) !== -1;
        else
            return this.checked;
    }

    removeValue(value) {
        var index = this.findValueIndex(value);
        if(index >= 0) {
            this.model.splice(index, 1);
        }
    }

    addValue(value) {
        this.model.push(value);
    }

    findValueIndex(value) {
        var index: number = -1;
        if(this.model) {
            for (var i = 0; i < this.model.length; i++) {
                if(this.model[i] == value) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }
}