const fs = require('fs');

//mengecek folder data terlebih dahulu,jika tidak ada maka akandibuatakan
const dirPath ='./data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contact.json jika  belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


//ambil semua data di contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);  //megubah string ke file JSON
    return contacts;

}

//cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
};


//saat menambah contact menimpa fil contacts.json dengan data ynag baru
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}



//menambah data baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);

}

//cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
};

//hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.nam !== nama);

  saveContacts(filteredContacts);
};

//mengubah contacts
const updateContacts = (contactbaru) => {
  const contacts = loadContact();
  //hilangkan contact nama yang sama dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactbaru.oldNama);
  delete  contactbaru.oldNama;

  filteredContacts.push(contactbaru);
  saveContacts(filteredContacts);
};

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts};