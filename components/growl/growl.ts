import {Component,ElementRef,AfterViewInit,DoCheck,OnDestroy,Input,Output,EventEmitter,Renderer,IterableDiffers} from 'angular2/core';
import {Message} from '../api/message';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-growl',
    template: `
        <div class="ui-growl ui-widget" [style.zIndex]="zIndex">
            <div *ngFor="#msg of value" class="ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow" aria-live="polite"
                [ngClass]="{'ui-growl-message-info ':msg.severity == 'info','ui-growl-message-warning':msg.severity == 'warning','ui-growl-message-error':msg.severity == 'error'}">
                <div class="ui-growl-item">
                     <div class="ui-growl-icon-close fa fa-close" (click)="remove(msg)"></div>
                     <span class="ui-growl-image fa fa-2x ui-growl-image-info"
                        [ngClass]="{'fa-info-circle':msg.severity == 'info','fa-warning':msg.severity == 'warn','fa-close':msg.severity == 'error'}"></span>
                     <div class="ui-growl-message">
                        <span class="ui-growl-title">{{msg.summary}}</span>
                        <p>{{msg.detail}}</p>
                     </div>
                     <div style="clear: both;"></div>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Growl implements AfterViewInit,DoCheck,OnDestroy {

    @Input() sticky: boolean = false;

    @Input() life: number = 3000;

    @Input() value: Message[];
        
    differ: any;
    
    zIndex: number;
    
    container: any;
    
    stopDoCheckPropagation: boolean;
    
    timeout: any;
        
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
        this.zIndex = DomHandler.zindex;
    }

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.value);
        
        if(changes) {
            if(this.stopDoCheckPropagation) {
                this.stopDoCheckPropagation = false;
            }
            else if(this.value && this.value.length) {
                this.zIndex = ++DomHandler.zindex;
                this.domHandler.fadeIn(this.container, 250);
                
                if(!this.sticky) {
                    if(this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = setTimeout(() => {
                        this.removeAll();
                    }, this.life);
                }
            }
        }
    }
    
    remove(msg: Message) {
        this.stopDoCheckPropagation = true;
        this.value.splice(this.findMessageIndex(msg), 1);
    }
    
    removeAll() {
        if(this.value && this.value.length) {
            this.stopDoCheckPropagation = true;
            this.value.splice(0, this.value.length);
        }
    }
    
    findMessageIndex(msg: Message) {
        let index: number = -1;

        if(this.value && this.value.length) {
            for(let i = 0; i  < this.value.length; i++) {
                if(this.value[i] == msg) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    ngOnDestroy() {
        if(!this.sticky) {
            clearTimeout(this.timeout);
        }
    }

}