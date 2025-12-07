// === CGPA CALCULATOR ===
document.addEventListener('DOMContentLoaded', function () {
  const addRowBtn = document.getElementById('add-row');
  const subjectsBody = document.getElementById('subjects-body');
  const calculateBtn = document.getElementById('calculate');
  const clearBtn = document.getElementById('clear');
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  // Add/remove row
  subjectsBody.addEventListener('click', function (e) {
    if (e.target.matches('.remove-row')) {
      if (subjectsBody.querySelectorAll('tr').length > 1) {
        e.target.closest('tr').remove();
      } else showError("You must have at least one subject.");
    }
  });

  addRowBtn.addEventListener('click', createRow);
  if(subjectsBody.children.length===0) createRow();

  calculateBtn.addEventListener('click', ()=>{
    clearMessages();
    let totalCredits = 0;
    let totalPoints = 0;
    let valid = true;

    subjectsBody.querySelectorAll('tr').forEach((tr, idx)=>{
      const credit = parseFloat(tr.querySelector('input[name="credits"]').value);
      const grade = parseFloat(tr.querySelector('select[name="grade"]').value);

      if(isNaN(credit) || credit<=0){
        showError(`Row ${idx+1}: Credits must be >0`);
        valid=false;
      } else {
        totalCredits += credit;
        totalPoints += credit * grade;
      }
    });

    if(!valid || totalCredits===0) return;

    const cgpa = totalPoints/totalCredits;
    displayResult(totalCredits, cgpa);
  });

  clearBtn.addEventListener('click', ()=>{
    subjectsBody.innerHTML = '';
    createRow();
    clearMessages();
    resultDiv.hidden = true;
  });

  function createRow(){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" name="subjName" placeholder="Subject" /></td>
      <td><input type="number" name="credits" min="0.5" step="0.5" value="3" required /></td>
      <td>
        <select name="grade">
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
      <td><button class="btn small remove-row" type="button">Remove</button></td>
    `;
    tr.style.opacity = 0;
    subjectsBody.appendChild(tr);
    setTimeout(()=> tr.style.opacity=1, 10);
  }

  function displayResult(totalCredits, cgpa){
    document.getElementById('total-credits').textContent = totalCredits.toFixed(1);
    document.getElementById('cgpa-value').textContent = cgpa.toFixed(2);

    const classificationSpan = document.getElementById('classification');
    const classificationData = classifyCGPA(cgpa);
    classificationSpan.textContent = classificationData.text;
    classificationSpan.style.color = classificationData.color;

    resultDiv.hidden = false;
  }

  function classifyCGPA(g){
    if(g>=3.67) return {text:'First Class / Excellent', color:'#4dff88'};
    if(g>=3.0) return {text:'Second Class (Upper) / Good', color:'#f3ff4d'};
    if(g>=2.0) return {text:'Second Class (Lower) / Pass', color:'#ffae42'};
    if(g>0) return {text:'Near Pass / Needs Improvement', color:'#ff4d4d'};
    return {text:'Fail', color:'#ff1a1a'};
  }

  function showError(msg){
    errorDiv.textContent = msg;
    errorDiv.hidden=false;
    errorDiv.style.background='#361c1c';
    errorDiv.style.color='#ff9a9a';
    errorDiv.style.borderLeft='4px solid #ff4b4b';
  }

  function clearMessages(){
    errorDiv.textContent='';
    errorDiv.hidden=true;
  }
});
