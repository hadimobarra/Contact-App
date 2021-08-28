import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const AddContact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const contact = useSelector(state => state);
    //console.log(contact);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contact.find( contact => contact.email === email && email );
        const checkNumber = contact.find( contact => contact.number === parseInt(number) && number );

        if( !name || !email || !number) {
            return toast.warning('fill in all fields');
        }

        if(checkEmail) {
            return toast.error('this email already exists!');
        }

        if(checkNumber) {
            return toast.error('this number already exist!');
        }

        const data = {
            id: contact[contact.length - 1].id + 1,
            name, 
            email,
            number
        }

        dispatch({type: 'ADD_CONTACT', payload: data})
        toast.success('student added successfully!');
        history.push('/');
    };

    return (
        <div className="container">
            <h1 className="display-3 text-center my-5">
                 Add Student
            </h1>
            <div className="row">
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" className="form-control mb-2"
                             value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" className="form-control mb-2" 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Number" className="form-control mb-2" 
                            value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add student" className="btn btn-block btn-dark" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact;
