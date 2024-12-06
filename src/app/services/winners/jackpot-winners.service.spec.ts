import { TestBed } from '@angular/core/testing';

import { JackpotWinnersService } from './jackpot-winners.service';

describe('JackpotWinnersService', () => {
  let service: JackpotWinnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JackpotWinnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
