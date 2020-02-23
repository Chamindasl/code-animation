import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lzwc',
  templateUrl: './lzwc.component.html',
  styleUrls: ['./lzwc.component.css']
})
export class LzwcComponent implements OnInit {

  public inputTxt = "A AABBAAAAABCCBAAABCDDDBABCDEEDCBBDEBBEDBABDCCDBAAABD CBAAAAABBAAA"
  public initDictLen = 0
  public mainText = []
  public flowStep = "0";
  public c = "";
  public p = "";
  public csop = "";
  public pos = -1;
  public step = -1;
  public pStartPos  = -1;
  public autoRun = false;
  public semiAutoRun = false;
  public dict = [];
  public dictLastItem = {}
  public foundRow = {dictIdx:-1, dictCode:"_"}
  public intSteps = true


  public stepToMethod = {
    "0" : this.step0,
    "1" : this.step1,
    "2" : this.step2,
    "3" : this.step3,
    "3a" : this.step3a,
    "3a1" : this.step3a1,
    "3b" : this.step3b,
    "3b1" : this.step3b1,
    "3b2" : this.step3b2,
    "3b3" : this.step3b3,
    "4" : this.step4,
    "4a" : this.step4a,
    "4b" : this.step4b,
    "END" : this.stepEND
  }

  constructor() { }

  init() {
    this.initDictLen = 0
    this.mainText = []
    this.flowStep = "0";
    this.p = "";
    this.c = "";
    this.csop = "";
    this.pos = -1;
    this.pStartPos  = -1;
    this.autoRun = false;
    this.dict = [];
    this.dictLastItem = {}
    this.emptyFoundRow(this)
    this.step = -1;
  }

  emptyFoundRow(t) {
    t.foundRow = {dictIdx:-1, dictCode:"_"}
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

  addNewRow(n, p, c, foundIn, dictIdx, dictCode, out) {
    this.dictLastItem = {
                           "n":n,
                           "p":p,
                           "c":c,
                           "foundIn":foundIn,
                           "dictIdx":dictIdx,
                           "dictCode":dictCode,
                           "out":out,
                           }
      this.dict.push(this.dictLastItem)
  }

  initDict() {
    this.dict = []
    this.mainText = []
    this.inputTxt.trim().split('').forEach(e => {
      if(e && e.trim().length) {
        let arr = this.getRowByCode(e.trim())
        this.mainText.push(e.trim())
        if (!(arr && arr.length)) {
          this.addNewRow("", "", "", "",  ++this.initDictLen, e.trim(), "")
        }
      }
    })
    this.step  = this.initDictLen
  }

  ngOnInit(): void {
  }

  onClick() {
    if (!this.autoRun && !this.semiAutoRun) {
      this.stepToMethod[this.flowStep](this);
    } else if (this.semiAutoRun && !this.autoRun) {
      if (this.flowStep != 'END') {
        let i = this.step
        do {
          this.stepToMethod[this.flowStep](this);
        } while (this.step <= i || !(this.flowStep =='2' || this.flowStep == 'END'))
      }
    } else {
      while (this.flowStep != 'END') {
          this.stepToMethod[this.flowStep](this);
      }
    }

  }

  step0(t) {
      t.flowStep = "1";
  }

  step1(t) {
      t.initDict()
      t.flowStep = "2"
  }

  step2(t) {
    t.c = t.mainText[++t.pos]
    t.flowStep = "3"
  }

  step3(t) {
    let arr = t.getRowByCode(t.p + t.c)
    if ((arr && arr.length)) {
      t.foundRow = arr[0]
      t.flowStep =  "3a"
    } else {
      t.emptyFoundRow(t)
      t.flowStep = "3b"
    }
  }

  step3a(t) {
    if(t.intSteps) {
      t.addNewRow("", t.p, t.c, "" + t.foundRow.dictIdx, "", "")
    }
    t.emptyFoundRow(t)
    t.flowStep = "3a1"
  }

  step3a1(t) {
      t.p = t.p + t.c
      if (t.pStartPos == -1) {t.pStartPos = 0}
      t.flowStep = "4"
  }

  step3b(t) {
    t.step++
    t.flowStep = "3b1"
  }

  step3b1(t) {
    t.csop = t.csop + "(" + t.getRowByCode(t.p)[0].dictIdx + ")"
    t.flowStep = "3b2"
  }

  step3b2(t) {
    t.addNewRow(t.step - t.initDictLen , t.p, t.c, "", t.step, t.p + t.c, t.getRowByCode(t.p)[0].dictIdx)
    t.flowStep = "3b3"
  }

  step3b3(t) {
    t.p = t.c
    t.pStartPos = t.pos
    t.flowStep = "4"
  }

  step4(t) {
    if(t.pos + 1 < t.mainText.length) {
      t.flowStep = "4a"
    } else {
      t.flowStep = "4b"
    }
  }

  step4a(t) {
      t.flowStep = "2"
  }

  step4b(t) {
    t.csop = t.csop + "(" + t.getRowByCode(t.p)[0].dictIdx + ")"
    t.addNewRow(t.step - t.initDictLen + 1, "", "", "", "", "", t.getRowByCode(t.p)[0].dictIdx)
    t.step++
    t.flowStep = "END"
  }

  stepEND(t) {
  }

}

