import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {TreeBasicDemo} from './treebasicdemo';
import {TreeTemplatingDemo} from './treetemplatingdemo';
import {TreeSelectionDemo} from './treeselectiondemo';
import {TreeFilterDemo} from './treefilterdemo';
import {TreeLazyDemo} from './treelazydemo';
import {TreeContextMenuDemo} from './treecontextmenudemo';
import {TreeDragDropDemo} from './treedragdropdemo';
import {TreeHorizontalDemo} from './treehorizontaldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
            {path:'',component: TreeBasicDemo},
            {path:'templating',component: TreeTemplatingDemo},
            {path:'selection',component: TreeSelectionDemo},
            {path:'filter',component: TreeFilterDemo},
            {path:'lazy',component: TreeLazyDemo},
            {path:'contextmenu',component: TreeContextMenuDemo},
            {path:'dragdrop',component: TreeDragDropDemo},
            {path:'horizontal',component: TreeHorizontalDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class TreeDemoRoutingModule {}
