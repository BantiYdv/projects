import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDBComponent } from './client-db.component';

describe('ClientDBComponent', () => {
  let component: ClientDBComponent;
  let fixture: ComponentFixture<ClientDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
