// this js is of project list view table
document.addEventListener('DOMContentLoaded', function() {
    // Sample data (replace with your actual data fetching logic)
    const sampleData = [
        { type: 'EWS Flats (300-350 Sq.ft.) ENCLAVE', area: '300-350 Sq.ft.', quantity: 7, booked: 0, notBooked: 7, start: '1', end: '7' },
        { type: 'Flats 3 BHK (800-900 Sq.ft.) 1st Floor ENCLAVE', area: '800-900 Sq.ft.', quantity: 14, booked: 10, notBooked: 4, start: '101', end: '114' },
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

function goback(){
    window.location.href = " {{ url_for('project_list') }}";
}