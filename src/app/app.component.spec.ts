import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: any;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('deve criar o app', () => {
    expect(app).toBeTruthy();
  });

  it(`deve ter o título 'usuario-cadastro-frontend'`, () => {
    expect(app.title).toEqual('usuario-cadastro-frontend');
  });

  it('deve renderizar o título', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sistema de Cadastro'); 
  });

});
