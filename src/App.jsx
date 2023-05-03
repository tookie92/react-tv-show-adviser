import { useEffect, useState} from "react";
import { TVShowApi } from "./api/tv-show";
import "./global.css"
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TvShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {

    const [currentTvShow, setCurrentTvShow]= useState();
    const [recommendationList, setRecommendationList]= useState();

    async function fetchPopulars() {
        try{
            const populars = await TVShowApi.fetchPopular();
            if(populars.length>0){
                setCurrentTvShow(populars[0]);
            }
        }catch(e){
            alert(e.message);
        }
    };
    async function fetchRecommandations(tvShowId) {
        try{
            const recommendations = await TVShowApi.fetchRecommandations(tvShowId);
            if(recommendations.length>0){
                setRecommendationList(recommendations.slice(0, 10));
            }
        }catch(e){
            alert(e.message);
        }
    };

    

   useEffect(()=>{
    fetchPopulars();
   },[])

   useEffect(()=>{
    if (currentTvShow) {
        fetchRecommandations(currentTvShow.id);
    }
   },[currentTvShow])


//    async function searchTVShow(tvShowName) {
//     try{
//     const searchReponse = await TVShowApi.fetchByTitle(tvShowName);
//     if (currentTvShow.length > 0) {
//         setCurrentTvShow(searchReponse[0])
//     }
//     }catch(erreur){
//         alert(erreur.message);
//     }
//    }
    async function searchTVShow(tvShowName) {
        try {
        const searchResponse = await TVShowApi.fetchByTitle(tvShowName);
        if (searchResponse.length > 0) {
            setCurrentTvShow(searchResponse[0]);
        }
        } catch (error) {
        alert("Erreur durant la recherche de la série ");
        }
    }

    return <div 
    className={s.main_container}
    style={{background: currentTvShow? 
        `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`:"black"}}
    >
        <div className={s.header}>
            <div className="row">
            <div className="col-4">
                <Logo image={logo} title= "WhatoWatch" subtitle="Find Something to watch"/>
            </div>
            <div className="col-sm-12 col-lg-4">
                <SearchBar onSubmit={searchTVShow}/>
            </div>
            </div>
        </div>
        <div className={s.tv_show_detail}>{currentTvShow && <TvShowDetail tvShow={currentTvShow}/>}</div>
        <div className={s.recommandations}>
            {
            currentTvShow && 
            (
                <>
                   {recommendationList && recommendationList.length > 0 && <TVShowList onClickItem={setCurrentTvShow} tvShowList={recommendationList}/>}
                </>
            )
            }
        </div>
    </div>;
}