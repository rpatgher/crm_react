import { useLoaderData } from 'react-router-dom'

import { getCustomers } from '../data/customers'

// ************* Components *************
import Customer from '../components/Customer'

export function loader(){
    const customers = getCustomers();
    return customers;
}

const Index = () => {
    const customers = useLoaderData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Customers</h1>
            <p className="mt-3">Manage your Customers</p>

            {customers.length ? (
                <table className="table-auto shadow mt-5 w-full">
                    <thead className='bg-blue-800 text-white'>
                        <tr>
                            <th className='p-2'>Customer</th>
                            <th className='p-2'>Contact</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <Customer
                                key={customer.id}
                                customer={customer}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">No customers yet</p>
            )}
        </>
    )
}

export default Index

