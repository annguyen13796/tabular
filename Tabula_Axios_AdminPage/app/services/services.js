// tạo lớp đối tượng service gọi api
function Service_API() {
  //fetch data request
  this.fetchData = function () {
    return axios({
      url: "https://625569578646add390d66e73.mockapi.io/api/users",
      method: "GET",
    });
  };

  //add request
  this.add = function (user) {
    return axios({
      url: `https://625569578646add390d66e73.mockapi.io/api/users`,
      method: "POST",
      data: user,
    });
  };

  //delete request
  this.delete = function (id) {
    return axios({
      url: `https://625569578646add390d66e73.mockapi.io/api/users/${id}`,
      method: "DELETE",
    });
  };

  //edit request
  this.edit = function (id) {
    return axios({
      url: `https://625569578646add390d66e73.mockapi.io/api/users/${id}`,
      method: "GET",
    });
  };

  //update request
  this.update = function (user) {
    return axios({
      url: `https://625569578646add390d66e73.mockapi.io/api/users/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}
