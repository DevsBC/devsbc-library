import { ThemeModel } from './../models/theme.model';
import { Injectable } from '@angular/core';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly ANGULAR_MATERIAL_THEMES: ThemeModel[] = [
    {
      backgroundColor: '#fff',
      buttonColor: '#ffc107',
      headingColor: '#673ab7',
      label: 'Deep Purple & Amber',
      value: 'deeppurple-amber'
    },
    {
      backgroundColor: '#fff',
      buttonColor: '#ff4081',
      headingColor: '#3f51b5',
      label: 'Indigo & Pink',
      value: 'indigo-pink'
    },
    {
      backgroundColor: '#303030',
      buttonColor: '#607d8b',
      headingColor: '#e91e63',
      label: 'Pink & Blue Grey',
      value: 'pink-bluegrey'
    },
    {
      backgroundColor: '#303030',
      buttonColor: '#4caf50',
      headingColor: '#9c27b0',
      label: 'Purple & Green',
      value: 'purple-green'
    }
  ];

  constructor(private styleManager: StyleManagerService) { }

  public getThemeOptions(): ThemeModel[] {
    return this.ANGULAR_MATERIAL_THEMES;
  }

  public setTheme(themeToSet: string): void {
    this.styleManager.setStyle(
      'theme',
      `https://material.angular.io/${themeToSet}.css`
    );
    localStorage.setItem('theme', themeToSet);
  }

  public getTheme(theme: string): string {
    return localStorage.getItem('theme') || theme;
  }
}
