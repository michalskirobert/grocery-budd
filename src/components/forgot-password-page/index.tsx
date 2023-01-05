import { Form, Formik } from "formik";
import { CustomBlockLoader, CustomForm } from "@components/shared";
import { FOROGOT_PASSWORD_FORM } from "./utils";
import { Button } from "reactstrap";

import * as S from "@components/login-page/styles";
import { useForgotPasswordService } from "./service";

const ForgotPassword = () => {
  const { changePassword, isLoading, validationSchema } =
    useForgotPasswordService();

  return (
    <Formik
      {...{
        initialValues: { email: "" },
        onSubmit: ({ email }) => changePassword(email),
        validationSchema,
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
        <CustomBlockLoader {...{ isBlocking: isLoading }}>
          <Form onSubmit={handleSubmit}>
            <S.Container>
              {FOROGOT_PASSWORD_FORM.map(({ id, kind, label, options }) => (
                <CustomForm
                  {...{
                    id,
                    kind,
                    label,
                    options,
                    handleChange,
                    setFieldValue,
                    values,
                    errors,
                  }}
                />
              ))}
              <Button {...{ color: "primary", type: "submit" }}>
                Change your password
              </Button>
              <S.DetailsContainer>
                <S.text> if you remember your password</S.text>
                <S.Redirect {...{ to: "/sign-in" }}>Back to Sign-in</S.Redirect>
              </S.DetailsContainer>
            </S.Container>
          </Form>
        </CustomBlockLoader>
      )}
    </Formik>
  );
};

export default ForgotPassword;
