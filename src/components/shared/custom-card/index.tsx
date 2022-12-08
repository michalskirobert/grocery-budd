import { Pencil, StarFill, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

import * as S from "./styles";

export const CustomCard = ({
  id,
  name,
  category,
  shopName,
  value,
  pieces,
  isPinned,
  handleRemove,
  handleEdit,
}) => {
  return (
    <Card
      {...{
        className: "my-2",
        color: "warning",
        inverse: true,
        style: { width: "18rem" },
      }}
    >
      <CardHeader
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <S.Title>
          {!!isPinned && <S.Icon />}
          {category?.label}
        </S.Title>
        <S.Container>
          <S.EditBtn {...{ onClick: () => handleEdit(id) }}>
            <Pencil />
          </S.EditBtn>
          <S.RemoveBtn {...{ onClick: () => handleRemove(id) }}>
            <Trash />
          </S.RemoveBtn>
        </S.Container>
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardText>
          <p>{shopName?.label}</p>
          <p>{pieces}</p>
          <p>{String(value)}</p>
        </CardText>
      </CardBody>
    </Card>
  );
};
