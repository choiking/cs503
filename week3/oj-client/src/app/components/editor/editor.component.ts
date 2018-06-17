import { Component, OnInit, Inject } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  public languages: string[] = ['Java', 'C++', 'Python'];

  language: string = 'Java';


  defaultContent = {
    'Java': `public class Example {
    public static void main(String[] args) {
      //Type your code here
    }
  }`,
    'C++': `#include <iostream>
using namespace std;
int main() {
  //Type your C++ code here
  return 0;
}`,
    'Python': `class Solution:
  def example():
    # Write your Python code here`
  }

  languageBundleName = {
    'Java': `java`,
    'C++': `c_cpp`,
    'Python': `python`
  }

  constructor(@Inject('collaboration') private collaboration ) { }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;
    this.collaboration.init();
  }

  setLanguage(language: string):void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.session.setMode("ace/mode/" + this.languageBundleName[this.language]);
    this.editor.setValue(this.defaultContent[this.language]);
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);
  }

}
