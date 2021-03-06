import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm, { PatientFormValues } from './AddPatientForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal: React.FC<Props> = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  // const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => ( // THis was the actual line, but throwin error return type isn't defined.
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon> {/* This is a SEMANTIC_UI_REACT component. */}
    <Modal.Header>Add a new patient</Modal.Header>
    {/* This ^^ Modal.Header just sets the class name as "header" in the HTML5 div tag simply.  */}
    <Modal.Content>
      {/* This ^^ Modal.Content just sets the class name as "content" in the HTML5 div tag simply.  */}
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment> /* This is a SEMANTIC_UI_REACT component. */}
      {/* ABOVE Segment tag OF SEMANTIC_UI_REACT COMPONENT transpiler to this=>  <div style="color: red;">Field is required</div> */}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} /> {/* This is a pure REACT component. */}
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
