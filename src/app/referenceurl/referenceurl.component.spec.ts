import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceurlComponent } from './referenceurl.component';

describe('ReferenceurlComponent', () => {
  let component: ReferenceurlComponent;
  let fixture: ComponentFixture<ReferenceurlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceurlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
