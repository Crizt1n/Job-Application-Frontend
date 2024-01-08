import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"


//register API 
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/users/register`,user)
    
}

//login API
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/users/login`,user)
}

// Add form API
export const addDetailsAPI = async(reqBody,reqHeader) => {
  return await commonAPI("POST",`${BASE_URL}/applications/add`, reqBody, reqHeader);
};

//get user Applications
export const allUserApplications = async(reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/users/all-applications`,"",reqHeader)
}

//edit user List API
export const editDetailsAPI = async(listId,reqBody,reqHeader)=>{
  //path parameter - :id - router
  return await commonAPI("PUT",`${BASE_URL}/applications/edit/${listId}`,reqBody,reqHeader)
}

//delete API
export const deleteUserApplications = async(listId,reqHeader)=>{
  return await commonAPI("DELETE",`${BASE_URL}/applications/remove/${listId}`,{},reqHeader)
}