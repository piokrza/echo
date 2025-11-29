import { Injectable, isSignal } from '@angular/core';

import { Store } from '#core/store';

interface TestStoreState {
  isProcessing: boolean;
  testThemeColor: 'white' | 'black';
}

const initialStateValue: TestStoreState = {
  isProcessing: false,
  testThemeColor: 'white',
};

@Injectable({ providedIn: 'root' })
class TestStore extends Store<TestStoreState> {
  constructor() {
    super(initialStateValue);
  }
}

describe('Store', () => {
  let service: TestStore;

  beforeEach(() => {
    service = new TestStore();
  });

  it('should return initial value', () => {
    expect(service.state()).toBe(initialStateValue);
  });

  it('should return state as Signal', () => {
    expect(isSignal(service.state)).toBe(true);
  });

  it('should update value', () => {
    service.update('testThemeColor', 'black');
    expect(service.select('testThemeColor')()).toBe('black');
    expect(service.state().testThemeColor).toBe('black');
  });

  it('should clear state', () => {
    service.update('testThemeColor', 'black');
    service.update('isProcessing', true);

    service.clear();

    expect(service.state()).toBe(initialStateValue);
  });

  it('should return state slice value', () => {
    expect(service.select('testThemeColor')()).toBe(initialStateValue.testThemeColor);
  });
});
