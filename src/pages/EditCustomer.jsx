import { useLoaderData, Form, useNavigate, useActionData, redirect } from 'react-router-dom';

import Error from '../components/Error';
import FormComponent from '../components/Form';

import { getCustomer, updateCustomer } from '../data/customers';


export async function loader({params}){
    const customer = await getCustomer(params.customerId);
    if(Object.values(customer).length === 0){
        throw new Error('Customer not found', {
            status: 404
        });
    }
    return customer;
}

export async function action({request, params}){
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
    // Update customer to database
    await updateCustomer(params.customerId, data);
    return redirect('/');
}

const EditCustomer = () => {
    const navigate = useNavigate();
    const customer = useLoaderData();
    const errors = useActionData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
            <p className="mt-3">You can modify the customer info below</p>

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
                    <FormComponent
                        customer={customer}
                    />
                    <input 
                        type="submit"
                        className='mt-5 w-full bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold p-3'
                        value='Save Changes'
                    />
                </Form>
            </div>
        </>
    )
}

export default EditCustomer
