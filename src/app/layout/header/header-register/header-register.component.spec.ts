import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegisterComponent } from './header-register.component';

describe('HeaderRegisterComponent', () => {
  let component: HeaderRegisterComponent;
  let fixture: ComponentFixture<HeaderRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
