import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeAssetsUserComponent } from './creative-asset.component';

describe('CreativeAssetComponent', () => {
  let component: CreativeAssetsUserComponent;
  let fixture: ComponentFixture<CreativeAssetsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAssetsUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreativeAssetsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
