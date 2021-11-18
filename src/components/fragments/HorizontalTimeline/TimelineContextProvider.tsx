import { UserCartContext } from '@providers/UserCartCtxProvider';
import { cartSelector } from '@slices/cart/getTemporaryOrderData';
import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';

interface IProps {
  activeKey: number,
  setActiveKey: Dispatch<SetStateAction<number>>,
  handleTab: (id: number) => void
}

export const TimelineContext = createContext<IProps>({
  activeKey: 1,
  setActiveKey: () => { },
  handleTab: () => { }
});

interface Props {
  children: ReactNode
}

function TimelineContextProvider(props: Props) {
  const { children } = props

  const { defaultScreen, setDefaultScreen, dispatch }: any = useContext(UserCartContext);

  const pageKeyList: any = {
    1: 'cart',
    2: 'delivery',
    3: 'payment'
  }

  const pageValueList: any = {
    'cart':1,
    'delivery':2,
    'payment':3
  }

  const [activeKey, setActiveKey] = useState<number>(1);

  useEffect(() => {

    if(defaultScreen){
      let id= pageValueList[defaultScreen?.["timeLine"]["page"]]
      setActiveKey(id);  
    }
  }, [])

  const handleTab = (id: number) => {
    dispatch(setDefaultScreen(
      {
        timeLine: {
          status: true,
          page: pageKeyList[id]
        },
        addProduct: { status: false },
        interruptedCart: {
          status: false
        }
      }))
    setActiveKey(id);
  };

  return (
    <TimelineContext.Provider value={{ activeKey, setActiveKey, handleTab }}>
      {children}
    </TimelineContext.Provider>
  )
}

export default TimelineContextProvider;
