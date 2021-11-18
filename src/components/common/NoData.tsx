import { NoData as NoDataSVG } from "@icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const DivContainer = styled.div`
  background: var(--white);
  
 .svgdata{
text-align: center;
padding: 35px 35px 12px;;
font-weight: var(--font-weight-bold);
}
.svgtext{
text-align: center;
padding: 0px 15px 50px 0px;;
font-weight: var(--font-weight-bold);
}
`;


const NoData = () => {
    const { t } = useTranslation();

    return (
        <DivContainer>
            <div className="svgdata">
                <NoDataSVG className="primary-icon-1"/>
            </div>
            <div className="svgtext">{t('CON_NO_DATA_FOUND')}</div>
        </DivContainer>
    )
}

export default NoData;