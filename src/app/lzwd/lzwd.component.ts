import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lzwd',
  templateUrl: './lzwd.component.html',
  styleUrls: ['./lzwd.component.css']
})
export class LzwdComponent implements OnInit {

  public inputTxt = ""
  public initDictTxt = ""
  public initDictLen = 0
  public mainText = ""
  public flowStep = "0";
  public cw = "";
  public pw = "";
  public c = "";
  public p = "";
  public pos = -1;
  public pStartPos  = -1;
  public autoRun = false;
  public useMarkTable = false;
  public dict = [];
  public dictLastItem = {}

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
    "62c1" : this.step62c,
    "7" : this.step7,
    "7a" : this.step7a,
    "7b" : this.step7b
  }

  constructor() { }

  setLII(k, v) {
    this.dictLastItem[k] = v
  }

  isInDict(t) {
    return this.dict.filter(function(row) {
      return row.dictCode == t
    });
  }

  addNewRow(n, pw, cw, p, c, csop, dictIdx, dictCode) {
    this.dictLastItem = {
                           "n":n,
                           "pw":pw,
                           "cw":cw,
                           "p":pw,
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
      let arr = this.isInDict(e)
      if (!(arr && arr.length)) {
        this.addNewRow("", "", "", "", "", "", ++this.initDictLen, e)
      }
    })
  }

  ngOnInit(): void {
  }

  init() {
  }

  onClick() {
    this.stepToMethod[this.flowStep](this);
  }

  step0(t) {
      t.flowStep = "1";
  }

  step1(t) {
      t.flowStep = "2"
      t.initDict()
  }

  step2(t) {
      t.flowStep = "3"
  }

  step3(t) {
      t.flowStep = "4"
  }

  step4(t) {
      t.flowStep = "5"
  }

  step5(t) {
      t.flowStep = "6"
  }

  step6(t) {
    if (true) {
      t.flowStep = "61"
    } else {
      t.flowStep = "62"
    }
  }

  step61(t) {
      t.flowStep = "61a"
  }

  step61a(t) {
      t.flowStep = "61b"
  }

  step61b(t) {
      t.flowStep = "61c"
  }

  step61c(t) {
      t.flowStep = "61d"
  }

  step61d(t) {
      t.flowStep = "7"
  }

  step62(t) {
      t.flowStep = "62a"
  }

  step62a(t) {
      t.flowStep = "62b"
  }

  step62b(t) {
      t.flowStep = "62c"
  }

  step62c(t) {
      t.flowStep = "7"
  }

  step7(t) {
    if(true) {
      t.flowStep = "7a"
    } else {
      t.flowStep = "7b"
    }
  }

  step7a(t) {
      t.flowStep = "4"
  }

  step7b(t) {
      t.flowStep = "END"
  }

  auto() {
  }

}
