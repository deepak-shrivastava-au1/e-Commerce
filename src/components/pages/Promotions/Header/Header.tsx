import React, { useEffect, useState, useContext } from "react";
import MenuBar from "./MenuBar";
import logo from "../../../../assets/branding/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import {
  HeartSVG,
  ProfileSVG,
  SearchSVG,
  CartSVG,
  HamburgerMenuSVG,
} from "@icons";
import { UPDATE_CHIPS } from "@slices/Products/filterChipsReducer";
import { useDispatch, useSelector } from "react-redux";
import productSearch, {
  fetchProducts,
} from "../../../../redux/Slices/Products/productSearch";
import { HOME, CART, PRODUCTS, DEFAULTSHOPPINGLISTS } from "@constants/Routes";
import ProfileMenu from "../../UserAccount/ProfileMenu";
import AnonymousLogin from "../../UserAccount/AnonymousLogin";

import {
  cartSelector,
  fetchcartItems,
  setDefaultScreen,
} from "@slices/cart/getTemporaryOrderData";
import { useGetLoggedInUserInfo } from "@hooks";
import { useForm } from "react-hook-form";
import {
  currentString,
  productsSelector
} from "@slices/Products/productSearch";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useHistory } from "react-router-dom";
import { getCompareDetails } from "@slices/Products/productCompare";
import LoadingOverlay from "@common/LoadingOverlay";

const HeaderC = () => {
  const productState = useSelector(productsSelector);
  const webSettingsData: any = useContext(WebSettingsContext);
  const [searchText, setSearchText] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  const location = useLocation();

  const orderCounts = useSelector(cartSelector)?.cartItems?.lineCount;

  const onInputChange = (event: any) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (productState.isCompleted) {
      setLoader(false);
    }
  }, [productState.isCompleted]);

  const handleCartRoute = () => {
    if (location?.pathname !== CART) {
      dispatch(
        setDefaultScreen({
          timeLine: {
            status: true,
            page: "cart",
          },
          addProduct: { status: false },
          interruptedCart: { status: false },
        })
      );
    }
  };

  const onSubmit = (event: any) => {
    dispatch({
      type: currentString,
      payload: searchText,
    });
    dispatch({
      type: UPDATE_CHIPS,
      payload: [],
    });
    setLoader(true);
    console.log("deepak3")
    dispatch(fetchProducts(searchText, 1, webSettingsData?.languageCode));
    setSearchText("");

    dispatch({
      type: getCompareDetails,
      payload: [],
    });
  };

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchcartItems(sessionId));
    }
  }, [sessionId]);

  const handleKeyPress = (target: any) => {
    // I'm guessing you have value stored in state
    if (target.charCode === 13) {
      history.push(`${PRODUCTS}`);
    }
  };
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const menuHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <header className='header-sticky'>
       <LoadingOverlay active={loader} />
      <section className='header-container border-bottom'>
        <div className='row search-header align-items-center'>
          <div className='hamburger-menu'>
            {" "}
            <HamburgerMenuSVG
              onClick={menuHandler}
              className='secondary-icon-2'
            />
          </div>
          <div className=''>
            <Link to={HOME} className='brand-wrap'>
              <img src={logo} alt='' />
            </Link>
          </div>
          <div className='mobile-block'>
            <div className='widgets-wrap float-md-right'>
              <div className='widget-header icontext'>
                <Link
                  onClick={handleCartRoute}
                  to={sessionId ? CART : "#"}
                  className='icon icon-notification secondary-icon-2'
                >
                  <i>
                    <CartSVG />
                  </i>
                  <span className='badge badge-pill badge-danger notify'>
                    {!orderCounts ? "0" : orderCounts}
                  </span>
                </Link>
                <a href='#' className='icon icon-md secondary-icon-2'>
                  <Link to={DEFAULTSHOPPINGLISTS}>
                    <i>
                      <HeartSVG style={{ marginTop: "-8px" }} />
                    </i>
                  </Link>
                </a>
                <div className='widget-header'>
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "none" }}></div>
          <div className='search-area'>
            <form onSubmit={handleSubmit(onSubmit)} className='search'>
              <div className='input-group w-100'>
                <input
                  type='text'
                  className='form-control search-bar'
                  placeholder='Search'
                  value={searchText}
                  onChange={(event) => onInputChange(event)}
                />
                <div
                  onClick={handleSubmit(onSubmit)}
                  className='input-group-append'
                >
                  <Link to={PRODUCTS}>
                    <button
                      style={{ margin: "0px" }}
                      className='btn btn-search'
                      type='submit'
                      onKeyPress={(e: any) => handleKeyPress(e)}
                    >
                      {/* onClick={handleSubmit(onSubmit)} */}
                      <i>
                        <SearchSVG className='secondary-icon-2' />
                      </i>
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className=' mobile-hide'>
            <div className='widgets-wrap float-md-right'>
              <div className='widget-header  mr-3'>
                <Link
                  onClick={handleCartRoute}
                  to={sessionId ? CART : "#"}
                  className='icon icon-notification secondary-icon-2'
                >
                  <i>
                    <CartSVG />
                  </i>
                </Link>
                <span className='badge badge-pill badge-danger notify'>
                  {!orderCounts ? "0" : orderCounts}
                </span>
              </div>

              <div className='widget-header  mr-3'>
                <a href='#' className='icon icon-sm secondary-icon-2'>
                  <Link to={sessionId ? DEFAULTSHOPPINGLISTS : "#"}>
                    <i>
                      <HeartSVG />
                    </i>
                  </Link>
                </a>
              </div>
              <div className='widget-header  mr-3'>
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>

        <MenuBar menu={showMenu} onMenuChange={menuHandler} />
      </section>
    </header>
  );
};

export default HeaderC;
