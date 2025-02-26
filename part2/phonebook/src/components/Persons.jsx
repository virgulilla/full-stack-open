const Persons = ({personsToShow, handleDeleteClick}) => {
    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.name}>{person.name} {person.phone} 
                    <button id={person.id} name={person.name} onClick={() => handleDeleteClick(person.id, person.name)}>delete</button>
                </p>
            )}
        </div>
    )
}

export default Persons