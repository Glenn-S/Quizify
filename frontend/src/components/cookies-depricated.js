import Cookies from 'js-cookie';

export const NAME = 'user';
export const ID = 'id';
export const GIVEN_NAME = 'givenName';
export const FAMILY_NAME = 'familyName';
export const EMAIL = 'email';
export const IMAGE_URL = 'imageUrl';

/**
 * @param {string} googleId 
 * @param {string} name 
 */
export const setCookies = ({ givenName, familyName, email, name, googleId, imageUrl }) => {
  if (googleId === null || googleId === undefined || name === null || name === undefined) {
    throw new Error('The google id or name should not be null');
  }

  Cookies.set(NAME, name, { expires: 7 });
  Cookies.set(ID, googleId, { expires: 7 });
  Cookies.set(GIVEN_NAME, givenName, { expires: 7 });
  Cookies.set(FAMILY_NAME, familyName, { expires: 7 });
  Cookies.set(EMAIL, email, { expires: 7 });
  Cookies.set(IMAGE_URL, imageUrl, { expires: 7 });
};

export const get = (name) => {
  return Cookies.get(name);
};

export const getCookies = () => {
  return { 
    user: Cookies.get(NAME), 
    id: Cookies.get(ID),
    givenName: Cookies.get(GIVEN_NAME),
    familyName: Cookies.get(FAMILY_NAME),
    email: Cookies.get(EMAIL),
    imageUrl: Cookies.get(IMAGE_URL)
  };
}

export const removeCookies = () => {
  Cookies.remove(NAME);
  Cookies.remove(ID);
  Cookies.remove(GIVEN_NAME);
  Cookies.remove(FAMILY_NAME);
  Cookies.remove(EMAIL);
  Cookies.remove(IMAGE_URL);
}