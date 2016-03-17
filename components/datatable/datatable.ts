import {Component,ElementRef,AfterViewChecked,OnInit,OnDestroy,DoCheck,Input,Output,SimpleChange,EventEmitter,ContentChild,ContentChildren,IterableDiffers,Query,QueryList} from 'angular2/core';
import {Column} from '../column/column';
import {ColumnTemplateLoader} from '../column/columntemplateloader';
import {Header} from '../common/header';
import {Footer} from '../common/footer';
import {Paginator} from '../paginator/paginator';
import {InputText} from '../inputtext/inputtext';
import {LazyLoadEvent} from '../api/lazyload';
import {FilterMetadata} from '../api/lazyload';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-dataTable',
    template: `
        <div [attr.style]="style" [attr.class]="styleClass" [ngClass]="{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive}">
            <div class="ui-datatable-header ui-widget-header" *ngIf="header">
                <ng-content select="header"></ng-content>
            </div>
            <div class="ui-datatable-tablewrapper" *ngIf="!scrollable">
                <table>
                    <thead>
                        <tr *ngIf="!headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass"
                                (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': (sortField && col.field === sortField)}">
                                <span class="ui-column-title">{{col.header}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                            </th>
                        </tr>
                        <tr *ngFor="#headerRow of headerRows" class="ui-state-default">
                            <th #headerCell *ngFor="#col of headerRow.columns" [attr.style]="col.style" [attr.class]="col.styleClass" [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                                (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': (sortField && col.field === sortField)}">
                                <span class="ui-column-title">{{col.header}}</span>
                                <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                     [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr *ngIf="!footerRows">
                            <th *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" [ngClass]="{'ui-state-default':true}">{{col.footer}}</th>
                        </tr>
                        <tr *ngFor="#footerRow of footerRows">
                            <th *ngFor="#col of footerRow.columns" [attr.style]="col.style" [attr.class]="col.styleClass" 
                                [attr.colspan]="col.colspan" [attr.rowspan]="col.rowspan"
                                [ngClass]="{'ui-state-default':true}">{{col.footer}}</th>
                        </tr>
                    </tfoot>
                    <tbody class="ui-datatable-data ui-widget-content">
                        <tr #rowElement *ngFor="#rowData of dataToRender;#even = even; #odd = odd;" class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                (click)="onRowClick($event, rowData)" (dblclick)="rowDblclick($event,rowData)" 
                                [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                            <td *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" 
                                [ngClass]="{'ui-editable-column':col.editable}" (click)="switchCellToEditMode($event.target,col)">
                                <span class="ui-column-title" *ngIf="responsive">{{col.header}}</span>
                                <span class="ui-cell-data" *ngIf="!col.template">{{rowData[col.field]}}</span>
                                <span class="ui-cell-data" *ngIf="col.template">
                                    <p-columnTemplateLoader [column]="col" [rowData]="rowData"></p-columnTemplateLoader>
                                </span>
                                <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]" (blur)="switchCellToViewMode($event.target)" (keydown)="onCellEditorKeydown($event)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="ui-widget-header ui-datatable-scrollable-header" *ngIf="scrollable">
                <div class="ui-datatable-scrollable-header-box">
                    <table>
                        <thead>
                            <tr>
                                <th #headerCell *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass"
                                    (click)="sort(col)" (mouseenter)="hoveredHeader = $event.target" (mouseleave)="hoveredHeader = null"
                                    [ngClass]="{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': col.field === sortField}">
                                    <span class="ui-column-title">{{col.header}}</span>
                                    <span class="ui-sortable-column-icon fa fa-fw fa-sort" *ngIf="col.sortable"
                                         [ngClass]="{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}"></span>
                                    <input type="text" pInputText class="ui-column-filter" *ngIf="col.filter" (click)="onFilterInputClick($event)" (keyup)="onFilterKeyup($event.target.value, col.field, col.filterMatchMode)"/>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="ui-datatable-scrollable-body" *ngIf="scrollable">
                <table>
                    <tbody class="ui-datatable-data ui-widget-content">
                        <tr #rowElement *ngFor="#rowData of dataToRender;#even = even; #odd = odd;" class="ui-widget-content" (mouseenter)="hoveredRow = $event.target" (mouseleave)="hoveredRow = null"
                                (click)="onRowClick($event, rowData)" (dblclick)="rowDblclick($event,rowData)" 
                                [ngClass]="{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}">
                            <td *ngFor="#col of columns" [attr.style]="col.style" [attr.class]="col.styleClass" [ngClass]="{'ui-editable-column':col.editable}" (click)="switchCellToEditMode($event.target,col)">
                                <span class="ui-column-title" *ngIf="responsive">{{col.header}}</span>
                                <span class="ui-cell-data">{{rowData[col.field]}}</span>
                                <input type="text" class="ui-cell-editor ui-state-highlight" *ngIf="col.editable" [(ngModel)]="rowData[col.field]" (blur)="switchCellToViewMode($event.target)" (keydown)="onCellEditorKeydown($event)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" (onPageChange)="paginate($event)" *ngIf="paginator"></p-paginator>
            <div class="ui-datatable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="footer"></ng-content>
            </div>
        </div>
    `,
    directives: [Paginator,InputText,ColumnTemplateLoader],
    providers: [DomHandler]
})
export class DataTable implements AfterViewChecked,OnInit,DoCheck {

