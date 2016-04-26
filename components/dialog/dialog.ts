import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-dialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" [style.display]="visible ? 'block' : 'none'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title">{{header}}</span>
                <a [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true,'ui-state-hover':hoverCloseIcon}" href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)" (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false">
                    <span class="fa fa-fw fa-close"></span>
                </a>
                <!--<a class="ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all" href="#" role="button" *ngIf="maximizable">
                    <span class="fa fa-fw fa-sort"></span>
                </a>
                <a class="ui-dialog-titlebar-icon ui-dialog-titlebar-minimize ui-corner-all" href="#" role="button" *ngIf="minimizable">
                    <span class="fa fa-fw fa-minus"></span>
                </a>-->
            </div>
            <div class="ui-dialog-content ui-widget-content">
                <ng-content></ng-content>
            </div>
            <ng-content select="footer"></ng-content>
        </div>
    `,
    providers: [DomHandler]
})
export class Dialog implements AfterViewInit,OnDestroy {

    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;
    
    @Input() minWidth: number;

    @Input() minHeight: number;

    @Input() width: any;

    @Input() height: any;

    @Input() modal: boolean;

    @Input() showEffect: string;

    @Input() hideEffect: string;

    @Input() effectDuration: any;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() minimizable: boolean;

    @Input() maximizable: boolean;

    @Input() responsive: boolean;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    @Output() onMinimize: EventEmitter<any> = new EventEmitter();

    @Output() onMaximize: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;
    
    mask: any;
        
    constructor(private el: ElementRef, private domHandler: DomHandler) {}
    
    @Input() get visible(): boolean {
        return this._visible;
    }

    set visible(val:boolean) {
        this._visible = val;
        
        if(this._visible) {
            this.el.nativeElement.children[0].style.zIndex = ++PUI.zindex;
        }
        
        if(this.modal) {
            if(this._visible)
                this.enableModality();
            else
                this.disableModality();
        }
    }
    
    center() {
        let container = this.el.nativeElement.children[0];
        container.style.visibility = 'hidden';
        container.style.display = 'block';
        let elementWidth = this.domHandler.getOuterWidth(container);
        let elementHeight = this.domHandler.getOuterHeight(container);
        container.style.display = 'none';
        container.style.visibility = 'visible';
        
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        container.style.left = x + 'px';
        container.style.top = y + 'px';
    }

    ngAfterViewInit() {
        this.center();
    }
    
    enableModality() {
        if(!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = this.el.nativeElement.children[0].style.zIndex - 1;
            this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
            document.body.appendChild(this.mask);
        }
    }
    
    disableModality() {
        if(this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    }
    
    hide(event) {
        this.onBeforeHide.emit(event);
        this.visibleChange.emit(false);
        this.onAfterHide.emit(event);
        event.preventDefault();
    }

    ngOnDestroy() {
        this.mask = null;
    }

}