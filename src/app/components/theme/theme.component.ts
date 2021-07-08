import { ThemeService } from './../../../../projects/devsbc-components/src/lib/services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  theme = 'indigo-pink';
  options: any;
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.setTheme(this.theme);
    this.options = this.themeService.getThemeOptions();
  }

  public changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }

}
