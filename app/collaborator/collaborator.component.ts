import { Collaborator } from './../modelService/collaborator.model';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../modelService/user.service';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit 
{
  collabForm: FormGroup;
  source: string = this.data.collab[3];
  emailId: string = this.data.collab[0];
  firstName: string = this.data.collab[1];
  lastName: string = this.data.collab[2];
  collab:Array<any>;
  i: Array<any>;
  
  constructor(private userService: UserService, private snackbar: MatSnackBar, 
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit() 
  {
    this.collabForm = this.formBuilder.group({
      collaboratorsName: ['']
    });

    this.showCollabsByNoteId();
  }

  showCollabsByNoteId()
  {
    this.userService.displayCollaborators(localStorage.getItem('token'), this.data.noteId)
    .subscribe(collabs=>{
      this.collab = collabs;
    });
  }

  onSave()
  {
    if(this.collabForm.value.collabEmail=="")
    {
      return this.snackbar.open("Collaborator Email Id should not be empty....", "X", { duration: 7000 });
    }
    this.userService.addCollaborators(localStorage.getItem('token'), this.data.noteId,this.collabForm.value)
      .subscribe((response: any)=>{
        if(response.statusCode == 200)
        {
          return this.snackbar.open("Collaborator Added Successfully....", "X", { duration: 7000 });
        }
        if(response.statusCode == 401 || response.statusCode == 402)
        {
          return this.snackbar.open("Email Id Already Exist....", "X", { duration: 7000 });
        }
        if(response.statusCode == 404)
        {
          return this.snackbar.open("Invalid EmailId of Collaborator....", "X", { duration: 7000 });
        }
      });
  }

}
