/* import axios from "axios"




export const commonAPI = async(httpRequest,url,reqBody)=>{
    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        Headers:{
            "Content-Type":"application/json"   // since we have only one type of content to upload so applictaion/json
        }  
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
} */

// commonAPI.js

import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, headers) => {
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: headers || {},
  };

  try {
    const result = await axios(reqConfig);
    return result;
  } catch (error) {
    return error;
  }
};