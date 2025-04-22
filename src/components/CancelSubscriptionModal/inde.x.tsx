import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button
} from '@chakra-ui/react'
import styles from './styles.module.scss'

interface CancelButtonProps {
    isOpen: boolean,
    onClose: () => void,
    onCancelSubscription: () => void
}


export function CancelSubscriptionModal({isOpen, onClose , onCancelSubscription}: CancelButtonProps, ) {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg='#1f2729' className={styles.modalContent}>
            <ModalBody>
              <p>Are you sure you want to cancel your subscription?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="#29292e"  mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onCancelSubscription}>Ok</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}