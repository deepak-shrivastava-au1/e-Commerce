import { useContext, useState, useEffect } from 'react'
import { UserCartContext } from '@providers/UserCartCtxProvider'
import CartItem from "./CartItem"


function CartItemList() {

  const { data: userCartData }: any = useContext(UserCartContext);

  const [RemarkAddIndexList, setRemarkAddIndexList] = useState<Array<boolean>>([])

  // INFO Hook to intitialize an array for remark list UI based on number of cart items
  useEffect(() => {
    if (typeof userCartData !== "undefined" && userCartData !== null && Object.keys(userCartData).length !== 1) {
      setRemarkAddIndexList(()=>{
        return Object.values(userCartData?.orderLines).map(()=>false)
      })
    }
  }, [userCartData])

  const handleRemarkIndexList = (index:number) =>{
    setRemarkAddIndexList((prevState:Array<boolean>)=>{
      const copiedArr=[...prevState];
      copiedArr[index] = !copiedArr[index]; 
      return copiedArr;
    })
  }

  return (
    <>
      {
        Object.values(userCartData.orderLines).map((order: any, i: number) => (
          <CartItem {...{order,i,RemarkAddIndexList,handleRemarkIndexList}} />
        ))
      }
    </>
  )
}

export default CartItemList
