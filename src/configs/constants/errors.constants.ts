export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to access this feature',
  AUTHENTICATION: {
    INVALID_CREDENTIALS: 'Invalid Credentials',
    MAX_LOGIN_ATTEMPTS_REACHED:'Maximum login attempts reached!'
  },
  USERS:{
    INVALID_USER_ID:'Invalid User ID!',
    USER_NOT_FOUND: 'User Not Found!',
    USER_ALREADY_EXISTS: 'User Already Available!',
  },
  CATEGORIES:{
    CATEGORY_NOT_FOUND: 'Category Not Found!',
    ALREADY_EXISTS: 'Category already exists!',
  },
  TRANSACTIONS:{
    EMPTY_PAYLOAD:'Please select at least one item!',
    STOCK_NOT_AVAILABLE:'Items not available in stock for your request!',
    REQUEST_NOT_FOUND:'Request not found!'
  }
}

export const PRISMA_ERROR_MESSAGES = {
  P2000: "Too long. Please make it shorter!",
  P2001: "Can't find it. Please check again!",
  P2002: "Already exists. Please try something else!",
  P2003: "Missing something. Please check and try again!",
  P2004: "Something went wrong. Please try again!",
  P2005: "Incorrect input. Please fix it!",
  P2006: "Not right. Please correct it!",
  P2007: "Invalid data. Please check and try again!",
  P2008: "Connection issue. Please try later!",
  P2009: "Problem with request. Please try again!",
  P2010: "Operation failed. Please try again!",
  P2011: "Missing info. Please complete it!",
  P2012: "Can't create. Data missing!",
  P2013: "Incomplete request. Please try again!",
  P2014: "Related item missing. Please check!",
  P2015: "Couldn't find it. Please check!",
  P2016: "No matches found. Please search again!",
  P2017: "Too many matches. Please narrow it down!",
  P2018: "Connected item missing. Please check!",
  P2019: "Data too big. Please reduce it!",
  P2020: "Data problem. Please try again!",
  P2021: "Took too long. Please try again!",
  P2022: "Data issue. Please fix errors!",
  P2023: "Invalid value. Please try again!",
  P2024: "Something's missing. Please check!"
};