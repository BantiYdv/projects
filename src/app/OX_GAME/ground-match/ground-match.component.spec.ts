import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundMatchComponent } from './ground-match.component';

describe('GroundMatchComponent', () => {
  let component: GroundMatchComponent;
  let fixture: ComponentFixture<GroundMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroundMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroundMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
