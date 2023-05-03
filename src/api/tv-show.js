import axios from "axios";
import { BASE_URL, API_KEY_PARAM } from "../config";


export class TVShowApi{
   static async fetchPopular(){
      const reponse = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
      return reponse.data.results;
    }

   static async fetchRecommandations(tvShowId){
      const reponse = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
      return reponse.data.results;
    }

    
   static async fetchByTitle(title){
      const reponse = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`);
      return reponse.data.results;
    }


}