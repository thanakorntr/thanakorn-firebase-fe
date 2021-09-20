import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseLoginHandlerComponent } from './firebase-login-handler.component';

describe('FirebaseLoginHandlerComponent', () => {
  let component: FirebaseLoginHandlerComponent;
  let fixture: ComponentFixture<FirebaseLoginHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseLoginHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseLoginHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
