import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,EventEmitter,Renderer} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-dialog',
    template: `
        <div [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable}" 
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" [style.height.px]="height" (mousedown)="moveOnTop()">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top"
                (mousedown)="initDrag($event)" (mouseup)="endDrag($event)">
                <span class="ui-dialog-title">{{header}}</span>
                <a [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true,'ui-state-hover':hoverCloseIcon}" href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)" (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false">
                    <span class="fa fa-fw fa-close"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content">
                <ng-content></ng-content>
            </div>
            <ng-content select="footer"></ng-content>
            <div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"
                (mousedown)="initResize($event)"></div>
        </div>
    `,
    providers: [DomHandler]
})
export class Dialog implements AfterViewInit,OnDestroy {

    @Input() header: string;

    @Input() draggable: boolean = true;

    @Input() resizable: boolean = true;
    
    @Input() minWidth: number = 150;

    @Input() minHeight: number = 150;

    @Input() width: any;

    @Input() height: any;

    @Input() modal: boolean;

    @Input() showEffect: string;

    @Input() closeOnEscape: boolean = true;

    @Input() rtl: boolean;

    @Input() closable: boolean = true;

    @Input() responsive: boolean;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
    _visible: boolean;
    
    dragging: boolean;

    documentDragListener: any;
    
    resizing: boolean;

    documentResizeListener: any;
    
    documentResizeEndListener: any;
    
    documentResponsiveListener: any;
    
    lastPageX: number;
    
    lastPageY: number;
    
    mask: any;
            
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}
    
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
        let elementWidth = this.domHandler.getOuterWidth(container);
        let elementHeight = this.domHandler.getOuterHeight(container);
        if(elementWidth == 0 && elementHeight == 0) {
            container.style.visibility = 'hidden';
            container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(container);
            elementHeight = this.domHandler.getOuterHeight(container);
            container.style.display = 'none';
            container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = (viewport.width - elementWidth) / 2;
        let y = (viewport.height - elementHeight) / 2;

        container.style.left = x + 'px';
        container.style.top = y + 'px';
    }
    
    ngAfterViewInit() {
        this.center();
        
        if(this.draggable) {
            this.documentDragListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onDrag(event);
            });
        }
        
        if(this.resizable) {
            this.documentResizeListener = this.renderer.listenGlobal('body', 'mousemove', (event) => {
                this.onResize(event);
            });
            
            this.documentResizeEndListener = this.renderer.listenGlobal('body', 'mouseup', (event) => {
                if(this.resizing) {
                    this.resizing = false;
                }
            });
        }
        
        if(this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', (event) => {
                this.center();
            });
        }
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
    
    moveOnTop() {
        this.el.nativeElement.children[0].style.zIndex = ++PUI.zindex;
    }
    
    initDrag(event) {
        if(this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onDrag(event) {
        if(this.dragging) {
            let container = this.el.nativeElement.children[0];
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let leftPos = parseInt(container.style.left);
            let topPos = parseInt(container.style.top);

            container.style.left = leftPos + deltaX + 'px';
            container.style.top = topPos + deltaY + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    endDrag(event) {
        if(this.draggable) {
            this.dragging = false;
        }
    }
    
    initResize(event) {
        if(this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    onResize(event) {
        if(this.resizing) {
            let container = this.el.nativeElement.children[0];
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = this.domHandler.getOuterWidth(container);
            let containerHeight = this.domHandler.getOuterHeight(container);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;

            if(newWidth > this.minWidth)
                container.style.width = containerWidth + deltaX + 'px';
                
            if(newHeight > this.minHeight)
                container.style.height = containerHeight + deltaY + 'px';
            
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    
    ngOnDestroy() {
        this.mask = null;
        
        if(this.documentDragListener) {
            this.documentDragListener();
        }
        
        if(this.resizable) {
            this.documentResizeListener();
            this.documentResizeEndListener();
        }
        
        if(this.responsive) {
            this.documentResponsiveListener();
        }
    }

}