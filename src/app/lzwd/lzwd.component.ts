import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lzwd',
  templateUrl: './lzwd.component.html',
  styleUrls: ['./lzwd.component.css']
})
export class LzwdComponent implements OnInit {

  public inputTxt = "(1)(6)(2)(2)(6)(10)(2)(3)(3)(9)(7)(3)(4)(18)(9)(12)(4)(5)(5)(4)(14)(2)(22)(8)(24)(20)(25)(17)(15)(1)(27)(14)(10)(7)(34)"
  public initDictTxt = "ABCDE"
  public initDictLen = 0
  public mainText = []
  public flowStep = "0";
  public cw = "";
  public pw = "";
  public c = "";
  public p = "";
  public csop = "";
  public pos = -1;
  public pStartPos  = -1;
  public autoRun = false;
  public semiAutoRun = false;
  public useMarkTable = false;
  public dict = [];
  public dictLastItem = {}
  public workingRow = {}

  public stepToMethod = {
    "0" : this.step0,
    "1" : this.step1,
    "2" : this.step2,
    "3" : this.step3,
    "4" : this.step4,
    "5" : this.step5,
    "6" : this.step6,
    "61" : this.step61,
    "61a" : this.step61a,
    "61b" : this.step61b,
    "61c" : this.step61c,
    "61d" : this.step61d,
    "62" : this.step62,
    "62a" : this.step62a,
    "62b" : this.step62b,
    "62c" : this.step62c,
    "7" : this.step7,
    "7a" : this.step7a,
    "7b" : this.step7b,
    "END" : this.stepEND
  }

  constructor() { }

  init() {
    this.initDictLen = 0
    this.mainText = []
    this.flowStep = "0";
    this.cw = "";
    this.pw = "";
    this.c = "";
    this.p = "";
    this.csop = "";
    this.pos = -1;
    this.pStartPos  = -1;
    this.autoRun = false;
    this.useMarkTable = false;
    this.dict = [];
    this.dictLastItem = {}
    this.workingRow = {}
  }

  setLII(k, v) {
    this.dictLastItem[k] = v
  }

  getRowByCode(t) {
    return this.dict.filter(function(row) {
      return row.dictCode == t
    });
  }

  getRowByIdx(t) {
    return this.dict.filter(function(row) {
      return row.dictIdx == t
    });
  }

  addNewRow(n, pw, cw, p, c, csop, dictIdx, dictCode) {
    this.dictLastItem = {
                           "n":n,
                           "pw":pw,
                           "cw":cw,
                           "p":p,
                           "c":c,
                           "csop":csop,
                           "dictIdx":dictIdx,
                           "dictCode":dictCode,
                           }
      this.dict.push(this.dictLastItem)
  }

  initDict() {
    this.dict = []
    this.initDictTxt.trim().split('').forEach(e => {
      let arr = this.getRowByCode(e)
      if (!(arr && arr.length)) {
        this.addNewRow("", "", "", "", "", "", ++this.initDictLen, e)
      }
    })
  }

  initMainText() {
    this.mainText = this.inputTxt.match(/(\d+)/g)
  }

  ngOnInit(): void {
  }

  onClick() {
    if (!this.autoRun && !this.semiAutoRun) {
      this.stepToMethod[this.flowStep](this);
    } else if (this.semiAutoRun && !this.autoRun) {
      if (this.flowStep != 'END') {
        let i = this.pos
        for (;i +1 != this.pos;) {
            this.stepToMethod[this.flowStep](this);
        }
      }
    } else {
      for (let i = this.pos; this.pos <= this.mainText.length; i++) {
          this.stepToMethod[this.flowStep](this);
      }
    }

  }

  step0(t) {
      t.flowStep = "1";
  }

  step1(t) {
      t.initDict()
      t.initMainText()
      t.flowStep = "2"
      t.pos = 0
  }

  step2(t) {
      t.cw = t.mainText[t.pos]
      t.workingRow = t.getRowByIdx(t.cw)[0]
      t.pos++
      t.flowStep = "3"
  }

  step3(t) {
      t.csop = t.csop + t.workingRow.dictCode
      t.flowStep = "4"
  }

  step4(t) {
      t.pw = t.cw
      t.flowStep = "5"
  }

  step5(t) {
      t.cw = t.mainText[t.pos]
      t.flowStep = "6"
  }

  step6(t) {
    let arr = t.getRowByIdx(t.cw)
    if ((arr && arr.length)) {
      t.flowStep = "61"
    } else {
      t.flowStep = "62"
    }
  }

  step61(t) {
      t.flowStep = "61a"
  }

  step61a(t) {
      t.csop = t.csop + t.getRowByIdx(t.cw)[0].dictCode
      t.flowStep = "61b"
  }

  step61b(t) {
      t.p = t.getRowByIdx(t.pw)[0].dictCode
      t.flowStep = "61c"
  }

  step61c(t) {
      t.c = t.getRowByIdx(t.cw)[0].dictCode.charAt(0)
      t.flowStep = "61d"
  }

  step61d(t) {
      t.addNewRow(t.pos, t.pw, t.cw, t.p, t.c, t.p + t.c, t.pos + t.initDictLen, t.p + t.c)
      t.flowStep = "7"
  }

  step62(t) {
      t.flowStep = "62a"
  }

  step62a(t) {
      t.p = t.getRowByIdx(t.pw)[0].dictCode
      t.flowStep = "62b"
  }

  step62b(t) {
      t.c = t.p.charAt(0)
      t.flowStep = "62c"
  }

  step62c(t) {
      t.csop = t.csop +  t.p + t.c
      t.addNewRow(t.pos, t.pw, t.cw, t.p, t.c, t.p + t.c, t.pos + t.initDictLen, t.p + t.c)
      t.flowStep = "7"
  }

  step7(t) {
    if(t.pos < t.mainText.length) {
      t.flowStep = "7a"
    } else {
      t.flowStep = "7b"
    }
  }

  step7a(t) {
      t.pos++
      t.flowStep = "4"
  }

  step7b(t) {
      t.flowStep = "END"
      t.pos++
  }

  stepEND(t) {
  }

}

