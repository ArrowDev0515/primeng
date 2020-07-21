import {NgModule,Component,OnDestroy,Input,Output,EventEmitter,AfterContentInit,Optional,ElementRef,ChangeDetectionStrategy,ContentChildren,QueryList,TemplateRef, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {Message,PrimeTemplate,MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="p-messages p-component" role="alert" [ngStyle]="style" [class]="styleClass"
                    [@messageAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}">
            <ng-container *ngIf="!contentTemplate; else staticMessage">
                <div *ngFor="let msg of value" [ngClass]="'p-message p-message-' + msg.severity" role="alert">
                    <div class="p-message-wrapper">
                        <span class="p-message-icon pi" [ngClass]="{'pi-info-circle': msg.severity === 'info', 
                            'pi-check': msg.severity === 'success',
                            'pi-exclamation-triangle': msg.severity === 'warn',
                            'pi-times-circle': msg.severity === 'error'}"></span>
                        <ng-container *ngIf="!escape; else escapeOut">
                            <span *ngIf="msg.summary" class="p-message-summary" [innerHTML]="msg.summary"></span>
                            <span *ngIf="msg.detail" class="p-message-detail" [innerHTML]="msg.detail"></span>
                        </ng-container>
                        <ng-template #escapeOut>
                            <span *ngIf="msg.summary" class="p-message-summary">{{msg.summary}}</span>
                            <span *ngIf="msg.detail" class="p-message-detail">{{msg.detail}}</span>
                        </ng-template>
                        <button class="p-message-close p-link" (click)="clear($event)" *ngIf="closable" type="button">
                            <i class="p-message-close-icon pi pi-times"></i>
                        </button>
                    </div>
                </div>
            </ng-container>
            <ng-template #staticMessage>
                <div [ngClass]="'p-message p-message-' + severity" role="alert">
                    <div class="p-message-wrapper">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </div>
                </div>
            </ng-template>
            </div>
    `,
    animations: [
        trigger('messageAnimation', [
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => *', [
                style({transform: 'translateY(-25%)', opacity: 0}),
                animate('{{showTransitionParams}}')
            ]),
            transition('* => void', [
                animate(('{{hideTransitionParams}}'), style({
                    opacity: 0,
                    transform: 'translateY(-25%)'
                }))
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./messages.css']
})
export class Messages implements AfterContentInit, OnDestroy {

    @Input() value: Message[];

    @Input() closable: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() enableService: boolean = true;

    @Input() key: string;

    @Input() escape: boolean = true;

    @Input() severity: string;

    @Input() showTransitionOptions: string = '300ms ease-out';

    @Input() hideTransitionOptions: string = '250ms ease-in';

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    messageSubscription: Subscription;

    clearSubscription: Subscription;

    contentTemplate: TemplateRef<any>;

    constructor(@Optional() public messageService: MessageService, public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });

        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages: any) => {
                if (messages) {
                    if (messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
                    }

                    this.cd.markForCheck();
                }
            });

            this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
                if (key) {
                    if (this.key === key) {
                        this.value = null;
                    }
                }
                else {
                    this.value = null;
                }

                this.cd.markForCheck();
            });
        }
    }

    hasMessages() {
        let parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || this.value && this.value.length > 0;
        }

        return false;
    }

    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);

        event.preventDefault();
    }

    get icon(): string {
        const severity = this.severity || (this.hasMessages() ? this.value[0].severity : null);

        if (this.hasMessages()) {
            switch(severity) {
                case 'success':
                    return 'pi-check';
                break;

                case 'info':
                    return 'pi-info-circle';
                break;

                case 'error':
                    return 'pi-times';
                break;

                case 'warn':
                    return 'pi-exclamation-triangle';
                break;

                default:
                    return 'pi-info-circle';
                break;
            }
        }

        return null;
    }

    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }

        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Messages],
    declarations: [Messages]
})
export class MessagesModule { }
