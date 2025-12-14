import { createContext,useState } from "react"

export const GlobalContext = createContext(null);


export default function GlobalState({children}){
    
    const [formData, setFormData ] = useState({
    type:'income',
    amount:0,
    description:0,
    });
    const [value, setValue ] = useState('Expense');
    const [totalIncome, setTotalIncome ] = useState(0);
    const [totalExpense, setTotalexpense ] = useState(0);
    const [allTransaction, setAlltransaction ] = useState([]);

    function handleFormSubmit(currentFormData){
        // Make a copy of currentFormData and ensure the amount property is a number type
            const newTransaction = {
                ...currentFormData,
                amount: Number(currentFormData.amount), // <-- FIX IS HERE
                id: Date.now()
            };
            

        setAlltransaction([...allTransaction, newTransaction])

    }

    console.log(allTransaction);

    return <GlobalContext.Provider

        value={{formData, setFormData,
            value, setValue,
            totalIncome, setTotalIncome,
            totalExpense, setTotalexpense,
            allTransaction, setAlltransaction, handleFormSubmit
        }}
    >

            {children}
    </GlobalContext.Provider>

}