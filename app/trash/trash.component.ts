import { MatSnackBar } from '@angular/material';
import { UserService } from './../modelService/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit 
{
  @Input() sendtrashNotes: Array<any>;

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  ngOnInit() { 
    console.log(this.sendtrashNotes);
  }

  onDelete(noteId)
  {
    this.userService.deleteNote(localStorage.getItem('token'), noteId )
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Note deleted successfully...", "X", { duration: 7000 });
        }
      }
    );
  }

  trash1(noteId)
  {
    this.userService.trashNote(localStorage.getItem('token'), noteId)
    .subscribe((response: any) =>{
      if(response.statusCode == 200)
      {
        this.snackbar.open("Note trashed successfully....", "X", { duration: 7000 });
      }
      if(response.statusCode == 201)
      {
        this.snackbar.open("Note Untrashed successfully....", "X", { duration: 7000 });
      }
    });
  }

  color(color, noteId) {

    console.log(color+" "+noteId);
    this.userService.colorForNote(localStorage.getItem('token'), color, noteId)
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
        }
      }
    );
  }

}
