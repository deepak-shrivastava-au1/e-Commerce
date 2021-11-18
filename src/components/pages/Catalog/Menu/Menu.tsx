import React, { useEffect, useState, Fragment, useContext } from 'react'
import SwipeableDrawer from '@material-ui/core/Drawer';
import './Menu.scss';

import { useSelector } from 'react-redux';
import {getCatalogueMenuSelector} from '@slices/Catalog/Menu/getCatalogueMenu';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { LeftArrowCircle, RightSVG } from '@icons';
import { useTranslation } from "react-i18next";
import { CATALOG } from '@constants/Routes';


const Menu : React.FC<{show:boolean, onClose:any}> = (props) =>{
    const history = useHistory();
    const { t } = useTranslation();

    const catalogueMenuTree : any = useSelector(getCatalogueMenuSelector)?.catalogueMenuTree;
    const [catalogue, setCatalogue] : any = useState<[]>(catalogueMenuTree?.subCatalogueMenuList);
    const [parentCatalogue, setParentCatalogue] : any = useState<{}>();
    const selectedMenu = {parentCode : "", elementCode : "", elementDescription: t("CON_SHOP_BY_CATEGORY")};
    const [selectedElementItem, setSelectedElementItem] = useState<{parentCode : string, elementCode : string, elementDescription:string}>(selectedMenu);
    const [index, setindex] = useState(0);

    useEffect(()=>{
        setCatalogue(catalogueMenuTree?.subCatalogueMenuList);
    }, catalogueMenuTree)

    const subMenuHandler = (elementCode : string)=>{
       let selectedCatalogue =  catalogue?.find((mainCat:any) =>{
            return mainCat.elementCode === elementCode
        })
        let catalogueElements = selectedCatalogue?.subCatalogueMenuList ;
        if(catalogueElements == null || catalogueElements?.length <= 0 ){
            props.onClose();
            history.push(`${CATALOG}/${catalogueMenuTree?.catalogueCode}/${elementCode}`);
           
        } else {
            setindex((preState) => ++preState)
            let pcat = {...parentCatalogue};
            let parentC = {[elementCode] : selectedCatalogue, ...pcat};
            setParentCatalogue(parentC);
            setSelectedElementItem({parentCode : selectedCatalogue.parentCode, elementCode : selectedCatalogue.elementCode, elementDescription : selectedCatalogue.description });
            setCatalogue(catalogueElements);
        }      
    }

    const menuBackHandler = (parentCode : string, elementCode : string)=>{
        if(parentCode === ""){
            if(elementCode === ""){
                props.onClose()
            } else {
                setindex(0);
                setSelectedElementItem(selectedMenu);
                setCatalogue(catalogueMenuTree?.subCatalogueMenuList);
            }
           
        } else {
            setindex((preState) => --preState);
            let selected = {...parentCatalogue[parentCode]};
            setSelectedElementItem({parentCode : selected.parentCode, elementCode : selected.elementCode, elementDescription : selected.description });
            setCatalogue(selected?.subCatalogueMenuList);
        }        
     }

    return (
        <SwipeableDrawer
            anchor='left'
            open={props.show}
            onClose={props.onClose}
        >
            <div id="side-nav" className="side-nav">
                <div className="btn-container">
                    <div className="d-flex">
                        <div>
                            <a className="closebtn float-left" 
                                onClick={() => menuBackHandler(selectedElementItem?.parentCode, selectedElementItem?.elementCode)} 
                             ><LeftArrowCircle className='secondary-icon-2 icon-lg' />
                             </a>
                        </div>
                        <div className="align-self-center flex-grow-1 title">
                             {selectedElementItem.elementCode === "" ? t("CON_MENU") : index <=1 ? t("CON_MENU") + "/" + selectedElementItem.elementDescription
                             : t("CON_MENU") + "/.../" + selectedElementItem.elementDescription}
                        </div>
                    </div>
                </div>
                {selectedElementItem?.elementCode === "" ?
                    <div className="headingDefault" >{selectedElementItem?.elementDescription}</div>
                    : <div 
                        className="heading" 
                        onClick={() => { subMenuHandler(selectedElementItem?.elementCode) }}
                      >{selectedElementItem?.elementDescription}
                      </div>
                }
                {catalogue?.map((cat: any, i: number) => {
                    return <a  title={cat?.description?.length > 32 ? cat?.description : ""}
                        onClick={() => subMenuHandler(cat?.elementCode)} >
                        {cat?.description?.length > 32 ? cat?.description?.substring(0,32) + "..." :cat?.description} {cat?.subCatalogueMenuList?.length > 0 &&
                            <span className="float-right"><RightSVG className="primary-icon-2 icon" /></span>
                        }
                    </a>
                })}

            </div>
       </SwipeableDrawer>
      )
}

export default Menu;