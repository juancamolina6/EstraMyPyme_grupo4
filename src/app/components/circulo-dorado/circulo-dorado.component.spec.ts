import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirculoDoradoComponent } from './circulo-dorado.component';

describe('CirculoDoradoComponent', () => {
  let component: CirculoDoradoComponent;
  let fixture: ComponentFixture<CirculoDoradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CirculoDoradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CirculoDoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
