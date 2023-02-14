import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheLastComponent } from './cache-last.component';

describe('CacheLastComponent', () => {
  let component: CacheLastComponent;
  let fixture: ComponentFixture<CacheLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheLastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
