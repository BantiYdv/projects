import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeAssetComponent } from './creative-asset.component';

describe('CreativeAssetComponent', () => {
  let component: CreativeAssetComponent;
  let fixture: ComponentFixture<CreativeAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAssetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreativeAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
