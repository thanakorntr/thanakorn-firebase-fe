import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseLogoutComponent } from './firebase-logout.component';

describe('FirebaseLogoutComponent', () => {
  let component: FirebaseLogoutComponent;
  let fixture: ComponentFixture<FirebaseLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
