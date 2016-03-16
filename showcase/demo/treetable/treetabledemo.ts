import {Component,OnInit} from 'angular2/core';
import {TreeTable} from '../../../components/treetable/treetable';
import {Column} from '../../../components/column/column';
import {TreeNode} from '../../../components/api/treenode';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {NodeService} from '../service/nodeservice';
import {Growl} from '../../../components/growl/growl';
import {Message} from '../../../components/api/message';
import {Header} from '../../../components/common/header';

@Component({
    templateUrl: 'showcase/demo/treetable/treetabledemo.html',
    directives: [TreeTable,Column,TabView,Growl,TabPanel,Header,CodeHighlighter,ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS,NodeService]
})
export class TreeTableDemo implements OnInit {
    
    msgs: Message[];
    
    files: TreeNode[];
        
    selectedFile: TreeNode;
    
    selectedFiles: TreeNode[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }
}