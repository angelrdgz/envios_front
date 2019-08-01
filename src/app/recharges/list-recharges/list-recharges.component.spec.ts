import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRechargesComponent } from './list-recharges.component';

describe('ListRechargesComponent', () => {
  let component: ListRechargesComponent;
  let fixture: ComponentFixture<ListRechargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRechargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRechargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
