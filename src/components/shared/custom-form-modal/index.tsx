import { Formik } from "formik";

import { CustomForm } from "../custom-form";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { NShared } from "@namespace/index";

export const CustomFormModal = ({
  toggle,
  initialValues,
  isModalOpen,
  title,
  form,
  options,
  onClick,
}: NShared.ICustomFormModal) => (
  <Formik {...{ initialValues, onSubmit: (values) => onClick(values) }}>
    {({ values, handleSubmit, handleChange, setFieldValue }) => (
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {form.map(({ id, label, kind }) => (
            <CustomForm
              {...{
                id,
                label,
                kind,
                values,
                options,
                handleChange,
                setFieldValue,
              }}
            />
          ))}
        </ModalBody>
        <ModalFooter>
          <Button {...{ color: "primary", onClick: () => handleSubmit() }}>
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    )}
  </Formik>
);
