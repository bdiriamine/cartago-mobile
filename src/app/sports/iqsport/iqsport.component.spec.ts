import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqsportComponent } from './iqsport.component';

describe('IqsportComponent', () => {
  let component: IqsportComponent;
  let fixture: ComponentFixture<IqsportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IqsportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IqsportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
