import { CustomForm } from "@components/shared";
import { Form, Formik } from "formik";
import { Button } from "reactstrap";
import { useLoginService } from "./service";
import { FORM } from "./utils";

import * as S from "./styles";

export const LoginPage = () => {
  const { signIn, validationSchema } = useLoginService();

  return (
    <Formik
      {...{
        initialValues: { email: "", password: "" },
        onSubmit: (values) => signIn(values),
        validationSchema,
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue, errors }) => (
        <Form onSubmit={handleSubmit}>
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
            <Button {...{ color: "primary", type: "submit" }}>Sign in</Button>
            <S.InformationContainer>
              <S.DetailsContainer>
                <S.text>If you have no account</S.text>
                <S.Redirect {...{ to: "/sign-up" }}>Sign-up</S.Redirect>
              </S.DetailsContainer>
              <S.DetailsContainer>
                <S.text>Forgot your password?</S.text>
                <S.Redirect {...{ to: "/forgot-password" }}>
                  Click here
                </S.Redirect>
              </S.DetailsContainer>
            </S.InformationContainer>
          </S.Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
