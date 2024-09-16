const tabs = document.querySelectorAll('.navtab');
const contents = document.querySelectorAll('.content');
const underline = document.querySelector('.underline');

function updateUnderline() {
  const activeTab = document.querySelector('.navtab.active');
  underline.style.width = `${activeTab.offsetWidth}px`;
  underline.style.left = `${activeTab.offsetLeft}px`;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-target');
    contents.forEach(content => {
      if (content.id === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
    updateUnderline();
  });
});

// table
document.addEventListener("DOMContentLoaded", () => {
  function populateTable() {
      const users = [
          {
              name: 'John Doe',
              contact: '+1234567890',
              whatsapp: '+1234567890',
              budget: '40,00,000 - 45,00,000',
              project: 'Project A',
              status: 'Active',
              remark: 'Booked Flat No. 507',
              fol_date: '2024-09-12',
              int: true,
              vd: true,
              ds: true
          },
          {
              name: 'Jane Smith',
              contact: '+9876543210',
              whatsapp: '+9876543210',
              budget: '50,00,000 - 55,00,000',
              project: 'Project B',
              status: 'Pending',
              remark: 'In Progress',
              fol_date: '2024-10-15',
              int: false,
              vd: true,
              ds: false
          },
          {
              name: 'Jane Smith',
              contact: '+9876543210',
              whatsapp: '+9876543210',
              budget: '50,00,000 - 55,00,000',
              project: 'Project B',
              status: 'Pending',
              remark: 'In Progress',
              fol_date: '2024-10-15',
              int: false,
              vd: true,
              ds: false
          }
      ];

      const tableBody = document.querySelector("#userTable tbody");

      users.forEach(user => {
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.innerHTML = `${user.name}<br>Private Sector<br>Walk-in`;
          row.appendChild(nameCell);

          const contactCell = document.createElement("td");
          contactCell.innerHTML = `Contact: ${user.contact}<br>WhatsApp: ${user.whatsapp}`;
          row.appendChild(contactCell);

          const budgetCell = document.createElement("td");
          budgetCell.innerHTML = `${user.budget}<br>3 BHK Flat`;
          row.appendChild(budgetCell);

          const projectCell = document.createElement("td");
          projectCell.innerHTML = `${user.project}<br><button class="btn-call-recordings">Call Recordings</button>`;
          row.appendChild(projectCell);

          const statusCell = document.createElement("td");
          statusCell.innerHTML = `<button class="btn-status">View Status</button>`;
          row.appendChild(statusCell);

          const remarkCell = document.createElement("td");
          remarkCell.innerHTML = `${user.remark}<br><button class="btn-view-remarks">View Remarks</button>`;
          row.appendChild(remarkCell);

          const folDateCell = document.createElement("td");
          folDateCell.textContent = user.fol_date;
          row.appendChild(folDateCell);

          const intCell = document.createElement("td");
          intCell.innerHTML = user.int ? '✔' : '✘';
          row.appendChild(intCell);

          const vdCell = document.createElement("td");
          vdCell.innerHTML = user.vd ? '✔' : '✘';
          row.appendChild(vdCell);

          const dsCell = document.createElement("td");
          dsCell.innerHTML = user.ds ? '✔' : '✘';
          row.appendChild(dsCell);

          const actionCell = document.createElement("td");
          actionCell.innerHTML = `
              <div class="btn-action-options">
                  <button class="btn-action">OPT</button>
                  <div class="btn-action-options-content">
                      <a href="#">Add Remark</a>
                      <a href="#">Edit Customer</a>
                      <a href="#">Delete Customer</a>
                  </div>
              </div>`;
          row.appendChild(actionCell);

          tableBody.appendChild(row);
      });

      attachDropdownEventListeners();
  }

  function attachDropdownEventListeners() {
      const actionButtons = document.querySelectorAll('.btn-action');
      const dropdowns = document.querySelectorAll('.btn-action-options');

      actionButtons.forEach((button, index) => {
          button.addEventListener('click', (event) => {
              event.stopPropagation();
              const dropdown = dropdowns[index];

              
              closeAllDropdowns();

              dropdown.classList.toggle('active');

              if (dropdown.classList.contains('active')) {
                  adjustDropdownPosition(dropdown);
              }
          });
      });

      document.addEventListener('click', () => {
          closeAllDropdowns();
      });

      dropdowns.forEach(dropdown => {
          const dropdownMenu = dropdown.querySelector('.btn-action-options-content');
          dropdownMenu.addEventListener('click', (event) => {
              event.stopPropagation();
          });
      });
  }

  function closeAllDropdowns() {
      const dropdowns = document.querySelectorAll('.btn-action-options');
      dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
      });
  }

  function adjustDropdownPosition(dropdown) {
      const dropdownContent = dropdown.querySelector('.btn-action-options-content');
      dropdownContent.style.transform = 'translateX(0)'; 

      const rect = dropdownContent.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
          dropdownContent.style.transform = `translateX(-${rect.right - window.innerWidth + 20}px)`;
      }

     
      if (rect.left < 0) {
          dropdownContent.style.transform = `translateX(${Math.abs(rect.left) + 20}px)`;
      }
  }

  populateTable();
});

// function for when card is clicked of create project page
var cards = document.querySelectorAll('.v0-project-card-2023');

cards.forEach(function(card) {
  card.addEventListener('click', function() {
    cards.forEach(function(otherCard) {
      otherCard.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// for sidebar
const labelCheck = document.getElementById('label-check');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        function toggleSidebar() {
            sidebar.classList.toggle('open');
            if (sidebar.classList.contains('open')) {
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        }

        labelCheck.addEventListener('change', toggleSidebar);
        overlay.addEventListener('click', () => {
            labelCheck.checked = false;
            toggleSidebar();
        });

// try
// Get the select elements
var projectField = document.getElementById("project_field");
var requirementField = document.getElementById("requirement_field");

// Function to update the selected options text
function updateSelectedOptions(selectElement, selectedOptionsElement) {
  var selectedOptions = [];
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].selected) {
      selectedOptions.push(selectElement.options[i].text);
    }
  }
  selectedOptionsElement.textContent = selectedOptions.join(", ");
}

// Add event listeners to the select elements
projectField.addEventListener("change", function() {
  var selectedOptionsElement = this.nextElementSibling;
  updateSelectedOptions(projectField, selectedOptionsElement);
});

requirementField.addEventListener("change", function() {
  var selectedOptionsElement = this.nextElementSibling;
  updateSelectedOptions(requirementField, selectedOptionsElement);
});

// Initialize the selected options text
updateSelectedOptions(projectField, projectField.nextElementSibling);
updateSelectedOptions(requirementField, requirementField.nextElementSibling);
