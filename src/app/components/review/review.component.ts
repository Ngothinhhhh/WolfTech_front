import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {



// xem trước hình đánh giá
handlePreViewRatingImages(): void{
  (document.getElementById('listImagesChoosedID') as HTMLDivElement).innerHTML = "";
  // let imgsPreLink = [];
  let filesImg = (document.getElementById('imagesRatingID') as any).files;
  for(let i=0; i<5; i++){
    const imgElement = document.createElement("img");
    const div = document.createElement("div");
    const button = document.createElement("button");
    // 
    div.id = `imgWrapperID${i}`;
    //
    button.addEventListener('click', function(){
      // (document.getElementById('imgWrapper0') as HTMLDivElement);
    }); 
    //
    imgElement.src = URL.createObjectURL(filesImg[i]);
    imgElement.style.height = '150px';
    imgElement.style.width = '150px';
    // imgElement.style.objectFit = 'cover';
    imgElement.style.border =  '.5px solid #efefef';
    imgElement.style.borderRadius = '4px';
    imgElement.style.margin = '5px';
    imgElement.id = `${i}`;
    ((document.getElementById('listImagesChoosedID') as HTMLDivElement).appendChild(imgElement));
  }
  // (document.getElementById('listImagesChoosedID'))
}


// đánh giá sao (1-5 sao) cho sản phẩm
starRatingForProduct(numberOfStars: string): void {
  let currentStarOfProduct = document.getElementById('starRatingOfProductID') as HTMLInputElement;
  let starRatingForm = document.getElementsByClassName('starRatingOfProduct')[0] as HTMLDivElement;
  if(numberOfStars != currentStarOfProduct.value){
    for(let i=1; i<=5; i++){
      if(i <= ((numberOfStars as any) - 0)){
        ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star checked"
      }else{
        ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star"
      }
    }
    (document.getElementById('starRatingOfProductID') as HTMLInputElement).value = numberOfStars
    console.log((document.getElementById('starRatingOfProductID') as HTMLInputElement).value)
  }else{
    for(let i=1; i<=5; i++){
      ((starRatingForm.childNodes[i]) as HTMLElement).className = "fa fa-star"
    }
    (document.getElementById('starRatingOfProductID') as HTMLInputElement).value = '0';
    console.log("Chưa đánh giá")
  }
 console.log(numberOfStars);  
}
}
