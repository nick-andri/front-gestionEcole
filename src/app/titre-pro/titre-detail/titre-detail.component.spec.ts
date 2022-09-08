import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreDetailComponent } from './titre-detail.component';

describe('TitreDetailComponent', () => {
  let component: TitreDetailComponent;
  let fixture: ComponentFixture<TitreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
