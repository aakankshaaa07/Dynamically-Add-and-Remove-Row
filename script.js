const table = document.querySelector('table tbody');
const topicInput = document.querySelector('#topic');
const linkInput = document.querySelector('#link');

// grab the records from local storage.
const records = JSON.parse(localStorage.getItem("data") || '[]');
const rowIndex = 0;

function addRecord(topic, link) {
  const template = `
        <tr>
            <td>${topic}</td>
            <td>${link}</td>
            <td><input type="button" class="buttonDelete" value="-"></td>
        </tr>`;
  table.innerHTML += template;
}

function addFunction() {
  const rTopic = document.getElementById("topic").value;
  const rLink = document.getElementById("link").value;
  // add to the array
  records.push({
    topic: rTopic,
    link: rLink
  });
  updateLocalStorage();
  addRecord(rTopic, rLink);
};

function updateLocalStorage() {
  // save updated records array
  localStorage.setItem("data", JSON.stringify(records));
}

table.addEventListener("click", function (evt) {
  const delButton = evt.target.closest(".buttonDelete");
  if (delButton) {
     const row = delButton.closest("tr");
     const index = Array.from(row.parentNode.children).indexOf(row);
     records.splice(index, 1);
     row.remove();
     localStorage.removeItem("data", JSON.stringify(records));
  }
})

// loop over the records in localstorage.
records.forEach(function(record) {
  addRecord(record.topic, record.link);
});

/* function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  } */