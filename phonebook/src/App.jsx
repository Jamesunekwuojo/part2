import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/person";


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
const Person = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      <div>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </li>
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

// notification

const Notification = ({message}) => {

  if(message === null){
    return null

  } else if(message ===`Added ${newName}` ) {
    return(
      
    )

  }

  return(
    <div className="error">
      {message}

    </div>
  )

}

// main app component
const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // to hold or store the current value of the items being searched
  const [errorMessage, setErrorMessage]=useState('some errror happened..')

  const [persons, setPersons] = useState([


  ]);

 


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

  // handle update function
  const handleupdatedPerson = (id, updatedPerson) => {

    personService
    .updatePerson(id, updatedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => (person.id !== id? person: returnedPerson)))

      setNewName('');
      setNewNumber('');
    })
    .catch(error=> {
      alert(`Errror updating  ${updatedPerson.name} ${updatedPerson.number}`)
      console.log(error)
    })
  }


  const handleAddperson = (e) => {
    e.preventDefault();

    const personExists = persons.find(person => person.name ===newName);

    if(personExists){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...personExists, number:newNumber} 

        handleupdatedPerson(personExists.id, updatedPerson);
      }
       
    } else {

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
      
    }

   
  };

  // useffect hook for fetching data fro server

  useEffect(() => {
    personService.getPersons().then((initalPersons) => {
      console.log(initalPersons);
      setPersons(initalPersons);
    });
  }, []);

  const handleDelete = (id) => {
    const person = persons.find(p => p.id ===id)
    // const changedPersons = {...person,}
    // setPersons(persons.filter((person) => person.id !== idToDelete));
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !==id));
      })
      .catch((error) => {

        setPersons(persons.filter((p) => p.id !== id));

      })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Notification */}
      <Notification message={errorMessage}/>

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
      <Person filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
