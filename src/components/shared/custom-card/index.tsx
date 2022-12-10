import { checkCurrency } from "@components/home-page/utils";
import { NShared } from "@namespace/shared";
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
  color,
  currency,
  calculatedValue,
}: NShared.TCustomCard) => {
  return (
    <div className="col-md-4 col-sm-6 content-card">
      <div className="card-big-shadow">
        <div
          className="card card-just-text"
          data-background="color"
          data-color={color || "yellow"}
          data-radius="none"
        >
          <div className="content">
            <div className="pinned">{isPinned && <StarFill />}</div>
            <S.Container>
              <S.EditBtn {...{ onClick: () => handleEdit(id) }}>
                <Pencil />
              </S.EditBtn>
              <S.RemoveBtn {...{ onClick: () => handleRemove(id) }}>
                <Trash />
              </S.RemoveBtn>
            </S.Container>
            <h6 className="category">
              {category}
              {shopName && ` / ${shopName}`}
            </h6>
            <h4 className="title">{name}</h4>
            <p className="description">
              {checkCurrency(currency, calculatedValue)}
            </p>
            <p className="pieces">
              {checkCurrency(currency, value)} per {pieces} pieces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
