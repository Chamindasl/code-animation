import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-intext',
  templateUrl: './intext.component.html',
  styleUrls: ['./intext.component.css']
})
export class IntextComponent implements OnInit {

  public textField = "";
  public mainText = "";
  public textL;
  public textP;
  public textC;
  public textR;
  public start = 0;
  public len = 1;
  public p = "";
  public c = "";
  public codestream = "";
  public pos = -1;
  public pStartPos = -1;
  public dict = {};
  public rdict = {};

  public step = 0;

  constructor() {}

  ngOnInit(): void {
    this.initDirect();
  }

  addSpace() {
    //  this.initDirect();
    this.mainText = "";
    this.textField.split('').forEach(e => {
      this.mainText = this.mainText + e + " ";
    })
    this.mainText = this.textField;
    this.pos = -1;
this.dict = {}
this.codestream = "";
  }

  initDirect() {
    this.dict = {}
    let x: number = 1;
    this.textField.split('').forEach(e => {
      if (!(e in this.dict)) {
        this.dict[e] = x++
        this.rdict[x - 1] = e
      }
    })
  }

  onClickMe() {
    if (this.pos == -1) {
    this.initDirect()
    this.pos = 0
    this.c = this.mainText.charAt(this.pos);
    return
    }
    if (this.pos == this.mainText.length) {
      this.codestream = this.codestream + this.dict[this.p];
      this.pos++
    } else {
      if (this.isInDict(this.p + this.c)) {
        this.p = this.p + this.c;
      } else {
        this.codestream = this.codestream + this.dict[this.p];
        let nextCode = Object.keys(this.dict).length + 1
        this.dict[this.p + this.c] = nextCode
        this.rdict[nextCode] = this.p + this.c
        this.p = this.c
        this.pStartPos = this.pos;
      }
      this.pos++
      this.c = this.mainText.charAt(this.pos);
    }

  }

 sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
  isInDict(t) {
    console.log(t)
    console.log(this.dict)
    return t in this.dict
  }


}
