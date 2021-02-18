import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { Movie } from '../data.service';
import { genre_emoji, genre_color } from '../utils';

interface Shot {
  id: number;
  left: number;
  bottom: number;
  interval?;
}

@Component({
  selector: 'app-konami',
  templateUrl: './konami.component.html',
  styleUrls: ['./konami.component.scss']
})
export class KonamiComponent implements OnInit {
  @Input() movies: Movie[];
  @Output() select = new EventEmitter<Movie>();

  private CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
    'Enter',
  ];
  private index: number = 0;

  private audioStart: HTMLAudioElement;
  private audioMusic: HTMLAudioElement;
  private audioShootFile: string = "../../assets/audio/shoot.wav";
  private audioHitFile: string = "../../assets/audio/hit.wav";
  private audioDeath: HTMLAudioElement;
  private audioWin: HTMLAudioElement;

  active: boolean = false;

  animationWinning: boolean = false;
  animationLosing: boolean = false;
  animationFading: boolean = false;

  private POSITION_MIN = 5;
  private POSITION_MAX = 95;
  private POSITION_TICK = 2.5;

  private DIRECTION_LEFT: boolean = false;
  private DIRECTION_RIGHT: boolean = true;

  private INVADER_MIN = 35;
  private INVADER_MAX = 65;
  private INVADER_TICK = 2.5;

  private INVADER_INTERVAL = 1000;

  position: number = 50;

  invaders: any = {
    X: 50,
    Y: 5,
    direction: this.DIRECTION_RIGHT,
  }

  invaderInterval = undefined;

  private SHOT_COOLDOWN: number = 500;

  private cooling: boolean = false;

  shotCount: number = 0;
  shots: Shot[] = [];

  constructor() { }

  ngOnInit() {
    /* shamelessly stolen from stackoverflow */
		function shuffleArray(array) {
		  for(var i = array.length - 1; i > 0; i--) {
		    var j = Math.floor(Math.random() * (i + 1));
		    var temp = array[i];
		    array[i] = array[j];
		    array[j] = temp;
		  }
		}

    shuffleArray(this.movies);
    
    this.audioStart = new Audio('../../assets/audio/start.mp3');
    this.audioMusic = new Audio('../../assets/audio/music.mp3');

    this.audioStart.addEventListener('ended', () => {
      this.audioMusic.play();
    });

    this.audioMusic.addEventListener('ended', () => {
      this.audioMusic.play();
    });

    this.audioDeath = new Audio('../../assets/audio/death.wav');
    this.audioWin = new Audio('../../assets/audio/win.wav');
  }

  private activate() {
    this.active = true;
    this.audioStart.play();

    for(const  m of this.movies) {
      m['dead'] = false;
    }

    setTimeout(() => {
      this.invaderInterval = setInterval(() => {
        this.invaderTick();
      }, this.INVADER_INTERVAL)
    }, 6000);
  }

  @HostListener('document:keydown', ['$event'])
  handleCodeInput(event: KeyboardEvent) {
    if(!this.active) {
      if(event.key === this.CODE[this.index]) {
        this.index++;

        if(this.index === this.CODE.length) {
          this.activate();
        }
      } else {
        this.index = 0;
      }
    }
    else {
      switch(event.key) {
        case "ArrowLeft":
        case "a":
          this.move(this.DIRECTION_LEFT);
          break;
        case "ArrowRight":
        case "d":
          this.move(this.DIRECTION_RIGHT);
          break;
        case " ":
        case "ArrowUp":
        case "w":
          this.fire();
          break
      }
    }
  }

  private gameOver(selection: Movie, win: boolean) {
    clearInterval(this.invaderInterval);

    for(const shot of this.shots) {
      clearInterval(shot.interval);
    }
    this.shots = [];

    this.audioMusic.pause();

    if(win) {
      this.audioWin.play()
      this.animationWinning = true;
    }
    else {
      this.audioDeath.play()
      this.animationLosing = true;
    }

    setTimeout(() => {
      this.animationFading = true;

      setTimeout(() => {
        this.animationWinning = false;
        this.animationLosing = false;
        this.animationFading = false;

        this.active = false;
      }, 2500);
    }, 3000);

    this.select.emit(selection);
  }

  private locate(id: string): DOMRect {
      return document.getElementById(id).getBoundingClientRect();
  }

  private isCollision(first: DOMRect, second: DOMRect): boolean {
    if (first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y) {
          return true;
    }
    
    return false;
  }

  private invaderTick() {
    if(this.invaders.direction === this.DIRECTION_RIGHT) {
      if(this.invaders.X < this.INVADER_MAX) {
        this.invaders.X += this.INVADER_TICK;
      }
      else {
        this.invaders.Y += this.INVADER_TICK;
        this.invaders.direction = this.DIRECTION_LEFT;
      }
    }
    else {
      if(this.invaders.X > this.INVADER_MIN) {
        this.invaders.X -= this.INVADER_TICK;
      }
      else {
        this.invaders.Y += this.INVADER_TICK;
        this.invaders.direction = this.DIRECTION_RIGHT;
      }
    }

    let ship = this.locate("ship");

    let stopped: boolean = false;
    for(const [i, m] of this.movies.entries()) {
      if(!m['dead']) {
        let invader = this.locate("invader-"+i);

        if(this.isCollision(ship, invader)) {
          this.gameOver(m, false);

          for(const movie of this.movies) {
            if(movie !== m) {
              movie['dead'] = true;
            }
          }
          break;
        }
      }
    }
  }

  move(direction: boolean) {
    if(direction && this.position < this.POSITION_MAX) {
      this.position += this.POSITION_TICK;
    }
    else if(!direction && this.position > this.POSITION_MIN) {
      this.position -= this.POSITION_TICK;
    }
  }

  fire() {
    if(this.cooling) return;

    let sound = new Audio(this.audioShootFile);
    sound.play();

    this.cooling = true;
    setTimeout(() => this.cooling = false, this.SHOT_COOLDOWN);
    
    let ship = document.getElementById("ship");

    let left = ship.style.left;
    left = left.slice(0, left.length-2);

    let shot: Shot = {id: this.shotCount++, left: parseFloat(left), bottom: 7.5};

    this.shots.push(shot);

    shot.interval = setInterval(() => {
      if(shot.bottom < 100) {
        shot.bottom += 2.5;

        let position = this.locate("shot-"+shot.id);

        for(const [i, m] of this.movies.entries()) {
          if(!m['dead']) {
            let invader = this.locate("invader-"+i);

            if(this.isCollision(position, invader)) {
              m['dead'] = true;

              let sound = new Audio(this.audioHitFile);
              sound.play();

              clearInterval(shot.interval);
              this.shots.splice(this.shots.indexOf(shot), 1);

              let win: boolean = true;
              for(const movie of this.movies) {
                if(!movie['dead']) {
                  win = false;
                  break
                }
              }

              if(win) {
                this.gameOver(m, true);
              }

              break;
            }
          }
        }
      }
      else {
        clearInterval(shot.interval);
        this.shots.splice(this.shots.indexOf(shot), 1);
      }
    }, 100)
  }

  genre_emoji = genre_emoji;

  genre_color = genre_color;
}
