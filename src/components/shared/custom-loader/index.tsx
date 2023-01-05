import Spinner from "react-bootstrap/Spinner";
import * as S from "./styles";

export const CustomLoader = ({ isLoading = true }) => {
  if (isLoading)
    return (
      <S.LoaderContainer>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </S.LoaderContainer>
    );

  return null;
};
