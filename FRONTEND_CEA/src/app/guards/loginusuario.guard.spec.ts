import { TestBed } from '@angular/core/testing';

import { LoginusuarioGuard } from './loginusuario.guard';

describe('LoginusuarioGuard', () => {
  let guard: LoginusuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginusuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
