import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleCreateComponent } from './ville-create.component';

describe('VilleCreateComponent', () => {
  let component: VilleCreateComponent;
  let fixture: ComponentFixture<VilleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
