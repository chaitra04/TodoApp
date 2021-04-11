import axios from "./Network";
import { ApiConfig } from "../Config/ApiConfig";

const reverseGeoFilter = "sublocality|ward|locality|neighborhood";

class GoogleMaps {
  static reverseGeocode(lat, lng) {
    return axios({
      method: "get",
      url:
        `${ApiConfig.google.baseURL +
            ApiConfig.google.reverseGeocode 
        }?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&result_type=${reverseGeoFilter}`
    });
  }

  static geocode(address) {
    return axios({
      method: "get",
      url:
        `${ApiConfig.google.baseURL +
            ApiConfig.google.reverseGeocode 
        }?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&result_type=${reverseGeoFilter}`
    });
  }
}

export default GoogleMaps;
