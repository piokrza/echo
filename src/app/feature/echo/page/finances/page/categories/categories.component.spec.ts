import { CategoriesComponent } from './categories.component';

import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { of } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { TransactionCategoryFormComponent } from '#finances/component/transaction-category-form';
import { EchoTransactionCategory } from '#finances/model';
import { CategoriesService } from '#finances/service';

const mockCategory: EchoTransactionCategory = { id: '11', name: 'catName', type: 'all', uid: 'dwa', icon: '' };

const authStub = {};
const categoriesServiceStub = {
  getCategories$: vi.fn(() => of([])),
};
const messageServiceStub = {};
const confirmationServiceStub = {
  confirm: vi.fn(),
};
const dialogServiceStub = {
  open: vi.fn(),
};

const providers: Provider[] = [
  { provide: Auth, useValue: authStub },
  { provide: DialogService, useValue: dialogServiceStub },
  { provide: MessageService, useValue: messageServiceStub },
  { provide: CategoriesService, useValue: categoriesServiceStub },
  { provide: ConfirmationService, useValue: confirmationServiceStub },
];

describe('CategoriesComponent', () => {
  let fixture: ComponentFixture<CategoriesComponent>;
  let component: CategoriesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers,
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;

    vi.clearAllMocks();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke getCategories$ method on component initialization', () => {
    const getCategoriesSpy = vi.spyOn(categoriesServiceStub, 'getCategories$');
    component.ngOnInit();
    expect(getCategoriesSpy).toHaveBeenCalledOnce();
  });

  it('should open TransactionCategoryFormComponent on edit category action', () => {
    const openSpy = vi.spyOn(dialogServiceStub, 'open');

    component.editCategory(mockCategory);

    expect(openSpy).toHaveBeenCalledWith(TransactionCategoryFormComponent, {
      header: 'Edit category',
      closeOnEscape: true,
      closable: true,
      data: mockCategory,
    });
  });

  it('should open TransactionCategoryFormComponent on add category action', () => {
    const openSpy = vi.spyOn(dialogServiceStub, 'open');

    component.addCategory();

    expect(openSpy).toHaveBeenCalledWith(TransactionCategoryFormComponent, {
      header: 'Add category',
      closeOnEscape: true,
      closable: true,
      data: undefined,
    });
  });

  it('should invoke confirm dialog on delete category action', () => {
    const confirmSpy = vi.spyOn(confirmationServiceStub, 'confirm');

    component.deleteCategory('1');

    expect(confirmSpy).toHaveBeenCalledTimes(1);

    const confirmMethodParameter = confirmSpy.mock.calls[0][0];
    expect(confirmMethodParameter).toEqual({
      header: 'Do you want to delete this category?',
      closable: false,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: expect.any(Function),
    });
  });
});
