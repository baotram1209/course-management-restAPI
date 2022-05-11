// var ListCoursesBlock = document.querySelector("#list-courses");

var courseApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourse);
  handleCreateForm();
}
// Start ứng dụng web
start();

//Functions

//Read
function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderCourse(courses) {
  console.log(courses);
  var listCoursesBlock = document.querySelector("#list-courses");
  var htmls = courses.map(function (course) {
    return `<li class="course-item-${course.id}">
          <h4>${course.name}</h4>
          <h4>${course.description}</h4>
          <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
          </li>`;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}

//Create
function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}

//Handle form
function handleCreateForm() {
  var createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };
    createCourse(formData, function () {
      getCourses(renderCourse);
    });
  };
}

//Delete
function handleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(courseApi + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      var courseItem = document.querySelector(".course-item-${id}");
      if (courseItem) {
        courseItem.remove();
      }
    });
}
