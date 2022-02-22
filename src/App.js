import { useState } from "react";
import "./App.css";
import contactsJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsJson.slice(0, 5));

  const createRandomContact = () => {
    const leftOversArr = contactsJson.filter(
      (contact) => !contacts.includes(contact)
    );
    let randomContact =
      leftOversArr[Math.floor(Math.random() * leftOversArr.length)];
    setContacts([...contacts, randomContact]);
  };

  const sortByName = () => {
    const newArr = JSON.parse(JSON.stringify(contacts));
    const sortedContacts = newArr.sort((a, b) => (a.name > b.name ? 1 : -1));
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const newArr = JSON.parse(JSON.stringify(contacts));
    const sortedContacts = newArr.sort((a, b) =>
      a.popularity > b.popularity ? -1 : 1
    );
    setContacts(sortedContacts);
  };

  const removeContact = (id) => {
    const filteredArr = contacts.filter((contact) => !contact.id.includes(id));
    setContacts(filteredArr);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>

      <div className="controls">
        <button onClick={createRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
        <button onClick={sortByName}>Sort by name</button>
      </div>

      <table className="Table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr>
              <td>
                <img
                  src={contact.pictureUrl}
                  className="picture"
                  alt={contact.name}
                ></img>
              </td>{" "}
              <td>{contact.name}</td>{" "}
              <td>{(Math.round(contact.popularity * 100) / 100).toFixed(2)}</td>
              <td>{contact.wonOscar && "🏆"} </td>
              <td>{contact.wonEmmy && "🏆"} </td>
              <td>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
