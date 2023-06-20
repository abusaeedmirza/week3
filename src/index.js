var table = document.getElementById("table");
fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
  .then((response) => response.json())
  .then((response) => {
    const munciplities = Object.values(
      response.dataset.dimension.Alue.category.label
    );
    const population = response.dataset.value;
    const tbody = document.getElementById("tbody");
    for (let i = 0; i < population.length; i++) {
      const row = document.createElement("tr");
      row.setAttribute("id", "row" + i);
      const mun = document.createElement("td");
      const pop = document.createElement("td");

      mun.textContent = munciplities[i];
      pop.textContent = population[i];

      row.appendChild(mun);
      row.appendChild(pop);

      tbody.appendChild(row);
      table.appendChild(tbody);
    }
  });
fetch("https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065")
  .then((response) => response.json())
  .then((response) => {
    const employment = response.dataset.value;
    //console.log(employment);
    const tbody = document.getElementById("tbody");
    for (let i = 0; i < employment.length; i++) {
      const r = document.getElementById("row" + i);
      const emp = document.createElement("td");
      emp.textContent = employment[i];
      r.appendChild(emp);
      tbody.appendChild(r);
      //table.appendChild(tbody);
    }
    for (let x = 0; x < employment.length; x++) {
      const emp_percent_row = document.getElementById("row" + x);
      const cell_pop = emp_percent_row.getElementsByTagName("td")[1];
      const totalemp = emp_percent_row.getElementsByTagName("td")[2];
      const emp_percent_cell = document.createElement("td");
      const population_of_cell = cell_pop.textContent;
      const total_employment = totalemp.textContent;
      const percentage = (total_employment / population_of_cell) * 100;
      const rounded = parseFloat(percentage.toFixed(2));
      if (rounded > 45) {
        emp_percent_row.classList.add("higher_rate");
      }
      if (rounded < 25) {
        emp_percent_row.classList.add("lower_rate");
      }
      emp_percent_cell.textContent = rounded + "%";
      //console.log(emp_percent_cell.textContent);
      emp_percent_row.appendChild(emp_percent_cell);
    }
  });
