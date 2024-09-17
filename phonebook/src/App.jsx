import { useState } from "react";

// Filter component for search input
const Filter = ({ searchTerm, handleFilter }) => {
  return (
    <>
      <div>
        filter shown with{" "}
        <input type="text" value={searchTerm} onChange={handleFilter} />
      </div>
    </>
  );
};

// Component to render all filtered persons
const Person = ({ filteredPersons }) => {
  return (
    <>
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </>
  );
};

// Form component for adding a new person
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleAddperson,
}) => {
  return (
    <>
      <form onSubmit={handleAddperson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};


// main app component
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // to hold or store the current value of the items being searched

  // Handle name input change
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Handle number input change
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // Handle search filter change
  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter persons based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddperson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, // to Ensure each person gets a unique id
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName(""); // to  Reset name input field
      setNewNumber(""); // to Reset number input field
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Search field */}
      <Filter searchTerm={searchTerm} handleFilter={handleFilter} />

      <h2>add a new</h2>

      {/* Form to add a new person */}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddperson={handleAddperson}
      />

      <h2>Numbers</h2>

      {/* Render filtered persons */}
      <Person filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
