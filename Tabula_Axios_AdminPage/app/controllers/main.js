var service = new Service_API();

var validation = new Validation();

//account name List for exist checking
var accountNameList = [];

//reset input field and error
function resetInput() {
  document.getElementById("TaiKhoan").value = null;
  document.getElementById("TaiKhoan").disabled = false;
  document.getElementById("HoTen").value = null;
  document.getElementById("MatKhau").value = null;
  document.getElementById("Email").value = null;
  document.getElementById("HinhAnh").value = null;
  document.getElementById("loaiNguoiDung").value = "Chọn loại người dùng";
  document.getElementById("loaiNgonNgu").value = "Chọn ngôn ngữ";
  document.getElementById("MoTa").value = null;

  for (var i = 0; i < document.getElementsByClassName("errorID").length; i++) {
    document.getElementsByClassName("errorID")[i].innerHTML = null;
  }

  document.getElementById("passwordView").className = "fa-solid fa-eye-slash";
  document.getElementById("MatKhau").setAttribute("type", "password");
}

//get input data
function getUserInput() {
  var id = "";
  var account = document.getElementById("TaiKhoan").value;
  var fullname = document.getElementById("HoTen").value;
  var password = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var avatar = document.getElementById("HinhAnh").value;
  var user = document.getElementById("loaiNguoiDung").value;
  var language = document.getElementById("loaiNgonNgu").value;
  var about = document.getElementById("MoTa").value;

  var isValid = true;

  isValid &=
    validation.nullCheck(account, "accountError", "(*) Account không được rỗng") &&
    validation.existCheck(account, accountNameList, "accountError", "(*) Account đã tồn tại, vui lòng chọn account name khác");

  isValid &=
    validation.nullCheck(fullname, "nameError", "(*) Tên không được rỗng") &&
    validation.textCheck(fullname, "nameError", "(*) Tên chỉ chứa ký tự a->z");

  isValid &=
    validation.nullCheck(password, "passwordError", "(*) Password không được rỗng") &&
    validation.passwordCheck(password, "passwordError", "(*) Password không đủ mạnh");

  isValid &=
    validation.nullCheck(email, "emailError", "(*) Email không được rỗng") &&
    validation.emailCheck(email, "emailError", "(*) Email không đúng định dạng");

  isValid &= validation.nullCheck(avatar, "avatarError", "(*) Hình ảnh không được rỗng");

  isValid &= validation.selectCheck(user, "Chọn loại người dùng", "userError", "(*) Vui lòng chọn loại người dùng");

  isValid &= validation.selectCheck(language, "Chọn ngôn ngữ", "languageError", "(*) Vui lòng chọn ngôn ngữ");

  isValid &=
    validation.nullCheck(about, "aboutError", "(*) Mô tả không được rỗng") &&
    validation.lengthCheck(about, "aboutError", "(*) Mô tả vượt quá 60 ký tự", 1, 60);

  if (isValid) {
    var user = new User(id, account, fullname, password, email, user, language, about, avatar);
    return user;
  }
  return null;
}

//show data back into input field
function showUserData(user) {
  document.getElementById("TaiKhoan").value = user.account;
  document.getElementById("HoTen").value = user.fullname;
  document.getElementById("MatKhau").value = user.password;
  document.getElementById("Email").value = user.email;
  document.getElementById("HinhAnh").value = user.avatar;
  document.getElementById("loaiNguoiDung").value = user.user;
  document.getElementById("loaiNgonNgu").value = user.language;
  document.getElementById("MoTa").value = user.about;
}

//call data from api
function getUserList_API() {
  service
    .fetchData()
    .then(function (result) {
      renderUser_HTML(result.data);

      for (var i = 0; i < result.data.length; i++) {
        accountNameList[i] = result.data[i].account;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//request data from API
getUserList_API();

//render user list at HTML
function renderUser_HTML(list) {
  var content = "";
  for (var i = 0; i < list.length; i++) {
    content += `
        <tr class="text-center">
            <td>${i + 1}</td>
            <td>${list[i].account}</td>
            <td>${list[i].password}</td>
            <td>${list[i].fullname}</td>
            <td>${list[i].email}</td>
            <td>${list[i].language}</td>
            <td>${list[i].user}</td>
            <td>
                <i class="fa-solid fa-pen-to-square mx-2" data-toggle="modal" data-target="#userModal" onclick="editUser('${
                  list[i].id
                }')"></i>
                <i class="fa-solid fa-trash-can mx-2" onclick="deleteUser('${list[i].id}')"></i>
            </td>
        </tr>
    `;
  }

  document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

//click to show/hide password
document.getElementById("passwordView").addEventListener("click", function () {
  document.getElementById("passwordView").classList.toggle("fa-eye-slash");
  document.getElementById("passwordView").classList.toggle("fa-eye");

  if (document.getElementById("passwordView").className === "fa-solid fa-eye-slash") {
    document.getElementById("MatKhau").setAttribute("type", "password");
  } else {
    document.getElementById("MatKhau").setAttribute("type", "text");
  }
});

//click add new user then open modal and create add button
document.getElementById("btnThemNguoiDung").addEventListener("click", function () {
  resetInput();
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  document.querySelector(".modal-footer").innerHTML = "<button class='btn btn-success' onclick='addUser()'>Thêm</button>";
});

//click add user
function addUser() {
  var user = getUserInput();

  if (user) {
    service
      .add(user)
      .then(function () {
        getUserList_API();

        document.getElementById("btnCloseModal").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//click delete user
function deleteUser(id) {
  service
    .delete(id)
    .then(function () {
      getUserList_API();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//click edit user
function editUser(id) {
  document.querySelector(".modal-title").innerHTML = "Update thông tin người dùng";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button id='btnUpdateUser' class='btn btn-success' onclick='updateUser(${id})'>Update</button>`;

  document.getElementById("MatKhau").setAttribute("type", "password");
  document.getElementById("passwordView").className = "fa-solid fa-eye-slash";

  for (var i = 0; i < document.getElementsByClassName("errorID").length; i++) {
    document.getElementsByClassName("errorID")[i].innerHTML = null;
  }

  document.getElementById("TaiKhoan").disabled = true;

  service
    .edit(id)
    .then(function (result) {
      showUserData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//click update user
function updateUser(id) {
  // check if user does not change their account name when editing
  // then assign array with the rest item not including "current user's account name"
  // this means if user keep their current account name, it wont show error
  // different from checking when adding new user (check the whole array)
  // i dont know how to explain this more clearly so it's pretty hard to understand what i said :))))))
  // hope you get it! thank
  var accountName = document.getElementById("TaiKhoan").value;
  var index = accountNameList.indexOf(accountName);

  accountNameList.splice(index, 1);

  var user = getUserInput();
  if (user) {
    user.id = id;

    service
      .update(user)
      .then(function () {
        getUserList_API();

        document.getElementById("btnCloseModal").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
