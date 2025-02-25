import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColophonComponent } from './colophon.component';

describe('ColophonComponent', () => {
  let component: ColophonComponent;
  let fixture: ComponentFixture<ColophonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColophonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColophonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
