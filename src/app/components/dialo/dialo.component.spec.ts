import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoComponent } from './dialo.component';

describe('DialoComponent', () => {
  let component: DialoComponent;
  let fixture: ComponentFixture<DialoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
