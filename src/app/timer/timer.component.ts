import { Component } from '@angular/core';

import { timer, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  // Variables for script
  public isRunning: boolean = false;
  public time: number = 0;
  public waitingCounter: number = 0;
  public intervalCounter: any = 0;

  // Text on page
  public startText = 'Start';
  public displayTimer: string = '';

  startTimer() {
    this.isRunning = !this.isRunning;
    this.setTimer();
  }

  holdTimer() {
    this.waitingCounter++;
    timer(500).subscribe(() => (this.waitingCounter = 0));
    if (this.waitingCounter > 1) {
      this.isRunning = false;
      this.setTimer(this.time);
    }
  }

  resetTimer() {
    this.time = 0;
    this.getDisplayTimer(this.time);
  }

  setTimer(newTime: number = 0) {
    switch (this.isRunning) {
      case true:
        this.startText = 'Stop';
        this.intervalCounter = interval(1000).subscribe(() => {
          this.time++;
          this.getDisplayTimer(this.time);
        });
        break;
      case false:
        this.startText = 'Start';
        this.intervalCounter.unsubscribe();
        this.time = newTime;
        this.getDisplayTimer(this.time);
        break;
    }
  }

  getDisplayTimer(time: number) {
    let minutes = '' + Math.floor((time % 3600) / 60);
    let seconds = '' + Math.floor((time % 3600) % 60);

    if (+minutes < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (+seconds < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }

    this.displayTimer = minutes + ':' + seconds;
  }
}
