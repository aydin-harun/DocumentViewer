const url = "http://localhost:5000/api/";

export function auth(userName, password) {
  return fetch(url + "auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: userName, password: password }),
  });
}

export function logout(token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "auth/logout", requestOptions);
}

export function getDepartments(token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "department/userdepartments", requestOptions);
}

export function getDepartmentsFields(departmentId, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "department/departmentfields/"+ departmentId, requestOptions);
}

export function getLookupDetailData(tLookupDataId, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "lookup/"+ tLookupDataId, requestOptions);
}

export function getDocuments(searchFields, rowNumStart, rowCount, tDepartmanId, token, getCount) {
  // console.log("Arama Başladı");
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);
  myHeaders.append( "Content-Type", "application/json" );
  var requestOptions = {method: "POST",
    body: JSON.stringify({ searchFields: searchFields, rowNumStart: rowNumStart ,rowCount : rowCount ,
       tDepartmanId: tDepartmanId,getCount : getCount}),
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "document/search", requestOptions);
}

export function getDocPdf(tPageGroupId, token) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer: " + token);
  myHeaders.append("Cookie", "access_token=" + token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return fetch(url + "document/pdf/"+ tPageGroupId, requestOptions);
}

export default { auth, getDepartments, getDepartmentsFields, getLookupDetailData, getDocPdf };
