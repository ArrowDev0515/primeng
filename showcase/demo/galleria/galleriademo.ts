import {Component} from 'angular2/core';
import {Galleria} from '../../../components/galleria/galleria';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/galleria/galleriademo.html',
    directives: [Galleria,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GalleriaDemo {

    images: string[] = ['galleria1.jpg', 'galleria2.jpg', 'galleria3.jpg', 'galleria4.jpg', 'galleria5.jpg', 'galleria6.jpg', 'galleria7.jpg', 'galleria8.jpg',
        'galleria9.jpg', 'galleria10.jpg', 'galleria11.jpg', 'galleria12.jpg'];
}