import {Component, OnInit} from '@angular/core';
import {RecordModel} from "./shared/RecordModel";
import { DATA_RECORDS } from './shared/data.request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit{
  notesArray: RecordModel[] = [];
  filteredRecords: RecordModel[] = [];
  dataRecords: RecordModel[] = DATA_RECORDS;

  constructor() {}

  ngOnInit() {
      this.dataRecords.forEach((record: RecordModel) => {
        let newRecord: RecordModel | null = new RecordModel(record.id, record.text, record.tags);
        this.notesArray.push(newRecord)
        newRecord = null;
      })
  }

  filterRecords(tag: string): void {

    if (tag === '') {
      this.filteredRecords = [];
    }

    this.notesArray.forEach((record: RecordModel) => {
      record.tags.forEach(currentTag => {
        if (tag === currentTag) {
          this.filteredRecords.push(record);
        }
      })
    })
  }

  addNote(value: any): void {
    if (value!=="" && !value.includes("#")) {

      let newRecord: RecordModel = new RecordModel(this.notesArray.length,value,[]);
      this.notesArray.push(newRecord);
    } else {
      let recordWithTags: RecordModel = new RecordModel(this.notesArray.length, value, this.findHashtags(value));
      this.notesArray.push(recordWithTags);
    }
  }

  noteSubmit(value: any){
    if(value!==""){
      this.notesArray.push(value.todo);
    }else{
      alert('Field required **')
    }
  }

  deleteItem(note: any){
    for(let i=0 ;i<= this.notesArray.length ;i++){
      if(note == this.notesArray[i]){
        this.notesArray.splice(i,1)
      }
    }
  }

  addNewTags(note: RecordModel, recordText: any): void {
    this.notesArray.forEach((record: RecordModel) => {
      if (note === record) {
        this.findHashtags(recordText).forEach(tag =>{
          if (!record.tags.includes(tag)) {
            record.tags.push(tag);
          }
        })
      }
    })
  }

  deleteTag(tag: string): void {
    this.notesArray.forEach((record: RecordModel) => {
      record.tags.forEach((currentTag) => {
        if (tag === currentTag) {
          record.tags.splice(record.tags.indexOf(currentTag), 1);
          return;
        }
      })
    })
  }

  findHashtags(tagString: any): string[] {
    let tagListArray = [];
    let regexp = new RegExp('#([^\\s]*)', 'g');
    let tmplist = tagString.match(regexp);
    for (let i in tmplist) {
      let hashSub = tmplist[i].split('#');
      for (let x in hashSub) {
        if (hashSub[x] != "")
        {
          if (hashSub[x].substr(hashSub[x].length - 1) == ":")
          {
            hashSub[x] = hashSub[x].slice(0, -1);
          }
          if (hashSub[x] != "") {
            let resultWord: string = `#${hashSub[x]}`;
            tagListArray.push(resultWord);
          }
        }
      }
    }
    return tagListArray;
  }

}
