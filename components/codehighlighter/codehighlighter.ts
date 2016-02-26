import {Directive, ElementRef, OnInit} from 'angular2/core';

declare var Prism: any;

@Directive({
    selector: '[pCode]'
})
export class CodeHighlighter implements OnInit {
    
    initialized: boolean;
    
    constructor(private el: ElementRef) {}
    
    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
    }
}



