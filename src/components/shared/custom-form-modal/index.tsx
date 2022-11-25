import { Formik } from "formik";

import { CustomForm } from "../custom-form";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { NShared } from "@namespace/index";
import { CustomBlockLoader } from "../custom-block-loader";
import { useCreateValidations } from "@helpers/use-hooks";

export const CustomFormModal = ({
  toggle,
  initialValues,
  isModalOpen,
  title,
  form,
  onClick,
  isLoading = false,
}: NShared.ICustomFormModal) => {
  const { validationSchema } = useCreateValidations({ form });

  return (
    <Formik
      {...{
        initialValues,
        onSubmit: (values) => onClick(values),
        enableReinitialize: true,
        validationSchema,
        validateOnChange: true,
        validateOnMount: true,
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
        isValid,
        errors,
      }) => (
        <Modal isOpen={isModalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <CustomBlockLoader {...{ isBlocking: isLoading }}>
            <ModalBody>
              {form.map(({ id, label, kind, options }) => (
                <CustomForm
                  key={id}
                  {...{
                    id,
                    label,
                    kind,
                    values,
                    options,
                    handleChange,
                    setFieldValue,
                    errors,
                  }}
                />
              ))}
            </ModalBody>
          </CustomBlockLoader>
          <ModalFooter>
            <Button
              {...{
                color: "primary",
                onClick: () => handleSubmit(),
                disabled: isLoading || !isValid,
              }}
            >
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
};
