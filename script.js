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

// edit lead gen form
        const link = document.getElementById('edit_lead_gen');
        const link1 = document.getElementById('edit_lead_gen1');
        const popupCard = document.getElementById('popupCard');
        const popupOverlay = document.getElementById('popupOverlay');
        const closeButton = document.getElementById('closeButton');
        const content = document.querySelector('.content');
        const form = document.getElementById('selectForm');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const successMessage = document.getElementById('successMessage');
        const headingblur= document.getElementById('v0_row0');

        function openPopup() {
          
            content.classList.add('blur');
            popupOverlay.classList.add('show');
            popupCard.classList.add('show');
            headingblur.classList.add('blur');
        }

        function closePopup() {
            content.classList.remove('blur');
            popupOverlay.classList.remove('show');
            popupCard.classList.remove('show');
            headingblur.classList.remove('blur');
            form.reset();
            successMessage.style.display = 'none';
        }

        function validateForm() {
            let isValid = true;
            const requiredFields = ['name', 'occupation', 'type', 'contact', 'whatsapp', 'budget', 'requirement', 'projects', 'status'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input.value.trim() === '') {
                    input.style.borderBottomColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderBottomColor = '';
                }
            });

            return isValid;
        }

        link.addEventListener('click', openPopup);
        link1.addEventListener('click', openPopup);
        closeButton.addEventListener('click', closePopup);
        popupOverlay.addEventListener('click', closePopup);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm()) {
                loadingIndicator.style.display = 'block';
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                    successMessage.style.display = 'block';
                    setTimeout(closePopup, 2000);
                }, 1500);
            }
        });

// this js is of project list view table
document.addEventListener('DOMContentLoaded', function() {
  // Sample data (replace with your actual data fetching logic)
  const sampleData = [
      { type: 'Residential', area: '1000 sqft', quantity: 50, booked: 30, notBooked: 20, start: '2024-01-01', end: '2024-12-31' },
      { type: 'Commercial', area: '5000 sqft', quantity: 10, booked: 5, notBooked: 5, start: '2024-03-15', end: '2025-03-14' },
  ];

  const table = document.getElementById('ppProjectTable');
  const tbody = table.querySelector('tbody');
  const searchInput = document.getElementById('ppSearchInput');
  const entriesSelect = document.getElementById('ppEntriesSelect');
  const prevBtn = document.getElementById('ppPrevBtn');
  const nextBtn = document.getElementById('ppNextBtn');

  let currentPage = 1;
  let entriesPerPage = 10;

  function renderTable(data) {
      tbody.innerHTML = '';
      data.forEach(item => {
          const row = document.createElement('tr');
          row.className = 'pp-row';
          row.innerHTML = `
              <td class="pp-data">${item.type}</td>
              <td class="pp-data">${item.area}</td>
              <td class="pp-data">${item.quantity}</td>
              <td class="pp-data">${item.booked}</td>
              <td class="pp-data">${item.notBooked}</td>
              <td class="pp-data">${item.start}</td>
              <td class="pp-data">${item.end}</td>
              <td class="pp-data"><button class="pp-view-btn">View</button></td>
          `;
          tbody.appendChild(row);
      });
  }

  function filterData() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = sampleData.filter(item => 
          Object.values(item).some(value => 
              value.toString().toLowerCase().includes(searchTerm)
          )
      );
      return filteredData;
  }

  function updateTable() {
      const filteredData = filterData();
      const startIndex = (currentPage - 1) * entriesPerPage;
      const endIndex = startIndex + entriesPerPage;
      const pageData = filteredData.slice(startIndex, endIndex);
      renderTable(pageData);
  }

  searchInput.addEventListener('input', () => {
      currentPage = 1;
      updateTable();
  });

  entriesSelect.addEventListener('change', () => {
      entriesPerPage = parseInt(entriesSelect.value);
      currentPage = 1;
      updateTable();
  });

  prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          updateTable();
      }
  });

  nextBtn.addEventListener('click', () => {
      const filteredData = filterData();
      if (currentPage < Math.ceil(filteredData.length / entriesPerPage)) {
          currentPage++;
          updateTable();
      }
  });

  // Initial render
  updateTable();
});


