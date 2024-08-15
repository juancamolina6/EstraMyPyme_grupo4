import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsloginComponent } from './formslogin.component';

describe('FormsloginComponent', () => {
  let component: FormsloginComponent;
  let fixture: ComponentFixture<FormsloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
