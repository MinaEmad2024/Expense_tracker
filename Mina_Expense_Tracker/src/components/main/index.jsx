import { Button, Dialog, Flex, Heading, Field, HStack, 
       Portal, Input, CloseButton, RadioGroup,
       Fieldset} from "@chakra-ui/react";
import ExpenseView from "../expense-view";
import Summary from "../summary";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";

const items = [
  { label: "income", value: "income" },
  { label: "expense", value: "expense" },
]

export default function Main(){
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const { value, setValue, formData, setFormData, handleFormSubmit ,
                    totalIncome, setTotalIncome,
            totalExpense, setTotalexpense,
            allTransaction
    } = useContext(GlobalContext);

    useEffect(() => {
        let expense = 0;
        let income = 0;

        allTransaction.forEach(item => {
            // Validate and convert the amount first
            const amount = parseFloat(item.amount);

            // Check if 'amount' is a real number (not NaN)
            if (!isNaN(amount)) {
                if (item.type === 'expense') {
                    expense += amount;
                } else {
                    income += amount;
                }
            } else {
                // Optional: Log the problematic item to find the source data issue
                console.error("Invalid amount found for item:", item);
            }
        });            console.log('Calculated Expense:', expense); // <-- Add this
            console.log('Calculated Income:', income);   // <-- Add this
            setTotalexpense(expense);
            setTotalIncome(income);

    }
     , [allTransaction])

    // // Use a separate useEffect to log the values AFTER they update
    // useEffect(() => {
    //     // This runs AFTER the component re-renders with the calculated totals
    //     console.log("Updated Totals:", totalExpense, totalIncome);
    // }, [totalExpense, totalIncome]); // Dependency array here watches the totals

    function handleFormChange(event){
        setFormData(
            {
                ...formData,
                [event.target.name] : event.target.value
            }
        )
    };

    function handleSubmit(event){
        event.preventDefault();
        // console.log("Form Submitted, attempting to close modal."); // Debugging line
                // FIX: Combine the input formData with the separate radio 'value' just before submission
        const finalData = {
            ...formData,
            type: value // Add a 'type' field with the current radio value
        };

        handleFormSubmit(finalData);
        setIsModalOpen('false');
    }


    return(
        <Flex textAlign={'center'} flexDirection={'column'} pr={'5'} pl={'5'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} mt={'12'}>
                <Heading color={'blue.400'} display={['none' ,'block', 'block', 'block', 'block']}>
                    Expense Tracker 
                </Heading>
                <Flex alignItems={'center'}>
                    <Dialog.Root open={isModalOpen} onOpenChange={(e) => setIsModalOpen(e.open)}>
                    <Dialog.Trigger asChild>
                    <Button
                    bg={'blue.300'}
                    color={'black'}
                    ml={'4'}
                    onClick={() => setIsModalOpen(true)}                    >
                        Add New Transaction
                    </Button>
                    </ Dialog.Trigger>
            {/* <form onSubmit={handleSubmit} id="transaction-form"> */}
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header> Add New Transaction </Dialog.Header>
                        <form onSubmit={handleSubmit} id="transaction-form">
                        <Dialog.Body>
                            <Fieldset.Root>
                                <Fieldset.Legend>
                                    Transaction Details
                                </Fieldset.Legend>
                                <Fieldset.HelperText>Add a new transaction details here </Fieldset.HelperText>
                            </Fieldset.Root>

                            <Fieldset.Root >
                                <Field.Root>
                                    <Field.Label>
                                        Enter Description 
                                    </Field.Label>
                                    <Input 
                                    placeholder='Enter transaction Description '
                                    name='description'
                                    type='text'
                                    onChange={handleFormChange}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>   
                                        Enter Amount 
                                    </Field.Label>
                                    <Input 
                                    placeholder='Enter transaction Amount '
                                    name='amount'
                                    type='number'
                                    onChange={handleFormChange}
                                    />
                                </Field.Root>
                                <RadioGroup.Root  mt={'4'} 
                                    onValueChange={(e) => setValue(e.value)}
                                >
                                    <HStack gap={4}>
                                        {items.map((item) => (
                                        <RadioGroup.Item key={item.value} value={item.value} 
                                        >
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                        ))}
                                    </HStack>
                                </RadioGroup.Root>
                            </Fieldset.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild onClick={() => setIsModalOpen(false)}>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                 <Button type="submit" form="transaction-form"  mr={'4'}>Add</Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                </form>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                    </ Dialog.Positioner>
                </Portal>

                    </ Dialog.Root>
                </Flex>
            </Flex>
                <Summary 
                totalExpense={totalExpense}
                totalIncome={totalIncome}
                />
                <Flex w={'full'} 
                alignItems={'flex-start'}
                justifyContent={'space-evenly'} 
                flexDirection={['column', "column", 'column', "row", "row"]}
                >
                    <ExpenseView data={allTransaction.filter(item => item.type === 'income')} type={'income'}/>
                    <ExpenseView data={allTransaction.filter(item => item.type === 'expense')} type={'expense'}/>
                </Flex>
        </Flex>
    )
}