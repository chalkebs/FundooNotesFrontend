import { UserService } from './../modelService/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit 
{

  labels: Array<any>;

  constructor(private userService: UserService,@Inject(MAT_DIALOG_DATA)public data: any,
  private snackbar: MatSnackBar) { }

  ngOnInit() 
  { 
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

  onDelete()
  {
    
    this.userService.deleteLabel(localStorage.getItem('token'), this.data.labelId)
    .subscribe(
      (response: any)=>{
        if(response.statusCode == 200)
        {
          this.displayLabels();
          this.snackbar.open("Label deleted successfully....", "X", { duration: 7000 });
        }
      }
    );
  }

}
