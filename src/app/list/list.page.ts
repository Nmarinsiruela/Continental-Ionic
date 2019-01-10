import { Component } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import { SettingService } from '../helpers/settings.service';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  private langSelected: string;
  constructor(private service: SettingService, private translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.service.getStoredLanguage().then((language) => {
      this.langSelected = language;
    });
  }

  selectLanguage(language: string) {
    this.service.setLanguage(language);
    this.translate.use(language);
  }

}
