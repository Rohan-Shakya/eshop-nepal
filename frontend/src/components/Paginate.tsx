import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  pages: number | string;
  page: number | string;
  keyword: string;
  isAdmin?: boolean;
}

const defaultProps = {
  keyword: "",
  isAdmin: false,
};
const Paginate = ({
  pages,
  page,
  keyword,
  isAdmin,
}: Props & typeof defaultProps) => {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  let arr = [];
  if (pages) {
    for (let i = 1; i <= pages; i++) arr.push(i);
  }

  return pages > 1 ? (
    <Pagination>
      {arr.map((x) => (
        <LinkContainer
          key={x}
          to={
            !isAdmin
              ? `/?keyword=${keyword}&page=${x}`
              : `/admin/productslist/?keyword=${keyword}&page=${x}`
          }
        >
          <Pagination.Item active={x === page}>{x}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : (
    <></>
  );
};

Paginate.defaultProps = defaultProps;

export default Paginate;
