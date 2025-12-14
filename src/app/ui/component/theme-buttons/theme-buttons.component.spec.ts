import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeButtonsComponent } from '#ui/component/theme-buttons';

describe('ThemeButtonsComponent', () => {
  let fixture: ComponentFixture<ThemeButtonsComponent>;
  let component: ThemeButtonsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ThemeButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle light/dark mode', () => {
    component.toggleThemeMode();
    expect(component.isDarkMode()).toBe(true);
  });

  it('should change theme', () => {
    component.themes.forEach((t) => {
      component.setTheme(t.value);
      expect(component.selectedTheme()).toBe(t.value);
    });
  });
});
