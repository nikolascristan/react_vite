import { useState,useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons'


function areTheseObjectsEqual(first, second) {
  "use strict";

  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  if (first.constructor !== second.constructor) {
    return false;
  }

  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  if (first instanceof Date) return false;

  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  const firstKeys = Object.keys(first);
  const allKeysExist = Object.keys(second).every(
    (i) => firstKeys.indexOf(i) !== -1
  );

  const allKeyValuesMatch = firstKeys.every((i) =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

const Filter = (props) => {
  console.log(props)
  return(
    <div>
        filter: <input 
        value={props.newFilter}
        onChange={props.handleFilterChange}
        />
      </div>
  )
}

const PersonForm = (props) => {
  console.log(props)
  return(
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const Persons = (props) => {
console.log(props)
  return(
    props.filteredperson.map((person) =>
      <li key={person.id}>
        {person.name}, {person.number} {}
        <button onClick={()=> props.handleDelete(person.id)}>delete</button>
      </li>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [nextID,setNextID] = useState(2)

  useEffect(()=> {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons =>{
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  },[])

  const addPerson = () =>{
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: nextID
    }
    const nameExists = persons.some(element => areTheseObjectsEqual(element.name, personObject.name))
    const numberExists = persons.some(element => areTheseObjectsEqual(element.number, personObject.number))
    if(!nameExists && !numberExists){
      personServices
      .create(personObject)
        .then(returnedPerson =>{ 
        setPersons(persons.concat(returnedPerson))
        setNewFilter('')
        setNewName('')
        setNewNumber('')
        })
      setNextID(nextID + 1)
      window.alert(`Entry added: ${personObject.name}, ${personObject.number}`)
      } else {
        window.alert(`Name or phone number already exist`)
      }

    /*axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })*/
  }

  const filteredPerson = persons.filter(persons => 
    persons.name.toLowerCase().includes(newFilter.toLowerCase()) ||
    persons.number.includes(newFilter)
  )


  const handleNameChange = () => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = () => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = () => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    console.log('Deleting id ${id}')
    /*if (window.confirm("Do you want to delete?")) {
      window.open()
    }*/
    return(
      personServices
      .deleteEntry(id)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredperson={filteredPerson} handleDelete={handleDelete}/>
    </div>
  )
}

export default App