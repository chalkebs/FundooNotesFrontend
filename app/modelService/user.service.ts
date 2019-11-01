import { Collaborator } from './collaborator.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from './note.model';
import { NoteSearch } from './note-search.model';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Label } from './label.model';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Injectable()
export class UserService 
{
  constructor(private http: HttpClient) { }

  url = environment.url;

  //For Code Reuse...
  postRequest(url: string, user: User, token: string)
  {
    if(user==null)   
    {
      return this.http.post(url,token);
    }
    if(token==null)
    {
      return this.http.post(url, user);
    }
  }

  postRequest2(url: string, note : Note, token : string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.post(url, note, httpOptions);
  }

  postRequest3(url: string, searchField : NoteSearch, token: string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.post<any>(url, searchField.searchBox, httpOptions);

  }

  postRequest4(url: string, token: string,formData: FormData)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.post(url, formData, httpOptions);
  }

  postRequest5(url: string, token: string, label: Label)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.post(url, label, httpOptions);
  }

  putRequest(url: string, user: User, token : string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.put(url, user, httpOptions);
  }

  putRequest2(url: string, token: string, noteId: string, note: Note)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteId', noteId)
    };
    if(note==null)
    {
      return this.http.put(url, note, httpOptions);
    }
    return this.http.post(url,httpOptions);
  }

  putRequest3(url: string, token: string, color: string, noteId: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('color',color).set('noteId',noteId)
    };
    return this.http.put(url, color, httpOptions);
  }

  putRequest4(url: string, token: string,label: Label, labelId: string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('labelId',labelId)
    };
    return this.http.put(url, label, httpOptions);
  }

  putRequest5(url: string, token: string,noteId: string, labelId: string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteId',noteId).set('labelId',labelId)
    };
    return this.http.put(url, noteId, httpOptions);
  }

  deleteRequest(url: string,token : string, noteId : string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteId', noteId)
    };
    return this.http.delete(url, httpOptions);
  } 

  deleteRequest2(url: string,token : string, labelId : string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('labelId',labelId)
    };
    return this.http.delete(url, httpOptions);
  }

  getRequest(url: string, token : string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token })
    };
    return this.http.get<any>(url, httpOptions);
  }

  getRequest2(url: string, token: string, noteId: string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteId',noteId)
    };
    return this.http.get<any>(url, httpOptions);
  }

  getRequest3(url: string, token: string, labelId: string)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('labelId',labelId)
    };
    return this.http.get<any>(url, httpOptions);
  }
  //For Code Reuse...
  


  //All Services...
  createUser(user: User): Observable<any> 
  {
    return this.postRequest(this.url,user, null)
  }

  checkLogin(user: User): Observable<any> 
  {
    return this.postRequest(this.url + 'login', user, null);
  }

  sendLink(user: User): Observable<any> 
  {
    return this.postRequest(this.url + 'forgotpassword', user, null);
  }

  resetPasswordMethod(user: User, token: string): Observable<any> 
  {
    return this.putRequest(this.url + 'resetpassword', user, token);
  }

  createNote(note : Note, token : string): Observable<any> 
  {
    return this.postRequest2(this.url+'newNote', note, token);
  }
 
  displayAllNotes(token : string): Observable<Note[]>
  {
    return this.getRequest(this.url+'displayAllNotes', token);
  }

  search(token : string, searchField : NoteSearch): Observable<Note[]>
  {
    return this.postRequest3(this.url+'find', searchField, token);
  }

  deleteNote(token : string, noteId : string): Observable<any>
  {
    return this.deleteRequest(this.url+'deleteNote', token, noteId);
  }

  updateNote(note : Note, token : string, noteId : string): Observable<any>
  {
    return this.putRequest2(this.url+'updateNote', token, noteId, note);
  }

  displayUserProfile(token : string): Observable<any>
  {
    return this.getRequest(this.url+'getProfile', token);
  }

  colorForNote(token: string, color: string,noteId: string): Observable<any> 
  {
    return this.putRequest3(this.url + 'colorNote', token, color, noteId);
  }

  basicUploadSingle(formData: FormData,token:string): Observable<any>
  {  
    return this.postRequest4(this.url+'uploadImage', token, formData);
  }

  removeProfilePic(token: string): Observable<any>
  {
    return this.postRequest(this.url+'removeImage', null, token);
  }

  clearRedisStorage():Observable<any>
  {
    return this.http.get(this.url+'clearRedis');
  }

  createNewLabel(token: string, label: Label): Observable<any>
  {
    return this.postRequest5(this.url+'newLabel', token, label);
  }

  displayAllLabels(token : string): Observable<Label[]>
  {
    return this.getRequest(this.url+'displayAllLabels', token);
  }  

  updateLabel(token: string, label: Label, labelId: string)
  {
    return this.putRequest4(this.url+'updateLabel', token, label, labelId);
  }

  deleteLabel(token: string, labelId: string)
  {
    return this.deleteRequest2(this.url+'deleteLabel', token, labelId);
  }

  attachLabelOnNote(token: string, labelId: string, noteId: string): Observable<any>
  {
    return this.putRequest5(this.url+'attachLabelToNote', token, noteId, labelId);
  }

  removeLabelFromNote(token: string, noteId: string, labelId: string)
  {
    return this.putRequest5(this.url+'removeLabelFromNote', token, noteId, labelId);
  }

  showLabelsOnNote(token: string, noteId: string): Observable<Label[]>
  {
    return this.getRequest2(this.url+'showLabelsAttachedToNote', token, noteId);
  }

  showNotesOfLabel(token: string, labelId: string): Observable<Note[]>
  {
    return this.getRequest3(this.url+'showNotesAttachedToLabel', token, labelId);
  }

  addCollaborators(token: string, noteId: string, collaboratorsName: Collaborator): Observable<any>
  {
    const httpOptions = 
    {
      headers: new HttpHeaders({ token }),
      params: new HttpParams().set('noteId',noteId)
    };
    return this.http.post(this.url+'addCollaborator',collaboratorsName,httpOptions);
  }

  displayCollaborators(token: string, noteId: string): Observable<Collaborator[]>
  {
    return this.getRequest2(this.url+'showCollaboratorsByNoteId', token, noteId);
  }

  pinNote(token: string, noteId: string): Observable<any>
  {
    return this.putRequest2(this.url+'pinOrUnpinNote', token, noteId, null);
  }

  showPinNotes(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showPinnedNotes', token);
  }

  showUnpinNotes(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showUnpinnedNotes', token);
  }

  archiveNote(token: string, noteId: string): Observable<any>
  {
    return this.putRequest2(this.url+'archiveNote', token, noteId, null);
  }

  showArchiveNote(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showArchivedNotes', token);
  }

  showUnarchiveNotes(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showUnarchivedNotes', token);
  }

  trashNote(token: string, noteId: string): Observable<any>
  {
    return this.putRequest2(this.url+'trashNote', token, noteId, null);
  }

  showTrashNote(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showTrashedNotes', token);
  }

  showUntrashNote(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'showUntrashedNotes', token);
  }

  showOtherNotes(token: string): Observable<Note[]>
  {
    return this.getRequest(this.url+'otherNotes', token);
  }

}
