import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../api/menumodel';
import {Location} from '@angular/common';
import {Router} from '@angular/router-deprecated';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}"
                    (mouseenter)="onItemMouseEnter($event, item)" (mouseleave)="onItemMouseLeave($event, item)">
                    <a #link [href]="getItemUrl(child)" class="ui-menuitem-link ui-corner-all" [ngClass]="{'ui-state-hover':link==activeLink}" (click)="itemClick($event, child)">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-contextMenuSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-contextMenuSub>
                </li>
            </template>
        </ul>
    `,
    directives: [ContextMenuSub],
    providers: [DomHandler]
})
export class ContextMenuSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    constructor(private domHandler: DomHandler, private router: Router, private location: Location) {}
    
    activeItem: any;
    
    activeLink: any;
            
    onItemMouseEnter(event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        let nextElement =  item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
                        
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    }
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
    itemClick(event, item: MenuItem) {
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit(event);
        }
        
        if(!item.url) {
            event.preventDefault();
        }
    }
    
    listClick(event) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
    getItemUrl(item: MenuItem): string {
        if(item.url) {
            if(Array.isArray(item.url))
                return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
            else
                return item.url;
        }
        else {
            return '#';
        }
    }

}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div [ngClass]="'ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow'" 
            [class]="styleClass" [ngStyle]="style" [style.display]="visible ? 'block' : 'none'" [style.left.px]="left" [style.top.px]="top">
            <p-contextMenuSub [item]="model" root="root"></p-contextMenuSub>
        </div>
    `,
    providers: [DomHandler],
    directives: [ContextMenuSub]
})
export class ContextMenu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];
    
    @Input() global: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    visible: boolean;
    
    left: number;
    
    top: number;
    
    container: any;
    
    documentClickListener: any;
    
    documentRightClickListener: any;
        
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
        
        this.documentRightClickListener = this.renderer.listenGlobal('body', 'contextmenu', (event) => {
            this.show(event);
            event.preventDefault();
        });
    }
    
    toggle(event) {
        if(this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    }
    
    show(event) {
        this.left = event.pageX;
        this.top = event.pageY;
        this.visible = true;
        this.domHandler.fadeIn(this.container, 250);
    }
    
    hide() {
        this.visible = false;
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
        
    ngOnDestroy() {
        this.documentClickListener();
        this.documentRightClickListener();
        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

}