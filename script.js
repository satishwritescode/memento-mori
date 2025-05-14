let lifeTable;

fetch('life_expectancy.json')
  .then(res => res.json())
  .then(data => lifeTable = data);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dob').addEventListener('change', calculate);
  document.getElementById('gender').addEventListener('change', calculate);
});

function calculate() {
  const dobInput = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;

  if (!dobInput || !gender) return; // empty fields

  const dob = new Date(dobInput);
  const today = new Date();
  const age = (today - dob) / (365.25 * 24 * 60 * 60 * 1000);

  if (isNaN(age) || age < 0 || age > 120) return; // sanity check

  const roundedAge = Math.floor(age);
  const row = lifeTable.find(row => row.age === roundedAge);

  if (!row) {
    alert("Age out of range.");
    return;
  }

  const expectancy = row[gender];
  const weeksLived = Math.floor(age * 52.1775);
  const totalWeeks = Math.floor((age + expectancy) * 52.1775);

  const weeksLeft = totalWeeks - weeksLived;

  document.getElementById('result').textContent =
    `${weeksLived} weeks used · ${weeksLeft} weeks left`;
  
  renderDots(weeksLived, totalWeeks);
}

function renderDots(used, total) {
    const grid = document.getElementById('calendar');
    grid.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
  
      if (i === used) {
        dot.classList.add('present');
      } else if (i < used) {
        dot.classList.add('past');
      } else {
        dot.classList.add('future');
      }
  
      grid.appendChild(dot);
    }
  }
  