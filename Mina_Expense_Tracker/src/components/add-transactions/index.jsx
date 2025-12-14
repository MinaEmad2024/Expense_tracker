import {
       CloseButton,
       Portal,
       Dialog,
       Input, 
       HStack, 
       Radiomark,
       RadioGroup,
       Button, 
       Field
       } from '@chakra-ui/react'


       const items = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
]


export default function TransactionModal({isOpen, onClose }){

    return <Dialog.Root isOpen={isOpen} onClose={onClose}>
            <form>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header> Add New Transaction </Dialog.Header>
                        <Dialog.Body>
                            <Field.Root>
                                <Field.Label>
                                    Enter Description 
                                </Field.Label>
                                <Input 
                                placeholder='Enter transaction Description '
                                name='description'
                                type='text'
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
                                />
                            </Field.Root>
                            <RadioGroup.Root defaultValue="1">
                                <HStack gap={4}>
                                    {items.map((item) => (
                                    <RadioGroup.Item key={item.value} value={item.value}>
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator />
                                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                    ))}
                                 </HStack>
                            </RadioGroup.Root>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button mr={'4'}>Add</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                    </ Dialog.Positioner>
                </Portal>
            </form>
    </Dialog.Root>
}


