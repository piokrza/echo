import { FinancesFrameComponent } from './finances-frame.component';

import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategoriesService, TransactionsService } from '#finances/service';

const activatedRouteStub = {};
const authStub = {};
const categoriesServiceStub = {
  getCategories$: vi.fn().mockReturnValue(of({})),
};
const transactionsServiceStub = {
  getTransactions$: vi.fn().mockReturnValue(of({})),
};

describe('FinancesFrameComponent', () => {
  let component: FinancesFrameComponent;
  let fixture: ComponentFixture<FinancesFrameComponent>;

  beforeEach(async () => {
    const providers: Provider[] = [
      { provide: ActivatedRoute, useValue: activatedRouteStub },
      { provide: Auth, useValue: authStub },
      { provide: CategoriesService, useValue: categoriesServiceStub },
      { provide: TransactionsService, useValue: transactionsServiceStub },
    ];

    TestBed.configureTestingModule({ providers }).compileComponents();

    fixture = TestBed.createComponent(FinancesFrameComponent);
    component = fixture.componentInstance;
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFinancesData method', () => {
    const loadFinancesDataSpy = vi.spyOn(component as any, 'loadFinancesData');
    const getCategoriesSpy = vi.spyOn(categoriesServiceStub, 'getCategories$');
    const getTransactionsSpy = vi.spyOn(transactionsServiceStub, 'getTransactions$');

    component.ngOnInit();

    [loadFinancesDataSpy, getCategoriesSpy, getTransactionsSpy].forEach((spy) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
