const registration = document.querySelector(".registration");
const input = document.querySelectorAll("input");
const form = document.querySelector("form");
const password_err = document.querySelector(".password_err");
const email_err = document.querySelector(".email_err");
const password2_err = document.querySelector(".password2_err");
let res = true;

function validation() {
  if (
    form[3].value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/) &&
    form[3].value !== ""
  ) {
    password_err.innerText = "";
    form[3].classList.add("success");
    res = true;
  } else if (form[3].value !== "") {
    password_err.innerText =
      "От 8 до 15 символов с минимум одной цифрой,одной заглавной и одной строчной буквой";
    password_err.classList.add("error");
    res = false;
  }
  if (
    form[2].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/) &&
    form[2].value !== ""
  ) {
    email_err.innerText = "";
    form[2].classList.add("success");
    res = true;
  } else if (form[2].value !== "") {
    email_err.innerText =
      "Пожалуйста, используйте действительный адрес электронной почты";
    email_err.classList.add("error");
    res = false;
  }
  if (
    form[4].value === form[3].value &&
    form[4].value.length > 7 &&
    form[4].value.length < 16
  ) {
    password2_err.innerText = "";
    form[4].classList.add("success");
    res = true;
  } else if (form[4].value !== "") {
    password2_err.innerText = "Пароли не совпадают";
    password2_err.classList.add("error");
    res = false;
  }
}
for (let i = 2; i <= 4; i++) {
  form[i].addEventListener("input", validation);
}

function createObj() {
  return {
    name:input[0].value[0].toUpperCase() +input[0].value.slice(1, input[1].value.length),
    lastname:input[1].value[0].toUpperCase() +input[1].value.slice(1, input[1].length),
    email: input[2].value,
    password: input[3].value,
  };
}

registration.addEventListener("click", () => {
  if (res === true) {
    let emailchecker;
    let person = createObj();
   
    async function zapros() {
      let data = await fetch(
        `https://retoolapi.dev/pXF605/data?email=${person.email}`
      );
      const dataResp = await data.json();
      emailchecker = dataResp.length;

      if (emailchecker === 0) {
        let c = await fetch("https://retoolapi.dev/pXF605/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(person),
        });
        
        window.location.host = "Mannex-Shop";
        window.location.href="login.html"
      } else {
        email_err.innerText = " this email is already in use";
        email_err.classList.add("error");
      }
    }
    zapros();
  }
  
});




