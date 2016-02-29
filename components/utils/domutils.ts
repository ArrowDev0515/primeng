export class DomUtils {
    
    public static addClass(element: any, className: string):void {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }
    
    public static removeClass(element: any, className: string):void {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    
    public static hasClass(element: any, className: string):boolean {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
    
    public static siblings(element: any):any {
        return Array.prototype.filter.call(element.parentNode.children, function(child){
            return child !== element;
        });
    }

        
    public static on(element: any, eventName: string, eventHandler: any):void {
        element.addEventListener(eventName, eventHandler);
    }
    
    public static off(element: any, eventName: string, eventHandler: any):void {
        element.removeEventListener(eventName, eventHandler);
    }
    
    public static find(element: any, selector: string):any[] {
        return element.querySelectorAll(selector);
    }
    
    public static index(element: any): number {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (var i=0; i < children.length; i++) {
            if (children[i]==element) return num;
            if (children[i].nodeType==1) num++;
        }
        return -1;
    }
    
    public static scrollInView(container, item) {   
        let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item);
        
        if(offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }
    
    public static getOuterHeight(element): number {
        let height: number = element.offsetHeight;
        let style: any = getComputedStyle(element);

        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }
    
}