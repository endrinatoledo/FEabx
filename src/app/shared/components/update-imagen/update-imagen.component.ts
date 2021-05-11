import { Component, OnInit,Output,EventEmitter} from '@angular/core';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-imagen',
  templateUrl: './update-imagen.component.html',
  styleUrls: ['./update-imagen.component.scss']
})
export class UpdateImagenComponent implements OnInit {
  @Output() salida=new EventEmitter<any>();
  imagen:any;
  ngOnInit() {}

  constructor(private snackBar: MatSnackBar) { }

  getStingImage(imagen){
    this.imagen=imagen;
    this.salida.emit(imagen)
}
  changeListener($event) : void {this.readThis($event.target);}
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var extn = file.name.split(".").pop();
    if(file.size / 1024 <= 1000 ){
      if( extn=== "png"  || extn=== "jpg" ||  extn=== "gif"   ||  extn=== "jpeg"  )
      {
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {this.getStingImage(myReader.result);}
      myReader.readAsDataURL(file);
      }else
      {
        this.snackBar.open('formato invalido', null, {
          duration: 4000
          });
        this.getStingImage(null);
      }
    }else{

      this.snackBar.open('Tamaño maximo de la imagen debe ser de 1 MB', null, {
        duration: 4000
        });

    }

  }

}
