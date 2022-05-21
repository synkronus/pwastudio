import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesComponent } from './pages.component';
import { PRIMENG_MODULE, PRIMENG_PROVIDERS } from '../common/shared/primeng.modules';


describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PRIMENG_MODULE ],
      declarations: [ PagesComponent ],
			providers: [ PRIMENG_PROVIDERS ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
