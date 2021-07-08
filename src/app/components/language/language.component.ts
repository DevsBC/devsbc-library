import { LanguageService } from './../../../../projects/devsbc-components/src/lib/services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  lang!: string;
  constructor(private languageService: LanguageService) {
    this.languageService.getCurrentLang().subscribe((lang) => this.lang = lang);
  }

  ngOnInit(): void {
  }

  public switchLang(lang: string): void {
    this.languageService.setCurrentLang(lang);
  }

}
