const plPopupOverlay = document.getElementById('plPopupOverlay');
const plPopupCard = document.getElementById('plPopupCard');
const plCloseButton = document.getElementById('plCloseButton');
const plStatusForm = document.getElementById('plStatusForm');
const plProjectListPage = document.getElementById('plProjectListPage');

// function plViewProject(button) {
//     window.open("project_view.html", "_self");

function plViewProject(button) {
    window.location.href = "{{ url_for('project_view')}}";
}

function plGoBack() {
    document.getElementById('plProjectViewPage').classList.add('pl-hidden');
    document.getElementById('plProjectListPage').classList.remove('pl-hidden');
}

function plOpenStatusForm(button) {
    const row = button.closest('tr');
    plProjectListPage.classList.add('pl-blur');
    plPopupOverlay.classList.add('pl-show');
    plPopupCard.classList.add('pl-show');
    plStatusForm.dataset.row = row.rowIndex;
}

function plClosePopup() {
    plProjectListPage.classList.remove('pl-blur');
    plPopupOverlay.classList.remove('pl-show');
    plPopupCard.classList.remove('pl-show');
    plStatusForm.reset();
}

plCloseButton.addEventListener('click', plClosePopup);
plPopupOverlay.addEventListener('click', (e) => {
    if (e.target === plPopupOverlay) plClosePopup();
});

plStatusForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rowIndex = plStatusForm.dataset.row;
    const name = document.getElementById('plName').value;
    const surname = document.getElementById('plSurname').value;
    const newStatus = document.getElementById('plNewStatus').value;
    
    // Update the status in the table
    const table = document.getElementById('plProjectTable');
    const row = table.rows[rowIndex];
    const statusCell = row.cells[4];
    statusCell.textContent = newStatus;

    // Here you would typically send this data to a server
    console.log(`Status updated for row ${rowIndex}: ${name} ${surname} set status to ${newStatus}`);

    plClosePopup();
});

function plDeleteProject(button) {
    const row = button.closest('tr');
    // Add logic to delete project
    console.log(`Delete project: row ${row.rowIndex}`);
    // For now, let's just remove the row from the table
    row.remove();
}

// Add functionality for search and entries select
document.getElementById('plSearchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#plProjectTable tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('plEntriesSelect').addEventListener('change', function(e) {
    const entriesCount = parseInt(e.target.value);
    const rows = document.querySelectorAll('#plProjectTable tbody tr');
    rows.forEach((row, index) => {
        row.style.display = index < entriesCount ? '' : 'none';
    });
});

