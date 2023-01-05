import { CustomForm } from "@components/shared";
import { CustomCaptcha } from "@components/shared/custom-captcha";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import { useSignUpService } from "./service";
import { FORM } from "./utils";

import * as S from "@components/login-page/styles";

export const LoginPage = () => {
  const { signUp, validationSchema } = useSignUpService();

  return (
    <Formik
      {...{
        initialValues: {
          email: "",
          password: "",
          confirmPassword: "",
          captcha: false,
        },
        onSubmit: (values) => signUp(values),
        validationSchema,
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
        <Form onSubmit={handleSubmit}>
          {" "}
          <S.Container>
            {FORM.map(({ id, kind, label, options }) => (
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
            <Button {...{ type: "submit", color: "primary" }}>Sign up</Button>
            <CustomCaptcha />
            <S.DetailsContainer>
              <S.text> if you have an account</S.text>
              <S.Redirect {...{ to: "/sign-in" }}>Sign-in</S.Redirect>
            </S.DetailsContainer>
          </S.Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
