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

  public textField = "AAABBAAAAABCCBAAABCDDDBABCDEEDCBBDEBBEDBABDCCDBAAABD CBAAAAABBAAA";
  public mainText = "";
  public start = 0;
  public len = 1;
  public p = "";
  public c = "";
  public codestream = "";
  public pos = -1;
  public pStartPos = -1;
  public dict = [];
  public step = 0;
  public nextCode = 0;
  constructor() {}

  ngOnInit(): void {
    this.initDirect();
  }

  init() {
    //  this.initDirect();
    this.mainText = "";
    this.textField.split('').forEach(e => {
      this.mainText = this.mainText + e.trim()
    })
    this.pos = -1;
    this.dict = []
    this.codestream = "";
    this.pStartPos = -1;
    this.p = ""
    this.c = ""
    this.pStartPos = -1;
    this.step = 0
    this.nextCode = 1;
  }

  initDirect() {
    this.dict = []
    this.mainText.split('').forEach(e => {
      let arr = this.isInDict(e)
      if (!(arr && arr.length)) {
        this.dict.push({"step": "-", "p": "-", "c": "-", "dictCode": e, "dictVal": this.nextCode++, "foundInDic": "-" });
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
    if (this.p.length >= 0 && this.c.length == 0 && this.pos >= this.mainText.length) {
      if (this.pos == this.mainText.length) {
        let lastIdx = this.isInDict(this.p)[0]
        this.codestream = this.codestream + "(" + lastIdx.dictVal + ")";
        this.dict.push({"step": this.pos + 1, "p": this.p, "c": "", "dictCode": lastIdx.dictCode, "dictVal": lastIdx.dictVal, "foundInDic": ""})
      }
      this.pos++;
    } else {
      let arr = this.isInDict(this.p + this.c)
      if (arr && arr.length) {
        this.dict.push({ "step": this.pos + 1, "p": this.p, "c": this.c, "dictCode": "", "dictVal": "", "foundInDic": arr[0].dictVal });
        this.p = this.p + this.c;
      } else {
        this.codestream = this.codestream + "(" + this.isInDict(this.p)[0].dictVal + ")";
        this.dict.push({ "step": this.pos + 1, "p": this.p, "c": this.c, "dictCode": this.p + this.c, "dictVal": this.nextCode++, "foundInDic": "" });
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
    return this.dict.filter(function(row) {
      return row.dictCode == t
    });
  }

}
