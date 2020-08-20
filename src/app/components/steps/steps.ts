import {NgModule,Component,Input,Output,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'p-steps',
    template: `
        <div [ngClass]="{'p-steps p-component':true,'p-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="p-steps-item" #menuitem [ngStyle]="item.style" [class]="item.styleClass" role="tab" [attr.aria-selected]="i === activeIndex" [attr.aria-expanded]="i === activeIndex"
                    [ngClass]="{'p-highlight p-steps-current': isActive(item, i), 'p-disabled':(item.disabled || !isActive(item, index))}">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" 
                        (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <span class="p-steps-number">{{i + 1}}</span>
                        <span class="p-steps-title">{{item.label}}</span>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event, item, i)" (keydown.enter)="itemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" 
                            [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-steps-number">{{i + 1}}</span>
                            <span class="p-steps-title">{{item.label}}</span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./steps.css']
})
export class Steps {
    
    @Input() activeIndex: number = 0;
    
    @Input() model: MenuItem[];
    
    @Input() readonly: boolean =  true;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router, private route:ActivatedRoute) { }
    
    itemClick(event: Event, item: MenuItem, i: number) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            debugger;
            return;
        }
        
        this.activeIndexChange.emit(i);
                
        if (!item.url) {
            event.preventDefault();
        }
        
        if (item.command) {            
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }

    isClickableRouterLink(item: MenuItem) {
        return item.routerLink && !this.readonly && !item.disabled;
    }

    isActive(item: MenuItem, index: number) {
        if (item.routerLink)
            return this.router.isActive(item.routerLink, false) || this.router.isActive(this.router.createUrlTree([item.routerLink], {relativeTo: this.route}).toString(), false);
        else    
            return index === this.activeIndex;
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Steps,RouterModule],
    declarations: [Steps]
})
export class StepsModule { }