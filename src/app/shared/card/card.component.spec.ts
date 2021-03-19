import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title when available', () => {
    // assume
    component.title = 'Card Title';

    // act
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h2.title');

    // assert
    expect(titleElement.innerText).toEqual('CARD TITLE');
  });

  it(`should not show title when it's not available`, () => {
    // assume

    // act
    const titleElement = fixture.nativeElement.querySelector('h2.title');

    // assert
    expect(titleElement).toBeNull();
  });
});
