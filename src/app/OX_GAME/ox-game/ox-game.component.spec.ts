import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxGameComponent } from './ox-game.component';

describe('OxGameComponent', () => {
  let component: OxGameComponent;
  let fixture: ComponentFixture<OxGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OxGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
