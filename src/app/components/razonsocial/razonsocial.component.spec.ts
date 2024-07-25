import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazonsocialComponent } from './razonsocial.component';

describe('RazonsocialComponent', () => {
  let component: RazonsocialComponent;
  let fixture: ComponentFixture<RazonsocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RazonsocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RazonsocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
