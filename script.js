const coursesContainer = document.getElementById('courses-container');
const addCourseBtn = document.getElementById('add-course');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('result');

// Function to add a new course row
function addCourse() {
  const courseDiv = document.createElement('div');
  courseDiv.classList.add('course');
  courseDiv.innerHTML = `
    <input type="text" placeholder="Course Name" class="course-name">
    <input type="number" placeholder="Credits" class="course-credits" min="0">
    <select class="course-grade">
      <option value="4">A</option>
      <option value="3.7">A−</option>
      <option value="3.3">B+</option>
      <option value="3">B</option>
      <option value="2.7">B−</option>
      <option value="2.3">C+</option>
      <option value="2">C</option>
      <option value="1.7">C−</option>
      <option value="1">D</option>
      <option value="0">F</option>
    </select>
    <button class="remove-course">✖</button>
  `;
  coursesContainer.appendChild(courseDiv);

  const removeBtn = courseDiv.querySelector('.remove-course');
  removeBtn.addEventListener('click', () => {
    courseDiv.remove();
    // Scroll smoothly to top if needed
    coursesContainer.scrollTop = coursesContainer.scrollHeight;
  });

  // Smooth scroll to new course
  courseDiv.scrollIntoView({ behavior: 'smooth' });
}

// Add initial event listener
addCourseBtn.addEventListener('click', addCourse);

// Calculate GPA
calculateBtn.addEventListener('click', () => {
  const courseDivs = document.querySelectorAll('.course');
  let totalPoints = 0;
  let totalCredits = 0;

  courseDivs.forEach(course => {
    const credits = parseFloat(course.querySelector('.course-credits').value) || 0;
    const grade = parseFloat(course.querySelector('.course-grade').value) || 0;
    totalPoints += credits * grade;
    totalCredits += credits;
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0.00;
  result.textContent = `GPA: ${gpa}`;
});

// Reset all courses
resetBtn.addEventListener('click', () => {
  coursesContainer.innerHTML = '';
  addCourse(); // Add one empty course row
  result.textContent = 'GPA: 0.00';
});

// Initialize with one course row
addCourse();
