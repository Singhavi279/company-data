document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');
  const loadingDiv = document.getElementById('loading');

  searchButton.addEventListener('click', function() {
    const searchValue = searchInput.value.trim();
    if (searchValue !== '') {
      loadingDiv.classList.add('loading');
      fetchData(searchValue);
    }
  });

  function fetchData(searchValue) {
    const apiUrl = `https://api.sandbox.co.in/mca/companies/${encodeURIComponent(searchValue)}`;

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKemFXNW5hR0YyYm1semFESXdNakpBWjIxaGFXd3VZMjl0SWl3aVlYQnBYMnRsZVNJNkltdGxlVjlzYVhabFh6VnBkMWd6YkdzMFVGWlJNMWc0ZEd4TlEydG5XVmhYY1RWc1QzbFpZelIxSWl3aWFYTnpJam9pWVhCcExuTmhibVJpYjNndVkyOHVhVzRpTENKbGVIQWlPakUzTVRZMU16azRNakVzSW1sdWRHVnVkQ0k2SWxKRlJsSkZVMGhmVkU5TFJVNGlMQ0pwWVhRaU9qRTJPRFE1TVRjME1qRjkuci1MSWJTMEJnakQ3emJBMjB5WmYzNmNjVXZKdTBNMnJMaE5LNWVQWUdrY015SHp0UEVQQVBoamQ5djVqaTItOFl4NHV4dUhaMjhIWUtCUEFIQmpTSEEiLCJzdWIiOiJzaW5naGF2bmlzaDIwMjJAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlXzVpd1gzbGs0UFZRM1g4dGxNQ2tnWVhXcTVsT3lZYzR1IiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE2ODUwMDM4MjEsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTY4NDkxNzQyMX0.MfSs0s2_Dyzw663iX5eIUPrO13AANPymu_7dKtWuVDtSaBQmBQIMJV9c-2T6UKB_p1tCrsa740XrcrX_sEHeRA',
        'x-api-version': '2.0'
      }
    })
      .then(response => response.json())
      .then(data => {
        displayData(data);
        loadingDiv.classList.remove('loading');
      })
      .catch(error => {
        console.error('Error:', error);
        loadingDiv.classList.remove('loading');
      });
  }

  function displayData(data) {
    resultDiv.innerHTML = '';

    if (data && data.data && data.data.company_master_data) {
      const companyData = data.data.company_master_data;

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      const tableHeaders = Object.keys(companyData);

      // Create table header
      const headerRow = document.createElement('tr');
      tableHeaders.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Create table row for company data
      const companyRow = document.createElement('tr');
      tableHeaders.forEach(headerText => {
        const td = document.createElement('td');
        td.textContent = companyData[headerText];
        companyRow.appendChild(td);
      });
      tbody.appendChild(companyRow);

      table.appendChild(thead);
      table.appendChild(tbody);
      resultDiv.appendChild(table);
    }
  }
});
