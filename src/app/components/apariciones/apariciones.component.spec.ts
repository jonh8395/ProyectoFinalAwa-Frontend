import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AparicionesComponent } from './apariciones.component';

describe('AparicionesComponent', () => {
  let component: AparicionesComponent;
  let fixture: ComponentFixture<AparicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AparicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AparicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
