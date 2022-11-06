import * as S from "./styles";

export const CustomLoader = ({ isLoading = true }) => {
  if (isLoading) return <S.LoaderContainer>Loading</S.LoaderContainer>;

  return null;
};
