import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreCreateComponent } from './titre-create.component';

describe('TitreCreateComponent', () => {
  let component: TitreCreateComponent;
  let fixture: ComponentFixture<TitreCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
