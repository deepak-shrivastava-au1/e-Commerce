import Button from '@common/Button'
import { AddSVG, ArrowDownSVG, ArrowUpSVG, Badge, CheckSVG, LeftSVG, NoData, PreviousArrow, RightSVG, SearchIcon, TrashForModalSVG } from '@icons'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { ShoppingListsContext } from '../CtxProvider'
import { fetchGetShoppingListSearchDetails, initializeShoppingListsDetailsLoader, setMessageCode, shoppingListsDetailsSelector } from '@slices/shoppingLists/getShoppingListSearchDetails'
import LoadingOverlay from '@common/LoadingOverlay'
import { cssVar, rgba } from 'polished'
import { createNewShoppingListSelector, fetchCreateNewShoppingLists, initializeCreateNewShoppingListLoader, setCreateNewShoppingListHasErrors, setCreateNewShoppingListMessageCode } from '@slices/shoppingLists/CreateNewShoppingList'
import Input from '@common/Input'
import { respondTo } from '@utilities/styled-components'
import Modal from '@common/Modal'
import { getErrorMsgForShoppingLists } from '@utilities/error/serviceErrorCodeUtil'
import { fetchMakeDefaultShoppingList, initializeMakeDefaultShoppingListLoader, makeDefaultShoppingListSelector, setMakeDefaultShoppingListHasErrors, setMakeDefaultShoppingListMessageCode } from "@slices/shoppingLists/makeDefaultShoppingList"
import { deleteShoppingListSelector, fetchDeleteShoppingList, initializeDeleteShoppingListLoader } from '@slices/shoppingLists/deleteShoppingList'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import ScrollToTop from '@common/ScrollToTop'
import Checkbox from '@common/Checkbox'

const AllListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${respondTo.xs`
    margin-left:0;
  `}

  ${respondTo.sm`
    margin-left:0px;
  `}
  .card-thead{
    color:var(--primary-color-3);
    font-weight: var(--font-weight-medium);
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  ${respondTo.xs`
    padding: 0px;
    flex-direction:column;
    align-items:flex-start;
  `}

  ${respondTo.sm`
    padding:0;
    flex-direction:row;
    align-items: center;
  `}

  .title{
    font-weight: var(--font-weight-bold);
    font-size:calc(var(--base-font-size) + 12px);

    ${respondTo.xs`
    margin-bottom:1rem;
  `}

  ${respondTo.sm`
    margin-bottom:0;
  `}
  }
`
const CardRow = styled.div`

  .list_id{
    font-weight: var(--font-weight-medium);
    color: var(--primary-color-1);
    text-decoration: underline;
  }

  .list_desc{
    font-size:calc(var(--base-font-size) - 2px);
    line-height: 22px;
  }

  .default_button{
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:calc(var(--base-font-size) - 1px);
    margin-top: 0px;
    
    ${respondTo.xs`
      margin-top: 16px;
    `}
    
    ${respondTo.sm`
      margin-top: 0px;
    `}
  }

  .delete_button{
    display: flex;

    ${respondTo.xs`
      justify-content: start;
      margin-left: -10px;
    `}

    ${respondTo.sm`
      justify-content: center;
    `}
  }
`
const CreateListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: var(--border-radius);
  margin-bottom:1rem;
`
const CreateListHeader = styled.div`
  padding:24px 17px;
  font-weight: var(--font-weight-bold);
  font-size:calc(var(--base-font-size) + 4px);
  border-bottom: var(--thin-border) ${rgba(cssVar(`--primary-color-4`), 0.2)};
`
const InputFieldsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding:24px;
  >:not(:last-child){
    margin-bottom: 16px;
  }

  ${respondTo.xs`
    width:100%;
  `}

  ${respondTo.sm`
    width:50%;
  `}
`
const ButtonSwitcher = styled.div`
  margin-top:24px ;
  display:flex;
  justify-content: flex-end;
`
const InputSearch = styled.div`
  position:relative;
  display: flex;
  align-items: center;

  svg{
    position:absolute;
    right: 0;
    top:18%;
    margin-right:8px;
    cursor: pointer;
  }

  ${respondTo.xs`
    input[type="text"]{
      width:270px;
    }
  `}

  ${respondTo.sm`
    input[type="text"]{
      width:418px;
    }
  `}
`
const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  >:not(:last-child){
    margin-right: 3px;
  }

  .default {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    background-color: var(--white);
    border-radius: var(--border-radius);
    margin-left: 8px;
    line-height: 32px;
    border: 1px solid var(--gray-4);
    }
    .disable{
       opacity: var(--low-opacity);
       pointer-events: none;      
    }
    .icon-color{
      stroke: var(--primary-icon-4);
      fill: var(--primary-icon-4);
      width: 25px;
    }
`
const SearchSection = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;

  ${respondTo.xs`
    flex-direction:column;
     padding: 0px;
  `}

  ${respondTo.sm`
    flex-direction:row;
    padding:0;
  `}
`
// interface Props { }

function AllLists() {

  const { t, dispatch, isMobile, userInfo, webSettings } = useContext(ShoppingListsContext);

  const { data: shoppingListsDetails, loading, messageCode } = useSelector(shoppingListsDetailsSelector);

  const { loading: isMakeDefaultShoppingListLoading, messageCode: makeDefaultShoppingListMessageCode, hasErrors: makeDefaultShoppingListhasErrors } = useSelector(makeDefaultShoppingListSelector);

  const { loading: isCreateNewShoppingListsLoading, messageCode: createNewListMessageCode, hasErrors: createNewListsHasErrors } = useSelector(createNewShoppingListSelector);

  const { loading: isDeleteShoppingListLoading } = useSelector(deleteShoppingListSelector)

  const [createList, setCreateList] = useState({ status: false, listId: '', listDesc: '', sharedList:false });

  const [query, setQuery] = useState("");

  const [isQuerySearched, setIsQuerySearched] = useState(false)

  const [deleteDialogStatus, setDeleteDialogStatus] = useState(false);

  const isDefaultCustomer = (id: string) => shoppingListsDetails?.defaultShoppingListId === id;

  const [pageNo, setPageNo] = useState(1);

  const [titleList, setTitleList] = useState<Array<{ title: string, order: "DESC" | "ASC" | "none", id: string }>>([
    { title: 'CON_LIST_NAME', order: "ASC", id: "ListId" },
    { title: 'COH_LIST_OWNER', order: "none", id: "" },
    { title: 'CON_CUSTOMER', order: "ASC", id: "Customer" },
    { title: 'CON_SHARED', order: "none", id: "" },
    { title: 'COH_LAST_USED_DATE', order: "ASC", id: "LastUsed" },
    { title: '', order: 'none', id: "" },
    { title: '', order: 'none', id: "" }
  ])

  const handleSearch = () => {

    setIsQuerySearched(true)

    const safe__query = query.trim();

    dispatch(initializeShoppingListsDetailsLoader())

    dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
      ListId: safe__query,
      CustomerId: userInfo?.defaultCustomerCode,
      ListType: 'YourList',
      ResultsPerPage: 10,
      OrderBy: 'DESC',
      SortBy: 'ListId',
      PageNo: 1
    }))
  }


  useEffect(() => {
    dispatch(initializeShoppingListsDetailsLoader())
    if (!isQuerySearched) {
      dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
        OrderBy: 'DESC',
        SortBy: 'ListId',
        PageNo: pageNo
      }))
    } else {
      dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
        ListId: query.trim(),
        CustomerId: userInfo?.defaultCustomerCode,
        ListType: 'YourList',
        ResultsPerPage: 10,
        OrderBy: 'DESC',
        SortBy: 'ListId',
        PageNo: pageNo
      }))
    }

  }, [pageNo])

  useEffect(() => {
    // Run If Shopping List is empty
    if(messageCode===111 ){
      setCreateList(prevState => {
        return {
          ...prevState,
          status: true
        }
      })  
    }else if(messageCode===null){
      setCreateList(prevState => {
        return {
          ...prevState,
          status: false
        }
      })
    }
  }, [shoppingListsDetails])

  useEffect(() => {
    return () => {
      dispatch(setMessageCode(null))
    }
  }, [])

  return (
    <AllListsContainer>

      <ScrollToTop />

      {/* Loading overlay for shopping lists details is loading */}
      <LoadingOverlay active={loading || isMakeDefaultShoppingListLoading || isCreateNewShoppingListsLoading || isDeleteShoppingListLoading} />

      {/* Modal once new shopping list is generated */}
      <Modal
        isAlert
        title={t(getErrorMsgForShoppingLists(createNewListMessageCode)).replace('&1', createList.listId)}
        isOpen={createNewListsHasErrors && createNewListMessageCode !== 2266}
        hasCancelButton={false}
        onRequestClose={() => {
          dispatch(setCreateNewShoppingListHasErrors(false));
          dispatch(setCreateNewShoppingListMessageCode(null));
        }}
        secondaryActionText={t('CON_OK')}
        onSecondaryButtonClick={() => {
          setCreateList({ status: false, listDesc: '', listId: '', sharedList:false })

          dispatch(setCreateNewShoppingListHasErrors(false));
          dispatch(setCreateNewShoppingListMessageCode(null));
        }}
      />

      {/* Modal once default list is set */}
      <Modal
        isAlert
        title={t(getErrorMsgForShoppingLists(makeDefaultShoppingListMessageCode))}
        isOpen={makeDefaultShoppingListhasErrors}
        hasCancelButton={false}
        onRequestClose={() => {
          dispatch(setMakeDefaultShoppingListHasErrors(false));
          dispatch(setMakeDefaultShoppingListMessageCode(null));
        }}
        secondaryActionText={t('CON_OK')}
        onSecondaryButtonClick={() => {
          dispatch(setMakeDefaultShoppingListHasErrors(false));
          dispatch(setMakeDefaultShoppingListMessageCode(null));
        }}
      />

      <Header>
        <span className="title">
          {t('TXT_PAGE_TITLE_SHOPPING_LIST')}
        </span>

        <Button
          variant="solid"
          color="critical"
          onClick={() => setCreateList({ status: true, listDesc: '', listId: '',  sharedList: false })}
        >
          <AddSVG width="1.3em" height="1.3em" className="icon" /> <span> {t('CON_CREATE_NEW_LIST')} </span>
        </Button>
      </Header>

      {/* Create List UI */}
      {createList.status ?
        <CreateListContainer>
          <CreateListHeader>
            {t('CON_CREATE_LIST')}
          </CreateListHeader>
          <InputFieldsContainer>
            <Input
              labelText={t('CON_LIST_NAME')}
              showLabel
              value={createList.listId}
              onChange={(value) => setCreateList((prevState)=>{ return { ...prevState,listId: value.toUpperCase(),  }})}
            />
            <Input
              labelText={t('COH_DESCRIPTION')}
              showLabel
              onChange={(value) => setCreateList((prevState)=>{return {  ...prevState,listDesc: value }})}
            />

            {
              webSettings?.allowSharedShoppingList === 'Y' ?
                <Checkbox
                  labelText={t('CON_SHARE_WITH_COLLEAGUES')}
                  onChange={(checked)=>setCreateList((prevState)=>{return {  ...prevState, sharedList: checked.target.checked }})}
                />
              :
              null
            }
            <ButtonSwitcher>
              <Button
                variant="outlined"
                color="neutral"
                style={{ border: "0" }}
                onClick={() => setCreateList({ status: false, listDesc: '', listId: '', sharedList:false })}

              >{t('CON_CANCEL')}</Button>
              <Button
                style={{ marginLeft: "10px" }}
                disabled={createList.listId.length === 0}
                onClick={() => {
                  dispatch(initializeCreateNewShoppingListLoader())
                  dispatch(fetchCreateNewShoppingLists(userInfo?.sessionId, {
                    ListId: createList.listId,
                    ListDesc: createList.listDesc,
                    CustomerId: userInfo?.defaultCustomerCode,
                    ListOwnerCode: userInfo?.userID,
                    Shared:createList.sharedList
                  }))
                  setCreateList({ status: false, listDesc: '', listId: '', sharedList:false })
                }}
              >{t('CON_CREATE_LIST')}</Button>
            </ButtonSwitcher>
          </InputFieldsContainer>
        </CreateListContainer> : null}

      {/* Customer Search */}
      <SearchSection>
        <InputSearch>
          <Input
            placeholder={`${t('CON_LIST_NAME')}`}
            showLabel={false}
            spellCheck={false}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
            onChange={(value) => setQuery(value)}
          />
          <span title={t('CON_SEARCH')}>
            <SearchIcon
              onClick={handleSearch}
            />
          </span>
        </InputSearch>
        {/* Pagination */}
        <div className="m-b-15">
        <PaginationContainer>

          {/* First page */}
          <a
            className={clsx('default', {
              'disable': pageNo > 1 ? false : true || !shoppingListsDetails?.moreRecords || pageNo === 1
            })}
            title={t('CON_FIRST_PAGE')}
            onClick={() => setPageNo(1)}
          >
            <PreviousArrow className="icon-color" />
          </a>
          {/* Previous page */}
          <a
            className={clsx('default', {
              'disable': pageNo > 1 ? false : true || !shoppingListsDetails?.moreRecords || pageNo === 1
            })}
            onClick={() => setPageNo(prevState => prevState - 1)}
            title={t('CON_PREVIOUS_PAGE')}
          >
            <LeftSVG className="icon-color" />
          </a>

          {/* Next Page */}
          <a
            className={clsx('default', {
              'disable': !shoppingListsDetails?.moreRecords
            })}
            onClick={() => setPageNo(prevState => prevState + 1)}
            title={t('CON_NEXT')}
          >
            <RightSVG className="icon-color" />
          </a>
        </PaginationContainer>
        </div>
      </SearchSection>

      {/* List items */}
      <div className="card-table">

        <div className="card-thead">
          <div className="row">
            {titleList.map((title, i) => (
              <div className="col" key={`${title}${i}`}>

                <span>{t(title.title)}</span>

                {
                  title?.order === 'ASC' ?
                    <span
                      title={t('CON_CLICK_TO_SORT_ASCENDING')}
                      onClick={() => {
                        dispatch(initializeShoppingListsDetailsLoader())

                        if (!isQuerySearched) {
                          dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
                            OrderBy: 'ASC',
                            SortBy: title.id,
                            PageNo: pageNo
                          }))
                        } else {
                          dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
                            ListId: query.trim(),
                            CustomerId: userInfo?.defaultCustomerCode,
                            ListType: 'YourList',
                            ResultsPerPage: 10,
                            OrderBy: 'ASC',
                            SortBy: title.id,
                            PageNo: pageNo
                          }))
                        }

                        setTitleList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].order = 'DESC'
                          return copiedArr
                        })
                      }}
                    >
                      <ArrowDownSVG className="primary-icon-3 ml-1" />
                    </span> :
                    null
                }
                {
                  title?.order === 'DESC' ?
                    <span
                      title={t('CON_CLICK_TO_SORT_DESCENDING')}
                      onClick={() => {
                        dispatch(initializeShoppingListsDetailsLoader())

                        if (!isQuerySearched) {
                          dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
                            OrderBy: 'DESC',
                            SortBy: title.id,
                            PageNo: pageNo
                          }))
                        } else {
                          dispatch(fetchGetShoppingListSearchDetails(userInfo?.sessionId, {
                            ListId: query.trim(),
                            CustomerId: userInfo?.defaultCustomerCode,
                            ListType: 'YourList',
                            ResultsPerPage: 10,
                            OrderBy: 'DESC',
                            SortBy: title.id,
                            PageNo: pageNo
                          }))
                        }
                        setTitleList(prevState => {
                          const copiedArr = [...prevState];
                          copiedArr[i].order = 'ASC'
                          return copiedArr
                        })
                      }}
                    >
                      <ArrowUpSVG className="primary-icon-3 ml-1" />
                    </span> :
                    null
                }

              </div>
            ))}
          </div>

        </div>
        <div className="card-tbody">
          {
            shoppingListsDetails?.length === 0 ?
              <div className="d-flex flex-column justify-content-center align-items-center mt-10">
                <NoData className="primary-icon-1" />
                <span>{t('CON_NO_DATA_FOUND')}</span>
              </div>
              : null
          }
          {
            shoppingListsDetails?.listSearchBean?.map((list: any, i: number) => (
              <CardRow className="row p-16" key={`${i}${list?.customerId}`}>

                {isDefaultCustomer(list?.listId) ?
                  <Badge />
                  :
                  null
                }
                {/* List ID */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('CON_LIST_NAME')}</label>}
                    <div className="d-flex flex-column">
                      <Link to={`/shoppingLists/listDetails/${list?.listId}`}>
                        <span className="list_id">{list?.listId}</span>
                      </Link>
                      <span className="list_desc">{list?.listDesc}</span>
                    </div>
                  </div>
                </div>
                {/* List Owner */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('COH_LIST_OWNER')}</label>}
                    <span>{list?.listOwner}</span>
                  </div>
                </div>
                {/* Customer Id */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('CON_CUSTOMER')}</label>}
                    <span>{list?.customerId}</span>
                  </div>
                </div>
                {/* Has Shared? */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('CON_SHARED')}</label>}
                    {list?.hasShared}
                  </div>
                </div>
                {/* last Used Date */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('COH_LAST_USED_DATE')}</label>}
                    <span>{list?.lastUsedDate}</span>
                  </div>
                </div>
                {/* Default updater Button */}
                <div className="col">
                  <div className="flex-container">
                    {isMobile && <label className="label-text">{t('CON_ACTION')}</label>}

                    <Button
                      color={`${isDefaultCustomer(list?.listId) ? 'primary' : 'neutral'}`}
                      className="default_button"
                      onClick={() => {
                        // Ignore if current default button is set to default customer
                        if (isDefaultCustomer(list?.listId)) {
                          return;
                        }
                        dispatch(initializeMakeDefaultShoppingListLoader())
                        dispatch(fetchMakeDefaultShoppingList(userInfo?.sessionId, {
                          ListId: list?.listId,
                          ListOwnerCode: userInfo?.userID,
                          CustomerCode: userInfo?.defaultCustomerCode
                        }))
                      }}
                      style={{
                        borderRadius: "22px",
                        width: "100px",
                        backgroundColor: `${isDefaultCustomer(list?.listId) ? `${cssVar('--primary-color-1')}` : '#EEF0F2'}`,
                        color: `${!isDefaultCustomer(list?.listId) ? `${cssVar('--primary-color-4')}` : `${cssVar('--secondary-icon-2')}`}`
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>{t('COH_DEFAULT_ADDRESS')}</span>
                      {isDefaultCustomer(list?.listId) ?
                        <CheckSVG className="secondary-icon-2" /> : null}
                    </Button>
                  </div>
                </div>
                {/* Delete button */}
                <div className="col">
                  <div className="flex-container delete_button">
                    <Button
                      iconOnly
                      color="neutral"
                      variant="outlined"
                      title={t('CON_DELETE')}
                      onClick={() => setDeleteDialogStatus(true)}
                      style={{ border: "0", width: "20%" }}
                    >
                      <u style={{
                        marginLeft: "7px",
                        color: `${cssVar('--primary-color-4')}`,
                        fontWeight: Number(cssVar('--font-weight-regular')),
                        fontSize: `${cssVar('--base-font-size')}`
                      }}
                      >{t('CON_DELETE')}</u>
                    </Button>
                  </div>
                  {/* Modal to deleting an item */}
                  <Modal
                    isAlert
                    icon={<TrashForModalSVG className="primary-icon-1" />}
                    title="Want to Delete ?"
                    message="Are you sure you want to delete this ?"
                    isOpen={deleteDialogStatus}
                    onRequestClose={() => setDeleteDialogStatus(false)}
                    onSecondaryButtonClick={() => {

                      dispatch(initializeDeleteShoppingListLoader())
                      dispatch(fetchDeleteShoppingList(userInfo?.sessionId, {
                        ListId: list?.listId,
                        ListOwnerCode: userInfo?.userID,
                        CustomerCode: userInfo?.defaultCustomerCode
                      }))

                      setTimeout(() => {
                        setDeleteDialogStatus(false)
                      }, 500);
                    }}
                    secondaryActionText={t('CON_DELETE')}
                  />
                </div>
              </CardRow>
            ))
          }
        </div>
      </div>
    </AllListsContainer >
  )
}

export default AllLists
