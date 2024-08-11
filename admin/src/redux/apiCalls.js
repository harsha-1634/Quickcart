import { loginFailure, loginStart,loginSuccess } from "./userRedux";
import { getProductFailure, getProductSuccess,getProductStart,deleteProductStart,deleteProductFailure,deleteProductSuccess,updateProductStart,updateProductFailure,updateProductSuccess,addProductStart,addProductFailure,addProductSuccess} from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";
export const login=async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const res=await publicRequest.post("http://localhost:5000/api/auth/login",user)
        dispatch(loginSuccess(res.data));
    }
    catch{
        dispatch(loginFailure());
    }
};



export const getProduct=async(dispatch)=>{
    dispatch(getProductStart());
    try{
        const res=await publicRequest.get("http://localhost:5000/api/products")
        dispatch( getProductSuccess(res.data));
    }
    catch{
        dispatch( getProductFailure());
    }
};


export const deleteProduct=async(id,dispatch)=>{
    dispatch(deleteProductStart());
    try{
        // const res=await userRequest.delete(`http://localhost:5000/api/products/${id}`)
        dispatch( deleteProductSuccess(id));
    }
    catch{
        dispatch( deleteProductFailure());
    }
};


export const updateProduct=async(id,product,dispatch)=>{
    dispatch(updateProductStart());
    try{
        // const res=await userRequest.delete(`http://localhost:5000/api/products/${id}`)
        dispatch( updateProductSuccess({id,product}));
    }
    catch{
        dispatch( updateProductFailure());
    }
};



export const addProduct=async(product,dispatch)=>{
    dispatch(addProductStart());
    try{
        const res=await userRequest.post("/products",product);
        console.log(res);
        dispatch( addProductSuccess(res.data));
    }
    catch{
        dispatch( addProductFailure());
    }
};