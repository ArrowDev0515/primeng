import {NgModule,Component, ElementRef,AfterViewInit,OnDestroy,Input,Output,SimpleChange,EventEmitter,forwardRef,Renderer} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Slider),
  multi: true
};

@Component({
    selector: 'p-slider',
    template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-slider ui-widget ui-widget-content ui-corner-all':true,
            'ui-slider-horizontal':orientation == 'horizontal','ui-slider-vertical':orientation == 'vertical'}">
            <span class="ui-slider-handle ui-state-default ui-corner-all" (mousedown)="onMouseDown($event)" [ngStyle]="{'left':value + '%'}"></span>
        </div>
    `,
    providers: [SLIDER_VALUE_ACCESSOR,DomHandler]
})
export class Slider implements AfterViewInit,OnDestroy,ControlValueAccessor {

    @Input() animate: boolean;

    @Input() disabled: boolean;

    @Input() min: number = 0;

    @Input() max: number = 100;

    @Input() orientation: string = 'horizontal';

    @Input() step: number;

    @Input() range: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onSlideEnd: EventEmitter<any> = new EventEmitter();
    
    protected value: number;
        
    protected onModelChange: Function = () => {};
    
    protected onModelTouched: Function = () => {};
    
    protected dragging: boolean;
    
    protected dragListener: any;
    
    protected mouseupListener: any;
        
    protected initX: number;
    
    protected barWidth: number;
    
    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer) {}
    
    onMouseDown(event) {
        this.dragging = true;
        this.initX = this.el.nativeElement.children[0].getBoundingClientRect().left;
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    }

    ngAfterViewInit() {
        this.dragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
            if(this.dragging) {
                let value = (((event.pageX - this.initX) * 100) / (this.barWidth));
                if(event.pageX < this.initX)
                    value = this.min;
                else if (event.pageX > (this.initX + this.barWidth))
                    value = this.max;
                
                this.value = value;
                this.onModelChange(Math.floor(this.value));
            }
        });
        
        this.mouseupListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
            if(this.dragging) {
                this.dragging = false;
            }
        });
    }
    
    writeValue(value: any) : void {
        this.value = value||0;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    ngOnDestroy() {
        this.dragListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Slider],
    declarations: [Slider]
})
export class SliderModule { }