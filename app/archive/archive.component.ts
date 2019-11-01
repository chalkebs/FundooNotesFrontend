import { MatSnackBar } from '@angular/material';
import { UserService } from './../modelService/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit 
{
  @Input() sendArchiveNotes: Array<any>;
  pinNotes :Array<any>;

  constructor(private userService: UserService,  private snackbar: MatSnackBar) { }

  ngOnInit() 
  {
  }

  displayPinNotes()
  {
    this.userService.showPinNotes(localStorage.getItem('token'))
    .subscribe(data => {
      this.pinNotes = data;
    });
  }

  archive1(noteId)
  {
    this.userService.archiveNote(localStorage.getItem('token'), noteId)
    .subscribe((response: any) =>{
      if(response.statusCode == 200)
      {
        this.snackbar.open("Note archive successfully....", "X", { duration: 7000 });
      }
      if(response.statusCode == 201)
      {
        this.snackbar.open("Note Unarchive successfully....", "X", { duration: 7000 });
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

  pin(noteId)  
  {
    this.userService.pinNote(localStorage.getItem('token'), noteId).
    subscribe((response: any) =>{
      if(response.statusCode == 200)
      {
        this.snackbar.open("Note pinned successfully....", "X", { duration: 7000 });
        this.displayPinNotes();
      }
      if(response.statusCode == 201)
      {
        this.snackbar.open("Note Unpinned successfully....", "X", { duration: 7000 });
      }
    });
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

}
