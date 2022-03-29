import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });
    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it(`should have as title 'juultimesedler'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('juultimesedler');
    });
    it('should render title', () => {
        var _a;
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('.content span')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('juultimesedler app is running!');
    });
});
//# sourceMappingURL=app.component.spec.js.map