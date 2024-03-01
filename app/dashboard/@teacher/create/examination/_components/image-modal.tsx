import { Button } from '@nextui-org/button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'
import Image from 'next/image'
import React from 'react'

type PropsType = {
    isOpen: boolean,
    onOpen: () => void,
    imageSource: string,
    alt: string
}

function ImageModal(props:PropsType) {
    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpen}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col items-center"><p className='text-base'>{props.alt}</p></ModalHeader>
                        <ModalBody>
                            <img src={props.imageSource} alt={props.alt}/>
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