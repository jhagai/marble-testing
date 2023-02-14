import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHelloComponent } from './map-hello.component';

describe('MapHelloComponent', () => {
  let component: MapHelloComponent;
  let fixture: ComponentFixture<MapHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
