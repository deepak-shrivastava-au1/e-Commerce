import React from "react"
import AppRoute from "./AppRoute"

const getRoutes=(store : any)=>{
  return <AppRoute {...{store}} />
}

export default getRoutes;