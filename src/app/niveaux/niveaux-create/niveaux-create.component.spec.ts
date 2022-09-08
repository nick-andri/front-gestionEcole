import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauxCreateComponent } from './niveaux-create.component';

describe('NiveauxCreateComponent', () => {
  let component: NiveauxCreateComponent;
  let fixture: ComponentFixture<NiveauxCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauxCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveauxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
