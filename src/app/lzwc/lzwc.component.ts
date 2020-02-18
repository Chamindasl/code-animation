import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-lzwc',
  templateUrl: './lzwc.component.html',
  styleUrls: ['./lzwc.component.css']
})
export class LzwcComponent implements OnInit {

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
  public useMarkTable = false;
  public flowStep = 0;
  public autoRun = false;
  public numOfCodeStreamCode = 0;
  public rootDictSize = 0;

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
    this.numOfCodeStreamCode = 0;
    this.rootDictSize = 0;
  }

  initDirect() {
    this.dict = []
    this.mainText.split('').forEach(e => {
      let arr = this.isInDict(e)
      if (!(arr && arr.length)) {
        this.dict.push({"step": "-", "p": "-", "c": "-", "dictCode": e, "dictVal": this.nextCode++, "foundInDic": "-", out:"" });
        this.rootDictSize++
      }
    })
  }

  auto() {
    if (!this.autoRun) {
      this.init()
      for(var i = 0; i <= this.mainText.length + 1; i++) {
        this.onClickMe()
      }
    }
  }
  onClickMe() {
    if (this.pos == -1) {
      this.initDirect()
      this.pos = 0
      this.c = this.mainText.charAt(this.pos);
      this.dict.push({"step": this.step + 1 , "p": "", "c": this.c, "dictCode": "", "dictVal":"", "foundInDic": "", out:""})
      this.step++
      return
    }
    if (this.p.length >= 0 && this.c.length == 0 && this.pos >= this.mainText.length) {
      if (this.pos == this.mainText.length) {
        let lastIdx = this.isInDict(this.p)[0]
        this.codestream = this.codestream + "(" + lastIdx.dictVal + ")";
        this.dict.push({"step": this.step + 1, "p": this.p, "c": "", "dictCode": "", "dictVal": "", "foundInDic": "", out:lastIdx.dictVal})
        this.numOfCodeStreamCode++
      }
      this.pos++;
    } else {
      let arr = this.isInDict(this.p + this.c)
      if (arr && arr.length) {
        if (!this.useMarkTable) {
          this.dict.push({ "step": this.step + 1, "p": this.p, "c": this.c, "dictCode": "", "dictVal": "", "foundInDic": arr[0].dictVal, out:""});
          this.step++
        }
        this.p = this.p + this.c;
      } else {
        var out = this.isInDict(this.p)[0].dictVal
        this.codestream = this.codestream + "(" + out + ")";
        this.dict.push({ "step": this.step + 1, "p": this.p, "c": this.c, "dictCode": this.p + this.c, "dictVal": this.nextCode++, "foundInDic": "", out: out});
        this.numOfCodeStreamCode++
        this.p = this.c
        this.pStartPos = this.pos;
        this.step++
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
