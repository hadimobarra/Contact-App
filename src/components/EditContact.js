import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const EditContact = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const {id} = useParams();
    const contact = useSelector(state => state);
    const currentContact = contact.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        if(currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }

    }, [currentContact]);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contact.find( contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contact.find( contact => contact.id !== parseInt(id) && contact.number === parseInt(number) );

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
            id: parseInt(id),
            name, 
            email,
            number
        }

        dispatch({type: 'UPDATE_CONTACT', payload: data})
        toast.success('student updated successfully!');
        history.push('/');
    };

    return (
        <div className="container">
            {
            currentContact ? (
            <>
            <h1 className="display-3 my-5 text-center">Edit student {id} </h1>
            <div className="row">
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" className="form-control mb-2" 
                            value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" className="form-control mb-2" 
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Number" className="form-control mb-2" 
                            value={number} onChange={(e) => setNumber(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Update student" className="btn btn-dark" />
                            <Link to='/' className="btn btn-danger mx-3">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
            </>
        ) :     (<h1 className="display-3 text-center my-5"> student contact with {id} id dose not exist! </h1>)
                         
        }
    </div>
    )
}

export default EditContact;
