import { TestBed } from '@angular/core/testing';

import { HttpAudithorService } from './http.audithor.service';

describe('Http.AudithorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpAudithorService = TestBed.get(HttpAudithorService);
    expect(service).toBeTruthy();
  });
});
