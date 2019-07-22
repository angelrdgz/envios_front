import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBodyComponent } from './site-body.component';

describe('SiteBodyComponent', () => {
  let component: SiteBodyComponent;
  let fixture: ComponentFixture<SiteBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
