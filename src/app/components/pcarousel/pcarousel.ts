import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone } from '@angular/core';
import { PrimeTemplate, SharedModule, UniqueComponentId } from '../common/shared';
import { CommonModule } from '@angular/common';
@Component({
	selector: 'p-carousel',
	template: `
	
		<div [attr.id]="id" class="p-carousel p-component">
			<div class="p-carousel-content">
				<button [class]="['p-carousel-prev p-link']" (click)="navBackward()">
					<span class="p-carousel-prev-icon pi pi-chevron-left"></span>
				</button>
				<div class="p-carousel-container" [ngStyle]="{'height': false ? verticalContentHeight : 'auto'}">
					<div class="p-carousel-header">
						<ng-content select="p-header"></ng-content>
					</div>
					<div #itemsContainer class="p-carousel-items">
						<div *ngFor="let item of items; let index = index" [ngClass]= "{'p-carousel-item': true,'p-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
						'p-carousel-item-start': firstIndex() === index,
						'p-carousel-item-end': lastIndex() === index}">
							<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
						</div>
					</div>
					<div class="p-carousel-footer">
						<ng-content select="p-footer"></ng-content>
					</div>
				</div>
				<button [class]="['p-carousel-next p-link']" (click)="navForward()">
					<span class="p-carousel-next-icon pi pi-chevron-right"></span>
				</button>
			</div>
			<ul class="p-carousel-dots-content ui-helper-reset">
				<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'p-carousel-dot-item':true,'p-highlight': _activeIndex === i}">
					<button class="p-link" (click)="onDotClick($event, i)">
						<span [ngClass]="{'p-carousel-dot-icon pi':true, 'pi-circle-on': _activeIndex === i, 'pi-circle-off': !(_activeIndex === i)}"></span>
					</button>
				</li>
			</ul>
		</div>

	`,
	styleUrls: ['./pcarousel.css']
})
export class PCarousel implements OnInit, AfterContentInit {

	@Input() value;

	@Input() get activeIndex():number {
		return this._activeIndex;
	}
	set activeIndex(val:number) {
		this._activeIndex = val;
	}
		
	@Input() header = null;
		
	@Input() footer = null;
		
	@Input() get numVisible():number {
		return this._numVisible;
	}
	set numVisible(val:number) {
		this._numVisible = val;
	}
		
	@Input() get numScroll():number {
		return this._numVisible;
	}
	set numScroll(val:number) {
		this._numScroll = val;
	}
	
	@Input() responsive;
	
	@Input() orientation = "horizontal";
	
	@Input() verticalContentHeight = "300px";
	
	@Input() contentClass: String;

	@Input() dotsContentClass: String;

	@ViewChild('itemsContainer', { static: true }) itemsContainer: ElementRef;

	@Input() get items(): any[] {
		return this._items;
	};

	set items(val) {
		this._items = val;
	}

	@ContentChildren(PrimeTemplate) templates: QueryList<any>;

	_numVisible: number = 1;

	_numScroll: number = 1;

	_oldNumScroll: number = 0;

	_activeIndex: number = 0;

	carouselStyle:any;

	id:string;

	totalShiftedItems= this.activeIndex * this.numScroll * -1;

	isRemainingItemsAdded:boolean = false;

	animationTimeout:any;

	remainingItems: number;

	_items: any[];

	windowResizeListener: any;

	_responsiveSettings: any[];

	mockResponsiveSettings: any[];

	currentResponsiveSetingIndex: number = 0;

	public itemTemplate: TemplateRef<any>;

	constructor(public el: ElementRef, public zone: NgZone) { }

	ngOnInit() {
	}

	ngAfterContentInit() {

		this.id = UniqueComponentId();
		this.createStyle();
		this.calculatePosition();
		this.templates.forEach((item) => {
			switch (item.getType()) {
				case 'item':
					this.itemTemplate = item.template;
					break;

				default:
					this.itemTemplate = item.template;
					break;
			}
		});
	}

