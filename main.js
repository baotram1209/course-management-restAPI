// var ListCoursesBlock = document.querySelector("#list-courses");

var courseApi = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourse);
}
start();

//Functions
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
    return `<li>
          <h4>${course.name}</h4>
          <h4>${course.description}</h4>
          </li>`;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}
