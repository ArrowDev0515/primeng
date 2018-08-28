import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb } from './breadcrumb';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('Breadcrumb', () => {
  
    let breadcrumb: Breadcrumb;
    let fixture: ComponentFixture<Breadcrumb>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: 'test', component: Breadcrumb }
           ]),
          NoopAnimationsModule
        ],
        declarations: [
          Breadcrumb,
        ]
      });
      
      fixture = TestBed.createComponent(Breadcrumb);
      breadcrumb = fixture.componentInstance;
    });

    it('should be display by default', () => {
      fixture.detectChanges();
      
      const breadcrumbEl = fixture.debugElement.query(By.css('div')).nativeElement;
      expect(breadcrumbEl).toBeTruthy();
    });

    it('should be change style and styleClass', () => {
      breadcrumb.style = {'primeng' : 'rocks!'};
      breadcrumb.styleClass = "Primeng ROCKS!";
      fixture.detectChanges();
      
      const breadcrumbEl = fixture.debugElement.query(By.css('div'));
      expect(breadcrumbEl.nativeElement.className).toContain("Primeng ROCKS!");
      expect(breadcrumbEl.styles.primeng).toEqual("rocks!")
    });

    it('should be display home', () => {
      breadcrumb.home = {icon: 'pi pi-home'};
      fixture.detectChanges();
      
      const homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home'));
      expect(homeEl).toBeTruthy();
    });

    it('should be change home icon', () => {
      breadcrumb.home = {icon: 'primeng'};
      fixture.detectChanges();
      
      const homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home')).query(By.css('span')).nativeElement;
      expect(homeEl.className).toContain('primeng');
    });

    it('should be display items', () => {
      breadcrumb.home = {icon: 'pi pi-home'};
      breadcrumb.model = [
        {label:'Squad'},
        {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
    ];
      fixture.detectChanges();
      
      const itemsEl = fixture.debugElement.query(By.css('ul'));
      console.log(itemsEl)
      expect(itemsEl.children[2].children[0]).toBeTruthy();
      expect(itemsEl.children[2].children[0].nativeElement.textContent).toEqual("Squad");
      expect(itemsEl.children.length).toEqual(5);
    });

    it('should be call itemClick when click home ', () => {
      breadcrumb.home = {icon: 'pi pi-home'};
      breadcrumb.model = [
        {label:'Squad'},
        {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
    ];
      fixture.detectChanges();
      const itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough()
      const homeEl = fixture.debugElement.query(By.css('.ui-breadcrumb-home')).query(By.css('a')).nativeElement;
      homeEl.click();
      fixture.detectChanges();

      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should be call itemClick when click item ', () => {
      breadcrumb.home = {icon: 'pi pi-home'};
      breadcrumb.model = [
        {label:'Squad'},
        {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link'}
    ];
      fixture.detectChanges();
      const itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough()
      const squadEl = fixture.debugElement.query(By.css('ul')).children[2].children[0].nativeElement;
      squadEl.click();
      fixture.detectChanges();

      expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should be call itemClick(routerLink) when click item ', () => {
      breadcrumb.home = {icon: 'pi pi-home'};
      breadcrumb.model = [
        {label:'Squad'},
        {label:'Lionel Messi', routerLink: 'test', icon: 'pi pi-external-link'}
    ];
      fixture.detectChanges();
      const itemClickSpy = spyOn(breadcrumb, 'itemClick').and.callThrough()
      const messiEl = fixture.debugElement.query(By.css('ul')).children[4].children[0].nativeElement;
      messiEl.click();
      fixture.detectChanges();

      expect(itemClickSpy).toHaveBeenCalled();
    });


});
