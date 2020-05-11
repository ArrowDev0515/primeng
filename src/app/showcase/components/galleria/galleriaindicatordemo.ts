import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ImageService } from '../../service/imageservice';

@Component({
    templateUrl: './galleriaindicatordemo.html',
    styleUrls: ['./galleriaindicator.scss']
})
export class GalleriaIndicatorDemo implements OnInit {
    
    images: any[];

    images2: any[];
    
    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private imageService: ImageService) { }

    ngOnInit() {
        this.imageService.getImages().then(images =>{ 
            this.images = images
            this.images2 = images.slice(0, 5);
        })
    }
}