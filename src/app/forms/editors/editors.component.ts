import { Component, OnInit } from "@angular/core";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: "app-editors",
  templateUrl: "./editors.component.html",
  styleUrls: ["./editors.component.scss"],
})
export class EditorsComponent implements OnInit {
  public Editor = ClassicEditor;
  inputValue: any ="hi";
  constructor() {}
  ngOnInit() {
    console.log(this.inputValue);
    
  }
  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    console.log(data)
 
    console.log(data.replace(/<(.|\n)*?>/g,''))
}
}
