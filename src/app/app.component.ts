import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PlayerService } from './helpers/PlayerService';
import { AppConstants } from './helpers/Constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Continental++',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pService: PlayerService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkStorage();
    });

  }

  async checkStorage() {
    const players = await this.pService.getStoredPlayers();
    const round = await this.pService.getStoredRound();
    if (players.getValue().length > 0) {
      if (round.getValue() < 7) {
        this.navCtrl.navigateForward(AppConstants.GAME_URL);
      } else if (round.getValue() === 7) {
        this.navCtrl.navigateForward(AppConstants.END_URL);
      } else {
        console.log ('Error:', players, round);
      }
    }
  }
}
