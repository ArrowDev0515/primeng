import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonDemo} from './buttondemo';
import {ButtonDemoRoutingModule} from './buttondemo-routing.module';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AppCodeModule } from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		ButtonDemoRoutingModule,
        ButtonModule,
        TabViewModule,
		CodeHighlighterModule,
		AppCodeModule,
		ProgressSpinnerModule
	],
	declarations: [
		ButtonDemo
	]
})
export class ButtonDemoModule {}
