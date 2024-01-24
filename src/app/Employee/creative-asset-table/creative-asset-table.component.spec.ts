import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeAssetTableComponent } from './creative-asset-table.component';

describe('CreativeAssetTableComponent', () => {
  let component: CreativeAssetTableComponent;
  let fixture: ComponentFixture<CreativeAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAssetTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreativeAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
