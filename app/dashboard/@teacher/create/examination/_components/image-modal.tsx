import { Button } from '@nextui-org/button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'
import Image from 'next/image'
import React from 'react'

type PropsType = {
    isOpen: boolean,
    onOpen: () => void,
    imageSource: string,
}

function ImageModal(props:PropsType) {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpen}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col items-center"><p className='text-base'>Image Preview</p></ModalHeader>
                        <ModalBody className='flex justify-center'>
                            <Image width={500} height={500} src={props.imageSource} alt='popup-image'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ImageModal