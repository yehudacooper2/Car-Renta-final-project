
import { Component } from '@angular/core';
import { UploadImageService } from '../shared/services/upload-image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: []
})
export class ImageComponent {
  imageUrl = '';
  fileToUpload: File = null;

  constructor(private imageService: UploadImageService) { }

  handleFileInput(file: FileList) {
    // Save image to the class property
    this.fileToUpload = file.item(0);


    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; };
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(caption) {
    this.imageService.postFile(caption, this.fileToUpload)
      .subscribe(data => { console.log('done'); });
  }
}
