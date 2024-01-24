import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeAssetsTableComponent } from './creative-assets-table.component';

describe('CreativeAssetsTableComponent', () => {
  let component: CreativeAssetsTableComponent;
  let fixture: ComponentFixture<CreativeAssetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAssetsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreativeAssetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
