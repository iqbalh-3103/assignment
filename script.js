// ===========================
// ADD / REMOVE ROW
// ===========================
const tbody = document.getElementById("subjects-body");

document.getElementById("add-row").addEventListener("click", () => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="New Subject"></td>
    <td><input type="number" value="3" min="0.5" step="0.5"></td>
    <td>
      <select>
        <option value="4.0">A (4.00)</option>
        <option value="3.67">A- (3.67)</option>
        <option value="3.33">B+ (3.33)</option>
        <option value="3.0">B (3.00)</option>
        <option value="2.67">B- (2.67)</option>
        <option value="2.33">C+ (2.33)</option>
        <option value="2.0">C (2.00)</option>
        <option value="1.67">D+ (1.67)</option>
        <option value="1.0">D (1.00)</option>
        <option value="0.0">F (0.00)</option>
      </select>
    </td>
    <td><button class="btn small remove-row">Remove</button></td>
  `;
  tbody.appendChild(row);
});

// REMOVE ROW
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-row")) {
    if (tbody.children.length > 1) e.target.closest("tr").remove();
  }
});

// ===========================
// CGPA CALCULATION
// ===========================
document.getElementById("calculate").addEventListener("click", () => {
  const rows = tbody.querySelectorAll("tr");
  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach(row => {
    const credits = parseFloat(row.children[1].querySelector("input").value);
    const grade = parseFloat(row.children[2].querySelector("select").value);

    totalCredits += credits;
    totalPoints += credits * grade;
  });

  const cgpa = totalPoints / totalCredits;

  document.getElementById("total-credits").textContent = totalCredits.toFixed(2);
  document.getElementById("cgpa-value").textContent = cgpa.toFixed(2);

  let className = "";
  if (cgpa >= 3.67) className = "First Class";
  else if (cgpa >= 3.0) className = "Second Upper";
  else if (cgpa >= 2.0) className = "Pass";
  else className = "Fail";

  document.getElementById("class-value").textContent = className;
  document.getElementById("result").hidden = false;
});

// CLEAR
document.getElementById("clear").addEventListener("click", () => {
  tbody.innerHTML = `
    <tr>
      <td><input type="text" placeholder="Mathematics"></td>
      <td><input type="number" value="3" min="0.5" step="0.5"></td>
      <td>
        <select>
          <option value="4.0">A (4.00)</option>
          <option value="3.67">A- (3.67)</option>
          <option value="3.33">B+ (3.33)</option>
          <option value="3.0">B (3.00)</option>
          <option value="2.67">B- (2.67)</option>
          <option value="2.33">C+ (2.33)</option>
          <option value="2.0">C (2.00)</option>
          <option value="1.67">D+ (1.67)</option>
          <option value="1.0">D (1.00)</option>
          <option value="0.0">F (0.00)</option>
        </select>
      </td>
      <td><button class="btn small remove-row">Remove</button></td>
    </tr>
  `;
});

// ===========================
// THEME TOGGLE (Light/Dark Mode)
// ===========================
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
