import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unlock } from './unlock';

describe('Unlock', () => {
  let component: Unlock;
  let fixture: ComponentFixture<Unlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unlock],
    }).compileComponents();

    fixture = TestBed.createComponent(Unlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
