import { ModeService } from './mode.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let modeService: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
    modeService = TestBed.inject(ModeService);

    /* Overwrite responses */
    spyOn(modeService, 'getMode').and.returnValue('test');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.app).toEqual('ip');
    expect(service.endpoint).toEqual('access');
    expect(service.sessionName).toEqual('inj-session');
  });

  it('should call initServerConnection', () => {
    service.initServerConnection();
    expect(service.mode).toBe('test', 'El Modo por defecto deberia ser `test`')
    console.log('Mode is defined:' + service.mode);
    expect(service.server).toBeDefined();
    expect(service.url).toBeDefined();
  });

});
