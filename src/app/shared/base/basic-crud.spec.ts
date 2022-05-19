import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicCRUDComponent } from './basic-crud';


describe('BasicCRUDComponent', () => {
  let component: BasicCRUDComponent;
  let fixture: ComponentFixture<BasicCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
