import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // https://ionicframework.com/docs/building/storage
  constructor(private storage: Storage)
  {
    this.storage.ready().then(() => {
      console.log("Settings ready!");

      this.isTutorialCompleted(res => {
        console.log("Tutorial completed: " + res);
      });

    });
  }


  set(key: string, value: any)
  {
    this.storage.set(key, value);
  }

  get(key: string) : Promise<any>
  {
    return this.storage.get(key);
  }



  isTutorialCompleted(callback)
  {
    this.storage.get("tutorial_completed").then((val) => {
      if (val == null)
        callback(false);
      else callback(val);
    });
  }

  setTutorialCompleted(value : boolean)
  {
    this.set("tutorial_completed", value);
  }

}
