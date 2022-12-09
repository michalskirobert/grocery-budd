import { Formik, FormikValues } from "formik";

import { CustomForm } from "../custom-form";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
} from "reactstrap";
import { NShared } from "@namespace/index";
import { CustomBlockLoader } from "../custom-block-loader";
import { useCreateValidations } from "@helpers/use-hooks";
import { CustomFormFeedback } from "../custom-feedback";

export const CustomFormModal = ({
  toggle,
  initialValues,
  isModalOpen,
  title,
  form,
  onClick,
  isLoading = false,
  checkIsModalValid,
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
              <Form>
                {form.map(
                  ({
                    id,
                    label,
                    kind,
                    options,
                    internalLabel,
                    validations,
                    calculate,
                    isCalculatingActive,
                  }) => (
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
                        internalLabel,
                        formula: validations.formula,
                        calculate,
                        isCalculatingActive,
                      }}
                    />
                  )
                )}
              </Form>
            </ModalBody>
          </CustomBlockLoader>
          <ModalFooter>
            <CustomFormFeedback
              {...{
                error:
                  checkIsModalValid && checkIsModalValid(values).errorMessage,
              }}
            />
            <Button
              {...{
                color: "primary",
                onClick: () => handleSubmit(),
                disabled:
                  isLoading ||
                  !isValid ||
                  (checkIsModalValid && checkIsModalValid(values).isBlocked),
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
