import { alignCenter } from "@utilities/styled-components";
import altImage from "@images/awaited_image.png";
import styled from "styled-components";
import { BASE_URL_IMAGE } from '@routers/AppRoute';

const ImageWrapper = styled.div`
  ${alignCenter}
  padding:5px;
  width: 100px;
  height: 60px;
  border: var(--thin-border) var(--form-base-color);
  border-radius: var(--border-radius);
  margin-right: 10px;

  > img {
    object-fit: cover;
    width: 100%;
  }
`;

const ShipmentTracking = (props: any) => {
    const {...shipmentdata} = props.shipmentdata;
  return (
    <div className="row">
      <div className="col-md-2">
        <div className="cust-value"> Shipment Tracking:</div>
        {/* <div className="cust-value">{linedetail?.reqDeliveryTime}</div> */}
      </div>
      <div className="col-md-3">
        <ImageWrapper>
          <a
            href={shipmentdata.shipmentUrl}
            target="blank"
          >
           
            <img
              src={`${BASE_URL_IMAGE}${shipmentdata.shipmentImage}`}
              alt="orderImg"
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = altImage;
              }}
              width="80px"
            />
          </a>
        </ImageWrapper>
      </div>
      <div className="col-md-3">
        <div className="cust-value"> {shipmentdata.shipmentAgent}</div>
        <div className="cust-value"></div>
      </div>
      <div className="col-md-3">
        <div className="cust-value"> {shipmentdata.shipmentTrackingNumber}</div>
        <div className="cust-value"> </div> 
      </div>
    </div>
  );
};

export default ShipmentTracking;
