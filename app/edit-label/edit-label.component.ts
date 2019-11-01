import { DashboardComponent } from './../dashboard/dashboard.component';
import { UploadProfilePicComponent } from './../upload-profile-pic/upload-profile-pic.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../modelService/user.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.css']
})
export class EditLabelComponent implements OnInit 
{
  labelForm: FormGroup;
  updateLabelForm: FormGroup;
  labels: Array<any>;
  changeRow: number = 1;
  inputSection: number = 1;
  changeButton: number = 1;

  constructor(private userService: UserService, private snackbar: MatSnackBar, 
    private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() 
  {
    this.labelForm = this.formBuilder.group({
      labelTitle: ['']
    });

    this.updateLabelForm = this.formBuilder.group(
      {
        labelTitle: ['']
      }
    );

    this.displayLabels();
  }

  displayLabels()
  {
    this.userService.displayAllLabels(localStorage.getItem('token')).
    subscribe(label =>
      {
        this.labels = label;        
      });
  }

  createLabel()
  {
    console.log(this.labelForm.value);

    this.userService.createNewLabel(localStorage.getItem('token'),this.labelForm.value)
    .subscribe(
      (response: any) => {
      if (response.statusCode == 200) {
        this.labelForm.reset();
        this.displayLabels();
        this.snackbar.open("Label created successfully....", "X", { duration: 7000 });
      }
      if(response.statusCode == 401)
      {
        this.labelForm.reset();
        this.displayLabels();
        this.snackbar.open("Label already exist....", "X", { duration: 7000 });
      }
    });
  }

  onUpdate(l)
  {
    console.log(l);
    console.log(this.updateLabelForm.value);

    this.userService.updateLabel(localStorage.getItem('token'), this.updateLabelForm.value, l)
    .subscribe(
      (response: any) => {
      if (response.statusCode == 200) {
        this.updateLabelForm.reset();
        this.displayLabels();
        this.snackbar.open("Label updated successfully....", "X", { duration: 7000 });
      }
      if(response.statusCode == 401)
      {
        this.updateLabelForm.reset();
        this.displayLabels();
        this.snackbar.open("Label already exist....", "X", { duration: 7000 });
      }
     }); 
     
    this.inputSection = 2;
    this.changeButton = 2;
    this.changeRow = 2;
  }

  deleteLabel(l)
  {

    console.log(l);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.panelClass = 'full-width-delete-dialog';
    dialogConfig.backdropClass = 'backdrop-background-delete';

    dialogConfig.data = {
      labelId: l
    };

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log("dialog box closed");
        this.displayLabels();
      });
  }

}
