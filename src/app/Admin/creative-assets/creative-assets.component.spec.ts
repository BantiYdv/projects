import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeAssetsComponent } from './creative-assets.component';

describe('CreativeAssetsComponent', () => {
  let component: CreativeAssetsComponent;
  let fixture: ComponentFixture<CreativeAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAssetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreativeAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
