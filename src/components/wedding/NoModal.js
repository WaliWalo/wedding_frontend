
import Modal from 'react-bootstrap/Modal';

export const NoModal = () => {
    let content;
    content = <div>
        {/* <Modal.Header closeButton>
            <Modal.Title>Sorry to hear you are not coming!</Modal.Title>
        </Modal.Header> */}
        <Modal.Body><h1 className='text-center'>Sorry to hear you are not coming!</h1></Modal.Body>       
    </div>
    return content;
}