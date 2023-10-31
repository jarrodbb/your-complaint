//Utilis to validate email

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//utilis to validate password
export function checkPassword(input) {
  const passw = /^[A-Za-z]\w{5,}$/;
  if (input.match(passw)) {
    return true;
  }
  return false;
}
