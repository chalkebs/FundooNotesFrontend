import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../modelService/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-notes-attached-to-label',
  templateUrl: './notes-attached-to-label.component.html',
  styleUrls: ['./notes-attached-to-label.component.css']
})
export class NotesAttachedToLabelComponent implements OnInit 
{
  @Input() sendLabelId: string;
  notes : Array<any>;
  notes1: Array<any>;
  labels: Array<any>;

  colorCodes = ['white', '#F28B82', '#F7BC04', '#FCF474', '#CCFF90', '#A7FFEB', '#CBF0F8', 
  '#AECBFA', '#D7AEFB', '#FACFE8', '#E6C9A8', '#E8EAED'];

  constructor(private userService: UserService, private snackbar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() 
  {
    this.userService.showNotesOfLabel(localStorage.getItem('token'), this.sendLabelId)
    .subscribe(data =>{
        this.notes = data; 
    });

    this.display();

    this.displayLabels();

    this.displayNotesOfLabel();

  }

  displayNotesOfLabel()
  {
    this.userService.showNotesOfLabel(localStorage.getItem('token'), this.sendLabelId)
    .subscribe(data =>{
      this.notes = data;  
    });
  }

  display()
  {
    this.userService.displayAllNotes(localStorage.getItem('token')).
      subscribe(data => {
        this.notes1 = data;
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

  color(color, noteId) {

    console.log(color+" "+noteId);
    this.userService.colorForNote(localStorage.getItem('token'), color, noteId)
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.display();
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

  onDelete(noteId)
  {
    this.userService.deleteNote(localStorage.getItem('token'), noteId )
    .subscribe(
      (response: any) => {
        if (response.statusCode == 200) {
          this.snackbar.open("Note deleted successfully...", "X", { duration: 7000 });
          this.display();
          this.displayLabels();
        }
      }
    );
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
        this.display();
      }
    )
  }

}
