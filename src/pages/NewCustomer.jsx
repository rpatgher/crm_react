import { useNavigate, Form, useActionData, redirect } from 'react-router-dom';

import FormComponent from '../components/Form';
import Error from '../components/Error';

import { addCustomer } from '../data/customers';

export async function action({request}){
    const formData = await request.formData();
    const email = formData.get('email');
    const data = Object.fromEntries(formData);
    
    const errors = [];
    if(Object.values(data).includes('')){
        errors.push('All fields are required');
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errors.push('Invalid Email');
    }

    // Return error if there are any
    if(errors.length > 0){
        return errors;
    }
    // Add customer to database
    await addCustomer(data);
    return redirect('/');
}

const NewCustomer = () => {
    const errors = useActionData();
    const navigate = useNavigate();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">New Customer</h1>
            <p className="mt-3">Fill all fields to register a new customer</p>

            <div className="flex justify-end">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                >Go Back</button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                {errors?.length && errors.map((error, index) => <Error key={index}>{error}</Error>)}
                <Form
                    method='post'
                    noValidate
                >
                    <FormComponent />
                    <input 
                        type="submit"
                        className='mt-5 w-full bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold p-3'
                        value='Register Customer'
                    />
                </Form>
            </div>
        </>
    )
}

export default NewCustomer
