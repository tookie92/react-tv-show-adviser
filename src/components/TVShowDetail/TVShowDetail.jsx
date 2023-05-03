import { FiveStarRating } from "../FiveStarRating/FiveStarRating";
import s from "./style.module.css"


export function TvShowDetail({tvShow}) {
    const rating = tvShow.vote_average /2;

    return <div>
        <div className={s.title}>{tvShow.name}</div>
        <div className={s.rating_container}>
            <FiveStarRating rating={rating}/>
            <div className={s.rating}>{rating} / 5</div>
        </div>
        <div className={s.description}>{tvShow.overview}</div>
    </div>;
}