// import s from "./style.module.css";
import {StarFill, Star as StarEmpty, StarHalf} from "react-bootstrap-icons";

export function FiveStarRating({rating}) {
    // declarer un tableau detoiles jsx vides
    const starList = [];

    // Stocker dans une variable le nombre detoile pleine
    const starFillCount = Math.floor(rating);

    // Stocker dans une variable si oui ou non il y a une demi etoile
    const hasStarHalf = rating - starFillCount >= 0.5;

    // Stocker dans une variable le nombre detoile vide
    const emptyStarCount = 5 - starFillCount - (hasStarHalf? 1 : 0);

    // pusher dans le tableau les etoiles pleine
      for(let i = 1; i<= starFillCount; i++){
        starList.push(<StarFill key={"star-fill" + i}/>)
      }  
    // pusher dans le tableau les demi etoiles sil y en a
    if (hasStarHalf) {
        starList.push(<StarHalf key={"star-half"}/>);
    }
    
    // pusher dans le tableau les etoiles vide
    for(let i = 1; i<= emptyStarCount; i++){
        starList.push(<StarEmpty key={"star-empty" + i}/>)
      }  

    

    return <div>
       {starList}
    </div>
}