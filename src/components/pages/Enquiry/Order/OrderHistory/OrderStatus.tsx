import {
  ListCsv,
  Shipping,
  ListConfirm,
  ListDelay,
  Info_Order,
  InvoicedProcess,
  PickList,
  PickListConfirmed,
  Invoiced,
} from "@icons";
import "./CardTable.scss";


interface IProps {
  orderstatus: string;
  isOrderHeldFlag: false;
}

const OrderStatus = (props: IProps) => {
  return (
    <div>
      <div className="d-flex">
        <div>
      {props.orderstatus === "" && props.isOrderHeldFlag && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <Info_Order />
        </div>
      )}
      {props.orderstatus === "Sales order entered" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <ListCsv/>
        </div>
      )}
      {props.orderstatus === "Orders to be delivered later" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <ListDelay/>
        </div>
      )}
      {props.orderstatus === "Order Confirmation printed" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <ListConfirm/>
        </div>
      )}
      {props.orderstatus === "Pick list printed" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <PickList/>
        </div>
      )}
      {props.orderstatus === "Pick list confirmed" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <PickListConfirmed/>
        </div>
      )}
      {props.orderstatus === "Transport note printed" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <Shipping/>
        </div>
      )}
      {props.orderstatus === "Under invoicing" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <InvoicedProcess/>
        </div>
      )}
      {props.orderstatus === "Invoiced" && (
        <div className="icon-circle-cont float-left primary-icon-4">
          <Invoiced/>
        </div>
      )}
</div>
<div className="m-l-10 m-t-5">
      {props.orderstatus}
      </div>
      </div>
    </div>
  );
};

export default OrderStatus;
