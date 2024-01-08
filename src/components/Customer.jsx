import { useNavigate, Form, redirect } from 'react-router-dom';

import { deleteCustomer } from '../data/customers';

export async function action({params}) {
    await deleteCustomer(params.customerId);
    return redirect('/');
}

const Customer = ({customer}) => {
    const navigate = useNavigate();

    return (
        <tr className="border-b">
            <td className='p-6'>
                <p className="text-2xl text-gray-800">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.company}</p>
            </td>
            <td className='p-6'>
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{customer.email}</p>
                <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Phone: </span>{customer.phone}</p>
            </td>
            <td className="p-6 flex gap-3">
                <button 
                    type="button"
                    className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                    onClick={() => navigate(`/customers/${customer.id}/edit`)}
                >Edit</button>
                <Form
                    method='post'
                    action={`/customers/${customer.id}/remove`}
                    onSubmit={(e) => {
                        if(!window.confirm('Are you sure?')){
                            e.preventDefault();
                        }
                    }}
                >
                    <button 
                        type="submit"
                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                    >Remove</button>
                </Form>
            </td>            
        </tr>
    )
}

export default Customer
