import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {PCarouselDemo} from './pcarouseldemo';
import {CarouselDemoRoutingModule} from './pcarouseldemo-routing.module';
import {ButtonModule} from '../../../components/button/button';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';
import { PCarouselModule } from 'src/app/components/pcarousel/pcarousel';

@NgModule({
	imports: [
		CommonModule,
		CarouselDemoRoutingModule,
        ButtonModule,
        TabViewModule,
		CodeHighlighterModule,
		PCarouselModule
	],
	declarations: [
		PCarouselDemo
	]
})
export class PCarouselDemoModule {}
