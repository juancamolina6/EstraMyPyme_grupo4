import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogomassloganComponent } from './logomasslogan.component';

describe('LogomassloganComponent', () => {
  let component: LogomassloganComponent;
  let fixture: ComponentFixture<LogomassloganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogomassloganComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogomassloganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
