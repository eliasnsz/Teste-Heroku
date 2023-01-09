import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, FormLabel, IconButton, Input, useEditableControls } from "@chakra-ui/react"

export default function EditableNameInput({ ...props }) {
  
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton 
          bg="transparent" 
          color="brown.1000" 
          variant="unstyled"
          borderRadius="none" 
          size='sm' 
          _hover={{ bg: "brown.400", color: "brown.100" }}
          icon={<EditIcon />} 
          {...getEditButtonProps()} 
        />
      </Flex>
    )
  }

  return (
    <FormLabel fontWeight={600}>
      Nome completo:

      <Editable
      fontWeight={500}
      textAlign='center'
      fontSize='lg'
      isPreviewFocusable={false}
      {...props}
      >
      <Flex gap={2}>
        <EditablePreview />
        <Input 
          as={EditableInput} 
          autoComplete="name"
          variant="flushed"
          name="name"
          isRequired
          borderColor="brown.300"
          focusBorderColor="brown.600"
        />
        <EditableControls/>
      </Flex>
    </Editable>
    </FormLabel>
  )
}