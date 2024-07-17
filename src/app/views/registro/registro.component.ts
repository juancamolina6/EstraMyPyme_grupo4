import { Component, OnInit } from '@angular/core';
import JustValidate from 'just-validate';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'; 
 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})


export class RegistroComponent implements OnInit {



  constructor(){}

  ngOnInit(): void {
  const validation = new JustValidate("#register", {
    validateBeforeSubmitting: true,
    errorLabelStyle: {
      color: '#dc3545',
      fontSize: '14px',
      top: '100%',
      margin: '5px 0 0 0',
    },
    
  })
  
  .onValidate(function ({ isValid, fields, groups }) {
    if (isValid) {
      console.log("Formulario completado");
    }
    if (!isValid) {
      console.log("Formulario no completado intente de nuevo", fields);
    }
  });

 
  
  validation
  
  .addField("#name", [
    

      {
        rule: 'required',
        errorMessage: "*El nombre es obligatorio"
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: "Minimo 8 caracteres",
        
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: "Maximo 50 caracteres",
        
      },
      
    ])

  
    .addField("#email", [

      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },

      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      {
        rule: 'email',
        errorMessage: "Correo no valido",
        
      },
    
      
    ])

    .addField("#password", [
      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },

      {
        rule: 'password',
        errorMessage: "Usa mayusculas y al menos un numero"
      },
      {
        rule: 'minLength',
        value: 8,
        errorMessage: "Minimo 6 caracteres",
        
      },
    
    
      
    ])

    .addField("#namempresa", [
      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
      {
        rule: 'maxLength',
        value: 25,
        errorMessage: "Maximo 25 caracteres",
        
      },
    
    
      
    ])


    .addField("#nit", [

      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
      {
        rule: 'number',
        errorMessage: "*solo ingresa numeros",
        
      },
    
    
      
    ])

    .addField("#tipo", [
      
      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
     
    ])
 
    .addField("#tipo2", [
      
      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
     
    ])

    .addField("#direccion", [
      
      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
     
    ])

    .addField("#telefono", [

      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
      {
        rule: 'number',
        errorMessage: "*solo ingresa numeros",
        
      },
    
    
      
    ])

    .addField("#acceptTerms", [

      {
        rule: 'required',
        errorMessage: "*campo obligatorio"
      },
      
  
    ])

    .addRequiredGroup('#che', '*campo obligatorio', {
      tooltip: {
        position: 'bottom',
        
      },
      
     
    })
    
 
  }


    password: string = '';
    passwordVisible: boolean = false;
  
    togglePasswordVisibility(): void {
      this.passwordVisible = !this.passwordVisible;
    }

    
  









  }
  