    @Input() value: any[];
        
    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() totalRecords: number;

    @Input() pageLinks: number = 5;

    @Input() responsive: boolean;

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() editable: boolean;

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onRowDblclick: EventEmitter<any> = new EventEmitter();

    @Input() filterDelay: number = 300;

    @Input() lazy: boolean;
    
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: string;

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Input() reorderableColumns: boolean;

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Input() scrollable: boolean;

    @Input() scrollHeight: any;

    @Input() scrollWidth: any;

    @Input() headerRows: any;
    
    @Input() footerRows: any;

    @Input() style: string;

    @Input() styleClass: string;
    
    @ContentChild(Header) header;

    @ContentChild(Footer) footer;

    private dataToRender: any[];

    private first: number = 0;
    
    private page: number = 0;

    private sortField: string;

    private sortOrder: number;

    private filterTimeout: any;

    private filters: {[s: string]: FilterMetadata;} = {};

    private filteredValue: any[];
    
    private columns: Column[];
    
    private columnsUpdated: boolean = false;
        
    differ: any;
    
    constructor(private el: ElementRef, private domHandler: DomHandler, differs: IterableDiffers, @Query(Column) cols: QueryList<Column>) {
        this.differ = differs.find([]).create(null);
        cols.changes.subscribe(_ => {
            this.columns = cols.toArray();
            this.columnsUpdated = true;
        });
    }

    ngOnInit() {
        if(this.lazy) {
            this.onLazyLoad.next({
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: null
            });
        }
    }
    
    ngAfterViewChecked() {
        if(this.columnsUpdated) {
            if(this.resizableColumns) {
                this.initResizableColumns();
            }

            if(this.reorderableColumns) {
                this.initColumnReordering();
            }
            
            if(this.scrollable) {
                this.initScrolling();
            }
            
            this.columnsUpdated = false;
        }
    }
     
