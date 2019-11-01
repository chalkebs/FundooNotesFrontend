import { DashboardComponent } from './../dashboard/dashboard.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../modelService/user.service';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-label',
  templateUrl: './select-label.component.html',
  styleUrls: ['./select-label.component.css']
})
export class SelectLabelComponent implements OnInit 
{  
  checkbox: boolean = true;

  constructor(private userService: UserService,@Inject(MAT_DIALOG_DATA)public data: any,
  private snackbar: MatSnackBar) 
  { }

  ngOnInit() 
  {
  }

  isChecked(labelId)
  {
    if(this.checkbox == true)
    {
      this.checkbox = false;
      this.attachLabelToNote(labelId);
    }
    else if(this.checkbox == false)
    {
      this.checkbox = true;
      this.removeLabel(labelId);
    }
  }

  attachLabelToNote(labelId)
  {
      this.userService.attachLabelOnNote(localStorage.getItem('token'), labelId, this.data.noteId)
      .subscribe((response: any)=>{
        if(response.statusCode == 200)
        {
          this.snackbar.open("Label Attached to Note Successfully...", "X", { duration: 7000 });
          this.checkbox = false;
        }
        if(response.statusCode == 204)
        {
          this.snackbar.open("Label Already Attached to Note...", "X", { duration: 7000 });
        }
      });
  }
 
  removeLabel(labelId)
  {
    this.userService.removeLabelFromNote(localStorage.getItem('token'), this.data.noteId, labelId)
      .subscribe((response: any)=>{
        if(response.statusCode == 200)
        {
          this.snackbar.open("Label Removed from Note Successfully...", "X", { duration: 7000 });
        }
      });
  }
  
}
