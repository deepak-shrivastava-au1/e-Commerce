import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { CurrentSearchString } from "@slices/Products/productSearch";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Iprops {
  updateDataValue: Function;
  totalItems: number;
  pageNo?: number;
}
export default function PaginationButtons(props: Iprops) {
  var searchString = useSelector(CurrentSearchString);
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateData = (event: any, item: number) => {
    props.updateDataValue(searchString.string, item);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={Math.ceil(props.totalItems / 10)}
        page={props.pageNo}
        boundaryCount={1}
        onChange={updateData}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}
