import { apiConnector } from "../services/apiConnector"
import {useSelector,useDispatch} from 'react-redux'

const infiniteScroll=(apiObj={},data=[],skipNo=0,limitNo=10,pageNo=1)=>{

   const dispatch=useDispatch()
   const {products,isLoading,page}=useSelector((state)=>state.superCategory)

    if(Object.keys(apiObj).length===0){
        //handle data
    }else{
        //handle api

    }

}