import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSharingTableComponent } from './file-sharing-table.component';

describe('FileSharingTableComponent', () => {
  let component: FileSharingTableComponent;
  let fixture: ComponentFixture<FileSharingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSharingTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileSharingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
