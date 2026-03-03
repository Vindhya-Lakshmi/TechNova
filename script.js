document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const tableBody = document.getElementById('tableBody');

  // Load existing registrations from localStorage
  let registrations = JSON.parse(localStorage.getItem('registrations')) || [];

  // Function to render the table
  function renderTable() {
    tableBody.innerHTML = '';

    registrations.forEach(reg => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${reg.name}</td>
        <td>${reg.email}</td>
        <td>${reg.phone}</td>
        <td>${reg.event}</td>
        <td>${reg.mode}</td>
        <td>${reg.college}</td>
        <td>${reg.timestamp}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Initial render
  renderTable();

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = {
      name:    formData.get('name').trim(),
      email:   formData.get('email').trim(),
      phone:   formData.get('phone').trim(),
      event:   formData.get('event'),
      mode:    formData.get('mode'),
      college: formData.get('college').trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Basic client-side validation (beyond HTML required)
    if (!data.name || !data.email || !data.phone || !data.event || !data.mode || !data.college) {
      alert('Please fill all required fields.');
      return;
    }

    // Add to array & save
    registrations.push(data);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Re-render table
    renderTable();

    // Feedback
    alert('Registration successful! Welcome to TechNova 2025 🎉');

    // Reset form
    form.reset();
  });
});