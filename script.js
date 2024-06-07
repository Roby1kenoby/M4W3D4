let fetchUrl = 'https://jsonplaceholder.typicode.com/users'
let tableBody = document.getElementsByTagName('tbody')[0]
let searchInput = document.getElementsByTagName('input')[0]
let users = []

// funzione per fare il fetch dei dati
let fetchContacts = async function(){
    const resp = await fetch(fetchUrl)
    users = await resp.json()
    console.log(users)
    return users
}

// funzione per creare una riga della tabella
let createRow = function(data){
    let row = document.createElement('tr')
    row.innerHTML = `
    <th scope="row">${data.id}</th>
    <td>${data.name}</td>
    <td>${data.username}</td>
    <td>${data.email}</td>
    `
    return row
}

// funzione per creare la tabella
let createTable = function(contacsArray){
    contacsArray.forEach(c => {
        tableBody.appendChild(createRow(c))
    })
}

// funzione per filtrare l'elenco dei contatti
let filterContacts = function(){
    let textInputSelector = document.getElementsByTagName('input')[0]
    let filterType = document.getElementById('filterInput').value
    let textInput = textInputSelector.value
    let usersFiltered = filterArray(users, filterType, textInput)
    clearTable()
    createTable(usersFiltered)
}

// funzione per filtrare l'array di contatti con i valori che corrispondono al filtro
let filterArray = function(arr, filter, value){
    // pulisco l'array in cui mettero i valori filtrati, prima di cominciare
    let tempUsersFiltered = []
    arr.forEach(c => {
        // metto tutto in lowercase per evitare problemi con lettere maiuscole
        c[filter.toLowerCase()].toLowerCase().includes(value.toLowerCase()) 
            ? tempUsersFiltered.push(c) 
            : null
    })
    return tempUsersFiltered
}

// funzione per pulire la tabella
let clearTable = function(){
    tableBody.innerHTML = ''
}

// event listener per l'input
searchInput.addEventListener('input',function() {
    filterContacts(searchInput.value)
})

// funzione reset search
let resetSearch = function(){
searchInput.value = ''
filterContacts(searchInput.value)
}


// fastload
onload = async (e) => {
    let contacts = await fetchContacts()
    createTable(contacts)
    
}


