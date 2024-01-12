import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDBComponent } from './employee-db.component';

describe('EmployeeDBComponent', () => {
  let component: EmployeeDBComponent;
  let fixture: ComponentFixture<EmployeeDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
