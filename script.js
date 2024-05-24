// Function to open the course modal
function openCourseModal(course) {
  var modal = document.getElementById("courseModal");
  var title = document.getElementById("courseModalTitle");
  var description = document.getElementById("courseModalDescription");

  title.textContent = course;
  description.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  // Set the course name in the hidden input field
  document.getElementById("courseName").value = course;
  modal.style.display = "block";
}

// Function to close the course modal
function closeCourseModal() {
  var modal = document.getElementById("courseModal");
  modal.style.display = "none";
}

function validateEnrollmentKey() {
  var enrollmentKey = document.getElementById("enrollmentKey").value;
  var courseName = document.getElementById("courseName").value;

  if (!enrollmentKey) {
    alert("Please enter an enrollment key.");
    return;
  }

  fetch("http://localhost:5000/validate-enrollment-key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: enrollmentKey, course: courseName }), // Include course name in the request body
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Parse response body as text
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log(data);
      if (data === "Success") {
        alert("Enrollment successful!"); // Show success message
        closeCourseModal(); // Close modal if enrollment is successful
        // Redirect to the corresponding course page
        if (courseName === "Intermediate") {
          window.location.href = "intermediate.html";
        } else if (courseName === "Degree") {
          window.location.href = "degree.html";
        } else if (courseName === "Post Graduation") {
          window.location.href = "postGraduation.html";
        }
      } else {
        throw new Error("Invalid enrollment key received: " + data); // Log received key
      }
    })
    .catch((error) => {
      console.error("Error validating enrollment key:", error);
      alert("Invalid enrollment key. Please try again.");
    });
}

// Function to show the navigation menu
function showMenu() {
  var navLinks = document.getElementById("navLinks");
  navLinks.style.right = "0";
}

// Function to hide the navigation menu
function hideMenu() {
  var navLinks = document.getElementById("navLinks");
  navLinks.style.right = "-200px";
}
