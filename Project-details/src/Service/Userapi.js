import { userInstance } from "../Axios/userInstance";



export const userRegister = async (values) => {
    try {
      await userInstance.post('/register', { ...values });
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };
  
  export const userLogin = (values) => {
    console.log(values, '!!!!!');
    return userInstance.post('/userlogin', { ...values });
  };


  export const taskUpdate=(values)=>{
    console.log(values,'@@@');
    return userInstance.post('/taskUpdation',{...values})
  }

  export const userHeader = () => {
    return userInstance.get('/userheader');
  };

 
  export const userDatas = async (loggedInUserEmail) => {
    try {
      const email = loggedInUserEmail.email; 
      const response = await userInstance.get(`/getdata/${email}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  };
  

  export const getTask = async()=>{
    try {
      const response = await userInstance.get('/getupdates')
      return response.data;
    } catch (error) {
      console.error('Error fetching updated tasks:', error.message);
      throw error;
    }
  }


export const editUpdate = async(detailsId,updatedData)=>{
  try {
    const response=userInstance.put(`/edit/${detailsId}`,updatedData);
    return (await response).data;
  } catch (error) {
    console.error('Error updating event:', error.message);
    throw error;
  }
}


  // export const userDatas = async (loggedInUserId) => {
  //   try {
  //     const userId=loggedInUserId.id;
  //     const response = await userInstance.get(`/getdata/${userId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error('Failed to fetch user data');
  //   }
  // };
  
  