// tạo service
var service = new Service();

//Hide ...Loading
document.querySelector(".list__loading").style.display = "none";

// hàm call API
function getMemberList_API() {
  //show loading
  document.querySelector(".list__loading").style.display = "block";

  service
    .fetchData()
    .then(function (result) {
      // fetchData success => hide loading
      document.querySelector(".list__loading").style.display = "none";

      renderMember_HTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
      document.querySelector(".list__loading").querySelector("p").innerHTML = "An error occurred! Please come back later";
    });
}

// hàm render HTML
function renderMember_HTML(list) {
  var content = "";
  for (var i = 0; i < list.length; i++) {
    // only render users with user type = "Teacher"
    if (list[i].user === "Teacher") {
      content += `
        <div class="col-lg-3 col-sm-6 col-12">
              <div class="card member__card animate__animated animate__fadeIn">
                <div class="member__img">
                  <img class="card-img-top" src="./image/${list[i].avatar}" alt="" />
                </div>
                <div class="card-body text-center">
                  <h6 class="member__language">${list[i].language}</h6>
                  <h4 class="card-title member__name">${list[i].fullname}</h4>
                  <p class="card-text member__info">${list[i].about}</p>
                </div>
              </div>
            </div>
        `;
    }
  }

  document.getElementById("memberList").innerHTML = content;
}

// gọi hàm call API
getMemberList_API();
