import { adminInstance } from '../Axios/adminInstance';

export const getUpdate = async () => {
  try {
    const response = await adminInstance.get('/updation');
    return response.data;
  } catch (error) {
    console.error('Error fetching updated tasks:', error.message);
    throw error;
  }
};

export const adminLogin = async ({ email, password }) => {
  try {
    const response = await adminInstance.post('/adminlogin', {
      email,
      password,
    });
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

export const adminHeader = () => {
  return adminInstance.get('/adminheader');
};

export const handleSearch = async (query) => {
  try {
    const response = await adminInstance.post('/search', { query: query });
    return response.data;
  } catch (error) {
    console.log('Error searching:', error.message);
    throw error;
  }
};


export const getUserlist = async () => {
  try {
    const response = await adminInstance.get('/userlist');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    const response = await adminInstance.put(`/block/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await adminInstance.put(`/unblock/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};