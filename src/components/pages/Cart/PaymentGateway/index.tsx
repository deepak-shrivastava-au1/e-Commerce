import LoadingOverlay from '@common/LoadingOverlay';
import { IuserWebSettings } from '@constants/interfaces/userWebSettings';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import { curbStoneURLSelector } from '@slices/cart/getCurbStoneURL'
import React,{ useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function PaymentGateway() {

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  // Hook to attach plp script to HTML body 
  // NOTE consider useEpaymentGateway also to conside different payment gateway
  useEffect(() => {
    const PLP__SCRIPT__URL= `https://${webSettings?.paymentHostName}/curbstone/plp/scripts/plp.js`;

    const script = document.createElement("script");
    script.async = true;
    script.src = PLP__SCRIPT__URL;

    document.body.appendChild(script);

    return ()=> {
      document.body.removeChild(script)
    }

  }, [])

  const { loading, data } : { loading:boolean,data:string } = useSelector(curbStoneURLSelector);

  if(loading){
     return <LoadingOverlay active={loading} />
  }

  const URL = typeof data==="string" && data?.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)?.[0] || ''

  return (
    <div style={{height:'82vh',display:'flex',alignItems:"center",justifyContent:"center",marginTop:"50px"}}>
      <iframe src={URL} width="60%" height="60%"></iframe> 
    </div>
  )
}
