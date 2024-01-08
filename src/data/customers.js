export async function getCustomers(){
    const response = await fetch(import.meta.env.VITE_API_URL);
    const data = await response.json();
    return data;
}

export async function addCustomer(customer){
    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getCustomer(id){
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const data = await response.json();
    return data;
}

export async function updateCustomer(id, customer){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(customer),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCustomer(id){
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}