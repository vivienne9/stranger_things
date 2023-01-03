export const BASE_URL = 'https://strangers-things.herokuapp.com/api/';
export const COHORT_NAME = '2209-FTB-ET-WEB-PT';

export const myUser = async (token) => {
    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await response.json();
      const me = json.data.username;
  
      return me;

    } catch (error) {
      console.log('Failed to fetch current user.');
      console.error(error);
      throw error;
    }
  };


