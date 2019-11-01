import { UpdateNoteComponent } from './../update-note/update-note.component';
import { Router } from '@angular/router';
import { UserService } from './../modelService/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../modelService/note.model';
import { MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NoteSearch } from '../modelService/note-search.model';
import { UploadProfilePicComponent } from '../upload-profile-pic/upload-profile-pic.component';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { SelectLabelComponent } from '../select-label/select-label.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  note: Note = new Note();
  searchField: NoteSearch = new NoteSearch();
  notes: Array<any>;
  profile: [];
  labels: Array<any>;
  searchedNote: Array<any>;
  pop: number = 1;
  profile1: number = 1;
  view: boolean = true;
  pin_note: boolean = true;
  show: boolean = true;
  menu: boolean = true;
  noteForm: FormGroup;
  message:string;
  searchForm: FormGroup;  
  matDrawerContent: number = 1;
  matCardEmpty: number;
  showLabel: number = 1;
  labelId: string;
  noteId: string;
  pinNotes: Array<any>;
  trashNotes: Array<any>;
  archiveNotes: Array<any>;
  otherNotes: Array<any>;

  colorCodes = ['white', '#F28B82', '#F7BC04', '#FCF474', '#CCFF90', '#A7FFEB', '#CBF0F8', 
  '#AECBFA', '#D7AEFB', '#FACFE8', '#E6C9A8', '#E8EAED'];

  constructor(private router: Router, private userService: UserService,
    private snackbar: MatSnackBar, private formBuilder: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() 
  {
    this.displayPinNotes();

    this.noteForm = this.formBuilder.group({
      noteTitle: [''],
      noteData: ['']
    });

    this.searchForm = this.formBuilder.group({
      searchBox: ['']
    });

    this.displayPinNotes();

    this.displayProfile();

    this.displayLabels();  
  }

  displayPinNotes()
  {
    this.userService.showPinNotes(localStorage.getItem('token'))
    .subscribe(data => {
      this.pinNotes = data;
      console.log(this.pinNotes.length);
      this.matDrawerContent = 4;
    });
  }

  display()
  {
    this.userService.displayAllNotes(localStorage.getItem('token')).
      subscribe(data => {
        this.notes = data;
      });
  }

  displayProfile()
  {
    this.userService.displayUserProfile(localStorage.getItem('token')).
      subscribe(profile1 =>
        {
          this.profile = profile1;        
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

  displayNotesOfLabel(l)
  {
    this.matDrawerContent = 3;
    this.labelId=l.labelId;
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.clearRedisStorage().
    subscribe((response:any)=>{
      if(response.statusCode==200)
      {
        this.router.navigate(['/Login']);
      }
    });
  }

  onCreate() {

    if(this.noteForm.value.noteTitle==""&&this.noteForm.value.noteData=="")
    {
      this.pop = 1;
      return this.snackbar.open("Note should not be empty....", "X", { duration: 7000 });
    }
   
    this.userService.createNote(this.noteForm.value, localStorage.getItem('token'))
    .subscribe(
        (response: any) => {
          if (response.statusCode == 200) {
            this.noteForm.reset();
            this.snackbar.open("Note created successfully....", "X", { duration: 7000 });
            this.display();
          }
        }
      );
    this.pop = 1;
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

    console.log(n);

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

  onSearch()
  {
    this.userService.search(localStorage.getItem('token'),this.searchForm.value)
    .subscribe(searchedNotes =>
      {
        this.searchForm.reset();
        this.searchedNote = searchedNotes;  
        this.matDrawerContent = 2;    
      });
  }

  chooseProfilePic()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'full-width-image-dialog';
    dialogConfig.backdropClass = 'backdrop-background-image';

    const dialogRef = this.dialog.open(UploadProfilePicComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        this.display();
        this.displayProfile();
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

  editLabel()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'full-width-label-dialog';
    dialogConfig.backdropClass = 'backdrop-background-label';

    const dialogRef = this.dialog.open(EditLabelComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log("dialog box closed");
        this.displayLabels();
        this.display();
        this.displayProfile();
      });
  }

  onSelect(n)
  {
    const dialogConfig1 = new MatDialogConfig();

    dialogConfig1.disableClose = false;
    dialogConfig1.panelClass = 'full-width-select-label-dialog';
    dialogConfig1.backdropClass = 'backdrop-background-select-label';

    dialogConfig1.data = {
      noteId : n,
      labels : this.labels
    };

    const dialogRef = this.dialog.open(SelectLabelComponent, dialogConfig1);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log("dialog box closed");
        this.displayLabels();
        this.display();
        this.displayProfile();
      });
  }

  onCollaboration(n)
  {
    const dialogConfig1 = new MatDialogConfig();

    dialogConfig1.disableClose = false;
    dialogConfig1.panelClass = 'full-width-collaborator-dialog';
    dialogConfig1.backdropClass = 'backdrop-background-collaborator';

    dialogConfig1.data = {
      noteId : n,
      collab : this.profile
    };

    const dialogRef = this.dialog.open(CollaboratorComponent, dialogConfig1);

    dialogRef.afterClosed().subscribe(
      result => {
        this.display();
      });
  }


  pin(noteId)  
  {
    this.matDrawerContent = 4;
    this.noteId = noteId;
    this.pin_note = !this.pin_note;
    this.userService.pinNote(localStorage.getItem('token'), this.noteId).
    subscribe((response: any) =>{
      if(response.statusCode == 200)
      {
        this.snackbar.open("Note pinned successfully....", "X", { duration: 7000 });
      }
      if(response.statusCode == 201)
      {
        this.snackbar.open("Note Unpinned successfully....", "X", { duration: 7000 });
      }
    });
  }

  displayArchiveNotes()
  {
    this.userService.showArchiveNote(localStorage.getItem('token'))
    .subscribe(data =>{
      this.archiveNotes = data;
      this.matDrawerContent = 5;
    });
  }

  displayTrashNotes()
  {
    this.userService.showTrashNote(localStorage.getItem('token'))
    .subscribe(data => {
      this.trashNotes = data;
      this.matDrawerContent = 6;
    });
  }

  archive1(noteId)
  {
    this.matDrawerContent = 5;
    this.noteId = noteId;
    this.userService.archiveNote(localStorage.getItem('token'), this.noteId)
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
    this.matDrawerContent = 6;
    this.noteId = noteId;
    this.userService.trashNote(localStorage.getItem('token'), this.noteId)
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
