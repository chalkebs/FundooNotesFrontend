import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material';
import { DemoMaterialModule } from './material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './modelService/user.service';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { UploadProfilePicComponent } from './upload-profile-pic/upload-profile-pic.component';
import { EditLabelComponent } from './edit-label/edit-label.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SelectLabelComponent } from './select-label/select-label.component';
import { CollaboratorComponent } from './collaborator/collaborator.component';
import { NotesAttachedToLabelComponent } from './notes-attached-to-label/notes-attached-to-label.component';
import { PinUnpinComponent } from './pin-unpin/pin-unpin.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    UpdateNoteComponent,
    UploadProfilePicComponent,
    EditLabelComponent,
    DeleteConfirmationComponent,
    SelectLabelComponent,
    CollaboratorComponent,
    NotesAttachedToLabelComponent,
    PinUnpinComponent,
    ArchiveComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [UpdateNoteComponent,UploadProfilePicComponent,EditLabelComponent,
    DeleteConfirmationComponent,SelectLabelComponent,CollaboratorComponent]
})
export class AppModule { }
