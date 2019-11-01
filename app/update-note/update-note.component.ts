import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../modelService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  notes: Array<any>;
  pin_note: boolean = true;
  dialogForm: FormGroup;
  matCardEmpty: number;

  colorCodes = ['white', '#F28B82', '#F7BC04', '#FCF474', '#CCFF90', '#A7FFEB', '#CBF0F8', 
  '#AECBFA', '#D7AEFB', '#FACFE8', '#E6C9A8', '#E8EAED'];

  constructor(private userService: UserService,private snackbar: MatSnackBar, 
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA)public data: any) 
    {
     
    }
 
  ngOnInit() {

    this.dialogForm = this.formBuilder.group({
      noteTitle: [''],
      noteData: ['']
    });

    this.userService.displayAllNotes(localStorage.getItem('token')).
    subscribe(data1 => {
      this.notes = data1;
    });
}

display()
{
  this.userService.displayAllNotes(localStorage.getItem('token')).
    subscribe(data => {
      this.notes = data;
      console.log(this.notes);
    });
}

onUpdate()
{
  if(this.dialogForm.value.noteTitle==""&&this.dialogForm.value.noteData=="")
  {
    return this.snackbar.open("Note should not be empty....", "X", { duration: 7000 });
  }

  this.userService.updateNote(this.dialogForm.value, localStorage.getItem('token'), this.data.noteId)
    .subscribe(
        (response: any) => {
          if (response.statusCode == 200) { 
            this.dialogForm.reset();
            this.display();
            this.snackbar.open("Note Updated successfully...", "X", { duration: 7000 });
          }
        }
      );
}

onDelete()
{
  this.userService.deleteNote(localStorage.getItem('token'), this.data.noteId )
  .subscribe(
    (response: any) => {
      if (response.statusCode == 200) 
      {
        this.snackbar.open("Note deleted successfully...", "X", { duration: 7000 });
        this.display();
      }
    }
  );
}

}
