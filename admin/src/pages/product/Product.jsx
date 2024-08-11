import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@mui/icons-material";
import { useLocation } from "react-router-dom"; 
import { useSelector } from "react-redux"
import React, { useState, useMemo,useEffect  } from "react";
import {userRequest} from "../../requestMethods";
export default function Product() {

    const location=useLocation();
    const productId=location.pathname.split("/")[2];
    const [pstats,setPstats]=useState([]);
    // console.log(productId);
    const product=useSelector((state)=>state.product.products.find((product)=>product._id===productId))
    const MONTHS=useMemo(
        ()=>[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
      useEffect(()=>{
        const getStats=async()=>{
          try{
            const res=await userRequest.get("/orders/income?pid=")
            const list=res.data.sort((a,b)=>{
                return a._id-b._id
            })
            const s=list.map(item=>({
              name: MONTHS[item._id - 1],
              Sales: item.total,
            }));
            setPstats(s);
          } catch{}
        };
        getStats();
      },[MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pstats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.instock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title}/>
                  <label>Product description </label>
                  <input type="text" placeholder={product.description}/>
                  <label>price</label>
                  <input type="text" placeholder={product.price}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
