import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDetails } from './StudentDetails.Interface';

@Injectable({
  providedIn: 'root'
})
export class APIConnect {

_baseurl = 'https://localhost:7257/';

  constructor(private _http: HttpClient) { }

  getAllStudents():Observable<any>
  {
    return this._http.get<StudentDetails>(this._baseurl+"student/getstudent");
  }

  saveStudentDb(studentDetail: StudentDetails): Observable<any> {
    return this._http.post<any>(this._baseurl + "student/addstudent", studentDetail);
  }

  updateStudentDb(studentDetail: StudentDetails): Observable<any> {
    return this._http.put<any>(this._baseurl + "student/updatestudent", studentDetail);
  }

  deleteStudentDb(studentId: number): Observable<any> {
    return this._http.delete<any>(this._baseurl + "student/deletestudent?studentId="+studentId);
  }
}