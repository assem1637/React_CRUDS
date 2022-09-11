import { useEffect, useState } from "react";


export default function App(){

    let Product = {
        nameProduct : '',
        priceProduct : 0,
        categoryProduct : '',
        descriptionProduct : ''
    }

    let [infoProduct , setInfoProduct] = useState(Product);
    let [allProduct , setAllProduct] = useState([]);
    let [resultSearch , setResultSearch] = useState([]);
    let [numberOfEdit , setNumberOfEdit] = useState(0);

    
    function getInfoProduct(e){

        let copyInfoProduct = {...infoProduct};
        copyInfoProduct[e.target.id] = e.target.value;
        setInfoProduct(copyInfoProduct);

    }

    function submit(e){

        e.preventDefault();


      let nameProduct =  document.querySelector(`#nameProduct`).value;
      let priceProduct =  document.querySelector(`#priceProduct`).value;
      let categoryProduct =  document.querySelector(`#categoryProduct`).value;
      let descriptionProduct =  document.querySelector(`#descriptionProduct`).value;



        if(nameProduct === "" && priceProduct === "" && categoryProduct === "" && descriptionProduct === "") {

            
            alert('Write Completely Info Product');

        } else {

            setAllProduct([...allProduct , infoProduct]);
            clearInputs();

        }

    }

    useEffect(()=> {

        if(allProduct.length > 0) {
            localStorage.setItem(`Products` , JSON.stringify(allProduct));
        }

    } , [allProduct]);


    function getData(){

        if(localStorage.getItem(`Products`)){
            setAllProduct(JSON.parse(localStorage.getItem(`Products`)));
        }

    }

    useEffect(()=> {

        getData();

    } , []);


    function Search(e){

       

        if(e.target.value === '') {

            setResultSearch([]);
            setAllProduct(allProduct);

        } else {

            let result = allProduct.filter((item)=> item.nameProduct.toLowerCase().includes(e.target.value.toLowerCase()));
            setResultSearch(result);

        }

    }


    function Delete(index){

        

        if(resultSearch.length > 0){

            alert('Please, Remove Search First');

        } else {

            allProduct.splice(index,1);
            localStorage.setItem(`Products` , JSON.stringify(allProduct));
            getData();

        }

    }


    function Update(index) {

        if(resultSearch.length > 0) {

            alert('Please, Remove Search First');

        } else {

            let updateProduct = document.querySelector(`.updateProduct`);
            updateProduct.classList.replace(`d-none` , `d-inline`);


            document.querySelector(`#nameProduct`).value = allProduct[index].nameProduct;
            document.querySelector(`#priceProduct`).value = allProduct[index].priceProduct;
            document.querySelector(`#categoryProduct`).value = allProduct[index].categoryProduct;
            document.querySelector(`#descriptionProduct`).value = allProduct[index].descriptionProduct;
            
            
            return setNumberOfEdit(index);

        }

    }


    function updateInfo(){

        allProduct[numberOfEdit].nameProduct = document.querySelector(`#nameProduct`).value;
        allProduct[numberOfEdit].priceProduct = document.querySelector(`#priceProduct`).value;
        allProduct[numberOfEdit].categoryProduct = document.querySelector(`#categoryProduct`).value;
        allProduct[numberOfEdit].descriptionProduct = document.querySelector(`#descriptionProduct`).value;

        let updateProduct = document.querySelector(`.updateProduct`);
        updateProduct.classList.replace(`d-inline` , `d-none`);

        localStorage.setItem(`Products` , JSON.stringify(allProduct));
        getData();

        clearInputs();


    }

    function clearInputs() {

        
        document.querySelector(`#nameProduct`).value = '';
        document.querySelector(`#priceProduct`).value = '';
        document.querySelector(`#categoryProduct`).value = '';
        document.querySelector(`#descriptionProduct`).value = '';


    }




    return(<>
    
        <h2 className="text-center my-5 text-light">CRUDS React.JS <span><i className="fa-solid fa-heart"></i></span></h2>

        <form onSubmit={submit} className="my-5 container mx-auto">

            <div className="form-floating text-light mb-3">
                <input onChange={getInfoProduct} type="text" id="nameProduct" className="form-control bg-transparent text-light" placeholder="Product Name" />
                <label htmlFor="nameProduct">Product Name</label>
            </div>

            <div className="form-floating text-light mb-3">
                <input onChange={getInfoProduct} type="number" id="priceProduct" className="form-control bg-transparent text-light" placeholder="Product Price" />
                <label htmlFor="priceProduct">Product Price</label>
            </div>

            <div className="form-floating text-light mb-3">
                <input onChange={getInfoProduct} type="text" id="categoryProduct" className="form-control bg-transparent text-light" placeholder="Product Category" />
                <label htmlFor="categoryProduct">Product Category</label>
            </div>

            <div className="form-floating text-light mb-3">
                <textarea onChange={getInfoProduct} type="text" id="descriptionProduct" className="form-control bg-transparent text-light" placeholder="Product Description"></textarea>
                <label htmlFor="descriptionProduct">Product Description</label>
            </div>

            <button type="submit" className="btn text-light"><span><i className="fa-solid fa-circle-plus"></i></span> Add Product</button>
            <button onClick={updateInfo} type="button" className="updateProduct my-sm-0 my-2 d-none mx-sm-2 mx-0 btn btn-info text-light"><span><i className="fa-solid fa-pen-to-square"></i></span> Update Product</button>
        </form>

        <div className="mx-3 container mx-auto my-5">
            <input onChange={Search} type="text" className="search form-control text-light bg-transparent" placeholder="Search Product Name" />
        </div>

        <table className="table my-5 container mx-auto border text-light text-center">

            <thead>
                <tr>
                    <th>Index</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Category</th>
                    <th>Product Description</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>

                {resultSearch.length > 0 ? <>
                
                    {resultSearch.map((item , i)=> <tr key={i}>

                                    
                        <td>{i}</td>
                        <td>{item.nameProduct}</td>
                        <td>{item.priceProduct}</td>
                        <td>{item.categoryProduct}</td>
                        <td>{item.descriptionProduct}</td>
                        <td><button onClick={()=> Update(i)} className="btn update-btn text-light"><span><i className="fa-solid fa-pen-to-square"></i></span> Update</button></td>
                        <td><button onClick={()=> Delete(i)} className="btn delete-btn text-light"><span><i className="fa-solid fa-trash-can"></i></span> Delete</button></td>


                        </tr>)}

                </> : <>
                
                {allProduct.length > 0 ? allProduct.map((item , i)=> <tr key={i}>

                                
                    <td>{i}</td>
                    <td>{item.nameProduct}</td>
                    <td>{item.priceProduct}</td>
                    <td>{item.categoryProduct}</td>
                    <td>{item.descriptionProduct}</td>
                    <td><button onClick={()=> Update(i)} className="btn update-btn text-light"><span><i className="fa-solid fa-pen-to-square"></i></span> Update</button></td>
                    <td><button onClick={()=> Delete(i)} className="btn delete-btn text-light"><span><i className="fa-solid fa-trash-can"></i></span> Delete</button></td>


                    </tr>) : ''}
                
                </>}


               

              
            </tbody>

        </table>

    </>)

}