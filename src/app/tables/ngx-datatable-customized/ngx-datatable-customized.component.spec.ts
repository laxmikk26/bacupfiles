import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableCustomizedComponent } from './ngx-datatable-customized.component';

describe('NgxDatatableCustomizedComponent', () => {
  let component: NgxDatatableCustomizedComponent;
  let fixture: ComponentFixture<NgxDatatableCustomizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDatatableCustomizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDatatableCustomizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
