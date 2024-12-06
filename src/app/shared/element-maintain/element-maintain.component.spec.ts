import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMaintainComponent } from './element-maintain.component';

describe('ElementMaintainComponent', () => {
  let component: ElementMaintainComponent;
  let fixture: ComponentFixture<ElementMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
