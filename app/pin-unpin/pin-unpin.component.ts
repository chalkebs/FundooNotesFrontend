import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../modelService/user.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-pin-unpin',
  templateUrl: './pin-unpin.component.html',
  styleUrls: ['./pin-unpin.component.css']
})
export class PinUnpinComponent implements OnInit 
{
  notes : Array<any>;
  notes1 : Array<any>;
  note : Array<any>;
  labels: Array<any>;
  pin_note: boolean = true;
  @Input() sendNoteId: string;

  colorCodes = ['white', '#F28B82', '#F7BC04', '#FCF474', '#CCFF90', '#A7FFEB', '#CBF0F8', 
  '#AECBFA', '#D7AEFB', '#FACFE8', '#E6C9A8', '#E8EAED'];

  constructor(private userService: UserService, private snackbar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() 
  {

    this.displayPinnedNotes();

    this.displayOtherNotes();

    this.displayLabels();
  }

  display()
  {
    this.userService.displayAllNotes(localStorage.getItem('token')).
      subscribe(data => {
        this.note = data;
      });
  }

  displayLabels()
  {
    this.userService.displayAllLabels(localStorage.getItem('token')).
    subscribe(label =>
      {
        this.labels = label;  
      });
  }

  displayPinnedNotes()
  {
    this.userService.showPinNotes(localStorage.getItem('token')).
    subscribe(data =>{
      this.notes = data;
      if(this.notes.length<0)
      {
        this.display();
      }
      console.log(this.notes);
    });
  }
  
  displayOtherNotes()
  {
    this.userService.showOtherNotes(localStorage.getItem('token'))
    .subscribe(data =>{
      this.notes1 = data;
      if(this.notes.length<0)
      {
        this.display();
      }
      console.log(this.notes1);
    });
  }

  onPin(noteId)  
  {
    this.pin_note = !this.pin_note;
    this.userService.pinNote(localStorage.getItem('token'), noteId).
    subscribe((response: any) =>{
      if(response.statusCode == 200)
      {
        this.displayPinnedNotes();
        this.displayOtherNotes();
      }
      if(response.statusCode == 201)
      {
        this.displayPinnedNotes();
        this.displayOtherNotes();
      }
    });
  }

  color(color, noteId) 
  {
    console.log(color+" "+noteId);
    this.userService.colorForNote(localStorage.getItem('token'), color, noteId)
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.displayPinnedNotes();
          this.displayOtherNotes();
        }
      }
    );
  }

  onDelete(noteId)
  {
    this.userService.deleteNote(localStorage.getItem('token'), noteId )
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Note deleted successfully...", "X", { duration: 7000 });
          this.displayLabels();
        }
      }
    );
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

  update(n)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
  
    dialogConfig.data = {
      noteId: n.noteId,
      noteTitle: n.noteTitle,
      noteData: n.noteData,
      color: n.color
        };

    dialogConfig.panelClass = 'full-width-dialog';
    dialogConfig.backdropClass = 'backdropBackground';

    const dialogRef = this.dialog.open(UpdateNoteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
      }
    )
  }

}
