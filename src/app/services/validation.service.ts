import { Injectable } from '@angular/core';
import JustValidate from 'just-validate';

@Injectable({
  providedIn: 'root',
})
export class ValidationService  {
  private empresaValidator: JustValidate | undefined;
  private consultorValidator: JustValidate | undefined;

  constructor() {}



  initializeEmpresaValidator(): void {
    
    this.empresaValidator = this.initValidation('#register', this.getEmpresaValidations());
  }

  initializeConsultorValidator(): void {
    this.consultorValidator = this.initValidation('#register2', this.getConsultorValidations());
  }




    // Función común para inicializar validaciones con JustValidate
    private initValidation(formId: string, validations: any[]): JustValidate {
      const validator = new JustValidate(formId, {
      validateBeforeSubmitting: true,
      errorLabelStyle: {
        color: '#dc3545',
        fontSize: '14px',
        top: '100%',
        margin: '5px 0 0 0',
      },
  
      
      
    });

    validations.forEach(validation => {
      if (validation.field) {
        validator.addField(validation.field, validation.rules);
      } else if (validation.requiredGroup) {
        validator.addRequiredGroup(validation.requiredGroup, validation.errorMessage, validation.options);
      }
    });

    return validator;
  }



 

  private getEmpresaValidations(): any[] {
    return [

      {
        field: '#name',
        rules: [
          { rule: 'required', errorMessage: "*El nombre es obligatorio" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 8 caracteres" },
          { rule: 'maxLength', value: 50, errorMessage: "Maximo 50 caracteres" },
        ]
      },



      {
        field: '#email',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'email', errorMessage: "Correo no valido" },
        ]
      },
    
      
    

      {
        field: '#password',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'password', errorMessage: "Usa mayusculas y al menos un numero" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 6 caracteres" },
        ]
      },

      {
        field: '#namempresa',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'maxLength', value: 25, errorMessage: "Maximo 25 caracteres" },
        ]
      },


      {
        field: '#nit',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'number', errorMessage: "*solo ingresa numeros" },
        ]
      },

      {
        field: '#tipo',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
        ]
      },

      {
        requiredGroup: '#che',
        errorMessage: '*Campo obligatorio',
        options: {
          tooltip: {
            position: 'bottom',
          },
        },
      },
      
    
 
      {
        field: '#tipo2',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
        ]
      },

      {
        field: '#direccion',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
        ]
      },

      {
        field: '#telefono',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'number', errorMessage: "*solo ingresa numeros" },
        ]
      },


    {
      field: '#acceptTerms',
      rules: [
        { rule: 'required', errorMessage: "*campo obligatorio" },
      ]
    },

  
  
    ];
  }

  
  private getConsultorValidations(): any[] {
    return [
      {
        field: '#name1',
        rules: [
          { rule: 'required', errorMessage: "*El nombre es obligatorio" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 8 caracteres" },
          { rule: 'maxLength', value: 50, errorMessage: "Maximo 50 caracteres" },
        ]
      },

      {
        field: '#email1',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'email', errorMessage: "Correo no valido" },
        ]
      },
    
      {
        field: '#cedula1',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'number', errorMessage: "*solo ingresa numeros" },
        ]
      },

      {
        field: '#password1',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          { rule: 'password', errorMessage: "Usa mayusculas y al menos un numero" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 6 caracteres" },
        ]
      },

      {
        field: '#tipo1',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
        ]
      },
      {
        field: '#Departamento1',
        rules: [
          { rule: 'required', errorMessage: "*El nombre es obligatorio" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 8 caracteres" },
          { rule: 'maxLength', value: 50, errorMessage: "Maximo 50 caracteres" },
        ]
      },
      {
        field: '#programa',
        rules: [
          { rule: 'required', errorMessage: "*El nombre es obligatorio" },
          { rule: 'minLength', value: 8, errorMessage: "Minimo 8 caracteres" },
          { rule: 'maxLength', value: 50, errorMessage: "Maximo 50 caracteres" },
        ]
      },
      
    

      {
        field: '#año',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
          
          {
            rule: 'number',
            errorMessage: '*Solo números',
          },
          {
            rule: 'minNumber',
            value: 1950,
            errorMessage: '*El año debe ser mayor o igual a 1950',
          },
          {
            rule: 'maxNumber',
            value: 2024,
            errorMessage: '*El año debe ser menor o igual a 2024',
          },
        ]

      },

      {
        field: '#tipo3',
        rules: [
          { rule: 'required', errorMessage: "*campo obligatorio" },
        ]
      },

      {
      field: '#acceptTerms1',
      rules: [
        { rule: 'required', errorMessage: "*campo obligatorio" },
      ]
      }
    

    ]
  }


}