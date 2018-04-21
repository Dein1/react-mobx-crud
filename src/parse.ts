export default (path: string) => {
  const request = new XMLHttpRequest();
  request.open('GET', path, false);
  request.send();
  if (request.status !== 200) {
    console.log('error');
  } else {
    return JSON.parse(request.responseText);
  }  
};
