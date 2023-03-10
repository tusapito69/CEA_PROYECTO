import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionComponent } from './institucion.component';

describe('InstitucionComponent', () => {
  let component: InstitucionComponent;
  let fixture: ComponentFixture<InstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
