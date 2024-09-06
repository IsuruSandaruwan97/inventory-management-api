export const manageTokens = (tokenArray:any, newToken:string):string[] =>{
  if(!Array.isArray(tokenArray)) {
    return [newToken];
  }
    tokenArray.push(newToken);
    if (tokenArray.length > 5) {
      tokenArray.splice(0, tokenArray.length - 5);
    }
  return tokenArray
}