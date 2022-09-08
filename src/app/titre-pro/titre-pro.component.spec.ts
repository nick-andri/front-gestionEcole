import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreProComponent } from './titre-pro.component';

describe('TitreProComponent', () => {
  let component: TitreProComponent;
  let fixture: ComponentFixture<TitreProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