    ngDoCheck() {
        let changes = this.differ.diff(this.value);

        if(changes) {
            if(this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    }
    
    updatePaginator() {
        //total records
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length: 0);
        
        //first
        if(this.totalRecords && this.first >= this.totalRecords) {
            let numberOfPages = Math.ceil(this.totalRecords/this.rows);
            this.first = Math.max((numberOfPages-1) * this.rows, 0);
        }
    }

    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        
        if(this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    }

    updateDataToRender(datasource) {
        if(this.paginator && datasource) {
            this.dataToRender = [];
            let startIndex = this.lazy ? 0 : this.first;
            for(let i = startIndex; i < (startIndex+ this.rows); i++) {
                if(i >= datasource.length) {
                    break;
                }

                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    }

    sort(column: Column) {
        if(!column.sortable) {
            return;
        }
        
        this.sortOrder = (this.sortField === column.field)  ? this.sortOrder * -1 : 1;
        this.sortField = column.field;

        if(this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            if(this.value) {
                this.value.sort((data1, data2) => {
                    let value1 = data1[this.sortField],
                    value2 = data2[this.sortField],
                    result = null;

                    if (value1 instanceof String && value2 instanceof String)
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                    return (this.sortOrder * result);
                });

                this.first = 0;

                if(this.hasFilter())
                    this.filter();
                else
                    this.updateDataToRender(this.value);
            }
        }
    }

    onRowClick(event, rowData) {
        if(!this.selectionMode) {
            return;
        }

        let selectionIndex = this.findIndexInSelection(rowData);
        let selected = selectionIndex != -1;
        let metaKey = (event.metaKey||event.ctrlKey);

        if(selected && metaKey) {
            if(this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.next(null);
            }
            else {
                this.selection.splice(selectionIndex,1);
                this.selectionChange.next(this.selection);
            }

            this.onRowUnselect.next({originalEvent: event, data: rowData});
        }
        else {
            if(this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.next(rowData);
            }
            else if(this.isMultipleSelectionMode()) {
                this.selection = (!metaKey) ? [] : this.selection||[];
                this.selection.push(rowData);
                this.selectionChange.next(this.selection);
            }

            this.onRowSelect.next({originalEvent: event, data: rowData});
        }
    }
    
    rowDblclick(event, rowData) {
        this.onRowDblclick.next({originalEvent: event, data: rowData});
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    findIndexInSelection(rowData: any) {
        let index: number = -1;

        if(this.selectionMode && this.selection) {
            if(this.isSingleSelectionMode()) {
                index = (this.selection == rowData) ? 0 : - 1;
            }
            else if(this.isMultipleSelectionMode()) {
                for(let i = 0; i  < this.selection.length; i++) {
                    if(this.selection[i] == rowData) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    isSelected(rowData) {
        return this.findIndexInSelection(rowData) != -1;
    }

    onFilterKeyup(value, field, matchMode) {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.filters[field] = {value: value, matchMode: matchMode};
            this.filter();
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    filter() {
        if(this.lazy) {
            this.onLazyLoad.next(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];

            for(let i = 0; i < this.value.length; i++) {
                let localMatch = true;

                for(let prop in this.filters) {
                    if(this.filters.hasOwnProperty(prop)) {
                        let filterMeta = this.filters[prop],
                            filterValue = filterMeta.value,
                            filterField = prop,
                            filterMatchMode = filterMeta.matchMode||'startsWith',
                            dataFieldValue = this.value[i][filterField];

                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if(!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if(!localMatch) {
                            break;
                        }
                    }
                }

                if(localMatch) {
                    this.filteredValue.push(this.value[i]);
                }
            }

            if(this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }

            if(this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length: this.value ? this.value.length: 0;
            }

            this.updateDataToRender(this.filteredValue||this.value);
        }
    }

    hasFilter() {
        let empty = true;
        for(let prop in this.filters) {
            if(this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty;
    }
    
    onFilterInputClick(event) {
        event.stopPropagation();
    }

    filterConstraints = {

        startsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().slice(0, filter.length) === filter;
        },

        contains(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter) !== -1;
        },

        endsWith(value, filter): boolean {
            if(filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if(value === undefined || value === null) {
                return false;
            }

            return value.indexOf(filter, value.length - filter.length) !== -1;
        }
    }

    switchCellToEditMode(element: any, column: Column) {
        if(!this.selectionMode && this.editable && column.editable) {
            let cell = this.findCell(element);
            if(!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                this.domHandler.addClass(cell, 'ui-cell-editing');
                this.domHandler.addClass(cell, 'ui-state-highlight');
                let editor = cell.querySelector('.ui-cell-editor').focus();
            }
        }
    }

    switchCellToViewMode(element: any) {
        if(this.editable) {
            let cell = this.findCell(element);
            this.domHandler.removeClass(cell, 'ui-cell-editing');
            this.domHandler.removeClass(cell, 'ui-state-highlight');
        }
    }

    onCellEditorKeydown(event) {
        if(this.editable) {
            if(event.keyCode == 13) {
                this.switchCellToViewMode(event.target);
            }
        }
    }

    findCell(element) {
        let cell = element;
        while(cell.tagName != 'TD') {
            cell = cell.parentElement;
        }

        return cell;
    }

    initResizableColumns() {
        jQuery(this.el.nativeElement.children[0]).puicolresize({
            mode: this.columnResizeMode,
            colResize: (event: Event, ui: PrimeUI.ColResizeEventParams) => {
                this.onColResize.next(ui.element);
            }
        });
    }

    initColumnReordering() {
        jQuery(this.el.nativeElement.children[0]).puicolreorder({
            colReorder: (event: Event, ui: PrimeUI.ColReorderEventParams) => {
                //right
                if(ui.dropSide > 0) {
                    this.columns.splice(ui.dropIndex + 1, 0, this.columns.splice(ui.dragIndex, 1)[0]);
                }
                //left
                else {
                    this.columns.splice(ui.dropIndex, 0, this.columns.splice(ui.dragIndex, 1)[0]);
                }

                this.onColReorder.next(ui);
            }
        });
    }

    initScrolling() {
        jQuery(this.el.nativeElement.children[0]).puitablescroll({
            scrollHeight: this.scrollHeight,
            scrollWidth: this.scrollWidth
        });
    }
    
    hasFooter() {
        if(this.footerRows) {
            return true;
        }
        else {
            if(this.columns) {
                for(let i = 0; i  < this.columns.length; i++) {
                    if(this.columns[i].footer) {
                        return true;
                    }
                }
            }
            
        }
        return false;
    }
    
    isEmpty() {
        return !this.dataToRender||(this.dataToRender.length == 0);
    }
    
    createLazyLoadMetadata(): LazyLoadEvent {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters
        };
    }
    
    ngOnDestroy() {
        if(this.resizableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolresize('destroy');
        }
        
        if(this.reorderableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolreorder('destroy');
        }
    }
}
