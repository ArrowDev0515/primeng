import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../api/menumodel';

@Component({
    selector: 'p-tieredMenuSub',
    template: `
        <ul class="ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow">
            <li *ngFor="let child of item.items" class="ui-menuitem ui-widget ui-corner-all ui-menu-parent">
                <a class="ui-menuitem-link ui-corner-all">
                    <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                    <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="child.icon"></span>
                    <span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <p-tieredMenuSub [item]="child" *ngIf="child.items"></p-tieredMenuSub>
            </li>
        </ul>
    `,
    directives: [TieredMenuSub]
})
export class TieredMenuSub {

    @Input() item: MenuItem;

}

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div [ngClass]="{'ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style" (click)="preventDocumentDefault=true">
            <ul class="ui-menu-list ui-helper-reset">
                <li *ngFor="let item of model" [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':item.items}">
                    <a #link [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" [ngClass]="{'ui-state-hover':link==hoveredItem}"
                        (mouseenter)="hoveredItem=$event.target" (mouseleave)="hoveredItem=null" (click)="itemClick($event, item)">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="item.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        <span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                    <p-tieredMenuSub [item]="item" *ngIf="item.items"></p-tieredMenuSub>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler],
    directives: [TieredMenuSub]
})
export class TieredMenu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    container: any;
    
    documentClickListener: any;
    
    preventDocumentDefault: any;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        if(this.popup) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
                if(!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }
    
    toggle(event) {
        if(this.container.offsetParent)
            this.hide();
        else
            this.show(event);
            
        this.preventDocumentDefault = true;
    }
    
    show(event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    }
    
    hide() {
        this.container.style.display = 'none';
    }
    
    itemClick(event, item: MenuItem) {
        if(!item.eventEmitter) {
            item.eventEmitter = new EventEmitter();
            item.eventEmitter.subscribe(item.command);
        }
        
        item.eventEmitter.emit(event);
        
        if(this.popup) {
            this.hide();
        }
    }
    
    ngOnDestroy() {
        if(this.popup) {
            this.documentClickListener();
        }
        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }
    
    hasSubMenu(): boolean {
        if(this.model) {
            for(var item of this.model) {
                if(item.items) {
                    return true;
                }
            }
        }
        return false;
    }
    
    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        
        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

}