import React from 'react';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {
    console.log(process.env.REACT_APP_SECRET_KEY)    
    return (
        <div>            
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home;