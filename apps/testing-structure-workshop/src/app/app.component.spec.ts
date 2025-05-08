import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Teenage Mutant Ninja Turtles',
    );
  });

  it(`should have as title 'testing-structure-workshop'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testing-structure-workshop');
  });

  // Check fakeAsync for the workshop
  it('should have a list of all characters', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // fixture.detectChanges();

    setTimeout(() => {
      expect(app.allCharacters.length).toBeGreaterThan(0);
    }, 0);
  });

  it('should have a list of top characters', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // fixture.detectChanges();

    setTimeout(() => {
      expect(app.topCharacters.length).toBeGreaterThan(0);
    });
  });
});
