import { Component, OnInit } from '@angular/core';
import { APIConnect } from './APIConnect.service';
import { StudentDetails } from './StudentDetails.Interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TestAppUI';
  isAddNew: boolean=false;
  allStudents:StudentDetails[]=[];
  newStudent:StudentDetails={
    id: 0,
    name: '',
    address: '',
    dateOfBirth: new Date(),
    isEdit: false,
  };
  constructor(private _apiConnect:APIConnect){

  }


  saveStudent(newStudent:any){
    this._apiConnect.saveStudentDb(newStudent).subscribe((response)=>{
      if(response.status==="success"){
        alert(response.message);
        this.newStudent={
          id: 0,
          name: '',
          address: '',
          dateOfBirth: new Date(),
          isEdit: false,
        };
        this.isAddNew=false;
        this.getStudentData();
      }
      else{
        console.log(response);
      }
    },(error)=>{
      alert(error.error.message);
    });
  }

  update(item:any){
    this._apiConnect.updateStudentDb(item).subscribe((response)=>{
      if(response.status==="success"){
        alert(response.message);
        item.isEdit=false;
        this.getStudentData();
      }
      else{
        console.log(response.message);
      }
    },(error)=>{
      alert(error.error.message);
    });

     console.log(item);
  }

  delete(itemIndex:number)
  {
    this._apiConnect.deleteStudentDb(itemIndex).subscribe((response)=>{
      if(response.status==="success"){
        alert(response.message);
        this.getStudentData();
      }
      else{
        console.log(response);
      }
    },(error)=>{
      alert(error.error.message);
    });
  }

  addNew(){
    this.isAddNew=true;
  }
  edit(item:any){
    if(!this.isAddNew){
    this.allStudents.forEach(item=>item.isEdit=false);
    item.isEdit=true;
    }
  }

  cancel(){
    this.newStudent={
      id: 0,
      name: '',
      address: '',
      dateOfBirth: new Date(),
      isEdit: false,
    };
    this.isAddNew=false;
  }


  cancelUpdate(item:any){
    item.isEdit=false;
  }
  getStudentData(){
    this._apiConnect.getAllStudents().subscribe((data)=>
    {
      this.allStudents=data;
      this.allStudents.forEach(item=>
        item.isEdit=false
        );
      console.log(this.allStudents);
    });
  }
  ngOnInit(): void {
    this.getStudentData();
  }

  
}
