import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user successfully', () => {
    const dummyUser = {
      username: 'TestUser',
      password: 'password123'
    };

    service.registerUser(dummyUser).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8088/api/usuarios/registrar');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({ success: true });
  });

  it('should handle error when registration fails', () => {
    const dummyUser = {
      username: 'TestUser',
      password: 'password123'
    };

    service.registerUser(dummyUser).subscribe(
      response => fail('should have failed with 500 error'),
      error => {
        expect(error.status).toBe(500);
        expect(error.error).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne('http://localhost:8088/api/usuarios/registrar');
    expect(req.request.method).toBe('POST');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
