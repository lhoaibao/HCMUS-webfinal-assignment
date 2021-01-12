$("#frmRegister").on("submit", (e) => {
  e.preventDefault();
  // Check username đã tồn tại hay chưa

  const username = $("#username").val();
  $.getJSON(`/account/is-available?user=${username}`, function (data) {
    if (data) {
      $("#frmRegister").off("submit").submit();
    } else alert("Invalid data!");
  });
});

$("#txtDOB").datetimepicker({
  format: "d/m/Y",
  timepicker: true,
  mask: true,
});
const username = document.getElementById("username");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

validateInputs = () => {
  let flag = 1;
  // Get all values from th inputs
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const password2Value = password2.value;
  const lastNameValue = lastName.value;
  const firstNameValue = firstName.value;
  //Check username:
  if (usernameValue === "") {
    // Show error
    // Add error class
    setError(username, "Username can not be plank!");
    flag = 0;
  } else {
    setSuccess(username);
  }

  // Check firstName
  if (firstNameValue === "") {
    setError(firstName, "First name can not be plank!");
    flag = 0;
  } else setSuccess(firstName);

  // Check lastName
  if (lastNameValue === "") {
    setError(lastName, "Last name can not be plank!");
    flag = 0;
  } else setSuccess(lastName);

  //Check Email
  if (emailValue === "") {
    setError(email, "Email cannot be plank!");
    flag = 0;
  } else if (!isEmail(emailValue)) {
    setError(email, "Email is not valid!");
    flag = 0;
  } else {
    setSuccess(email);
  }

  //Check passsword
  if (passwordValue === "") {
    setError(passwordValue, "Password cannot be plank!");
    flag = 0;
  } else {
    setSuccess(password);
  }

  //Check password confirmed
  if (password2Value === "") {
    setError(password2, "Password confirmed cannot be plank!");
    flag = 0;
  } else if (password2Value !== passwordValue) {
    setError(password2, "Password does not match!");
    flag = 0;
  } else {
    setSuccess(password2);
  }

  return flag;
};

// Handle Error:
setError = (input, message) => {
  // Add message
  const formControlGroup = input.parentElement;
  const small = formControlGroup.querySelector("small");
  small.innerText = message;

  //Add error class
  formControlGroup.className = "form-control-group error";
};

// Handle Success:
setSuccess = (input) => {
  // Add class
  const formControlGroup = input.parentElement;
  formControlGroup.className = "form-control-group success";
};
isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

$("#frmRegister").on("submit", (e) => {
  e.preventDefault();
  // Check username đã tồn tại hay chưa

  /*const username = $("#username").val();
    $.getJSON(`/account/is-available?user=${username}`, function (data) {
        if (data) {
            if (validateInputs()) {
                $("#frmRegister").off("submit").submit();
            }
        } else alert("Invalid data!");
    });*/
  validateInputs();
});

$("#txtDOB").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: true,
});