	createStyle() {
			if (!this.carouselStyle) {
				this.carouselStyle = document.createElement('style');
				this.carouselStyle.type = 'text/css';
				document.body.appendChild(this.carouselStyle);
			}

			let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${ (100/ this.numVisible) }%
			}
        `;

			if (this.responsive) {
				this.responsive.sort((data1, data2) => {
					const value1 = data1.breakpoint;
					const value2 = data2.breakpoint;
					let result = null;

					if (value1 == null && value2 != null)
						result = -1;
					else if (value1 != null && value2 == null)
						result = 1;
					else if (value1 == null && value2 == null)
						result = 0;
					else if (typeof value1 === 'string' && typeof value2 === 'string')
						result = value1.localeCompare(value2, undefined, { numeric: true });
					else
						result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

					return -1 * result;
				});

				for (let i = 0; i < this.responsive.length; i++) {
					let res = this.responsive[i];

					innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${ (100/ res.numVisible) }%
                        }
                    }
                `
				}
			}

			this.carouselStyle.innerHTML = innerHTML;
		}

		calculatePosition() {
			if (this.itemsContainer && this.responsive) {
				let windowWidth = window.innerWidth;
				let matchedResponsiveData = {
					numVisible: this.numVisible,
					numScroll: this.numScroll
				};

				for (let i = 0; i < this.responsive.length; i++) {
					let res = this.responsive[i];

					if (parseInt(res.breakpoint, 10) >= windowWidth) {
						matchedResponsiveData = res;
					}
				}
				
				if (this._numScroll !== matchedResponsiveData.numScroll) {
					let activeIndex = this._activeIndex;
					activeIndex = Math.floor((activeIndex * this._numScroll) / matchedResponsiveData.numScroll);

					this.totalShiftedItems = (matchedResponsiveData.numScroll * activeIndex) * -1;
					this._numScroll = matchedResponsiveData.numScroll;

					this.activeIndex = activeIndex;
				}

				if (this._numVisible !== matchedResponsiveData.numVisible) {
					this._numVisible = matchedResponsiveData.numVisible;
				}
			}
		}
		

		firstIndex() {
			return (this.totalShiftedItems * -1);
		}

		lastIndex() {
			return (this.totalShiftedItems * -1) + this.numVisible - 1;
		}

		totalDots() {
			return this.items ? Math.ceil((this.items.length - this._numVisible) / this._numScroll) + 1 : 0;
		}
		totalDotsArray() {
			let totalDots = Array(this.items ? Math.ceil((this.items.length - this._numVisible) / this._numScroll) + 1 : 0).fill(0);
			return totalDots;
		}

		navForward(e?,index?) {
			if (this._activeIndex < (this.totalDots() - 1)) {
				this.step(e, -1, index);
			}

			if (e && e.cancelable) {
				e.preventDefault();
			}
		}

		navBackward(e?,index?) {
			if (this._activeIndex !== 0) {
				this.step(e, 1, index);
			}

			if (e && e.cancelable) {
				e.preventDefault();
			}
		}

		onDotClick(e?, index?) {
			let activeIndex = this._activeIndex;

			if (index > activeIndex) {
				this.navForward(e, index);
			}
			else if (index < activeIndex) {
				this.navBackward(e, index);
			}
		}

		step(event, dir, index) {
			let totalShiftedItems = this.totalShiftedItems;

			if (index != null) {
				totalShiftedItems = (this._numScroll * index) * -1;
				this.isRemainingItemsAdded = false;
			}
			else {
				totalShiftedItems += (this._numScroll * dir);
				if (this.isRemainingItemsAdded) {
					totalShiftedItems += this.remainingItems - (this._numScroll * dir);
					this.isRemainingItemsAdded = false;
				}

				index = Math.abs(parseInt((totalShiftedItems / this._numScroll).toString(), 10));
			}

			// if (index === (this.totalDots - 1) && this.remainingItems > 0) {
			// 	totalShiftedItems += ((this.remainingItems * -1) - (this.d_numScroll * dir));
			// 	this.isRemainingItemsAdded = true;
			// }

			if (this.itemsContainer) {
				// this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100/ this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100/ this.d_numVisible)}%, 0, 0)`;
				this.itemsContainer.nativeElement.style.transform = `translate3d(${totalShiftedItems * (100/ this._numVisible)}%, 0, 0)`;
				this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';

				// if (this.animationTimeout) {
				// 	clearTimeout(this.animationTimeout);
				// }

				this.animationTimeout = setTimeout(() => {
					if (this.itemsContainer) {
						this.itemsContainer.nativeElement.style.transition = '';
					}
				}, 500);
			}

			this.totalShiftedItems = totalShiftedItems;

			this.activeIndex = index;
		}


	//new

	bindGlobalListeners() {
		if (this.responsive) {
			this.zone.runOutsideAngular(() => {
				if (!this.windowResizeListener) {
					this.windowResizeListener = this.onWindowResize.bind(this);
					window.addEventListener('resize', this.windowResizeListener);
				}
			});
		}
	}
	
	onWindowResize(event) {

	}
	
}

@NgModule({
	imports: [CommonModule, SharedModule],
	exports: [CommonModule, PCarousel, SharedModule],
	declarations: [PCarousel]
})
export class PCarouselModule { }
