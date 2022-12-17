import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, NumberInput, useEditableControls } from "@chakra-ui/react"

export default function InputEditable({type, min, ...props}) {

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
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      w="100%" 
      borderBottom="1px solid #00000022"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      textAlign='center'
      {...props}
      fontWeight="400"
      isPreviewFocusable={false}
    >
      <EditablePreview />
        <Input isRequired as={EditableInput} type={type} min={min} />
      <EditableControls />
    </Editable>
  )
}
