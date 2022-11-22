import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  creating:boolean = false;
  importing:boolean = false;
  createResult:string = "";
  importResult:string = "";
  dbname:string="";

  constructor(private service:SharedService, 
    private tokenservice:TokenService,
    private router:Router) { }

  ngOnInit(): void {
    this.service.dbname().subscribe(data=>{
      this.dbname = data;
    })
  }

  createDB() {
    if(confirm('Are you sure to create database?'))
    {
      this.creating = true;
      this.service.createdb().subscribe(serviceResponse=>{
        if (serviceResponse.Success == true)
        {
          this.createResult = "Database created.";
        }
        else
        {
          this.createResult = serviceResponse.Error;
        }
      });
      this.creating = false;
    }

  }

  importData() {
    if(confirm('Are you sure to import data?'))
    {
      this.importing = true;
      this.service.importdata().subscribe(serviceResponse=>{
        if (serviceResponse.Success == true)
        {
          this.importResult = "Import data success.";
        }
        else
        {
          this.importResult = serviceResponse.Error;
        }
      });
      this.importing = false;
    }
  }

  logoutClick() {
    this.service.logout().subscribe({
        next: (data => {
          if (data.UserId == 0)
          {
            this.tokenservice.saveSession(data);
            this.router.navigate(['login']).then(() => {
              window.location.reload();
            });
          } 
        })
    });
  }
}
