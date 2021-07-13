
try{
    var user = JSON.parse(localStorage.getItem('user'))

}catch(err){
    // console.log(err.message)
}
const getCart = async () => {
    if(!user) return []
    const res = await fetch(`https://api.treevesto.com:4000/cart/user/`+user?.userId,{
        method:"GET",
        headers:{
            "token":user?.token
        }
    })
    const json = await res.json();
    const data = await json.result.filter(e=>e.type === "cart") || []
    return data
}

const addtoCart = async (pro) => {    
    var formData = new FormData();
    formData.append("userId",user?.userId)
    formData.append("productId",pro._id)
    formData.append("vendorId",pro.vendorId)
    formData.append("type","cart")
    formData.append("image","https://api.treevesto.com:4000/"+pro.productImages[0])
    formData.append("name",pro.productName)
    formData.append("price",pro.sellingPrice)
    formData.append("qty","1")
    formData.append("stock",pro.stock) 
    formData.append("size",pro.size) 

    const res = await fetch(`https://api.treevesto.com:4000/cart/`,{
        method:"POST",
        body:formData,
        headers:{
            "token":user?.token
        }
    })
    const json = await res.json();
    return getCart();
}

const deleteCartItem = async (x) => {
    const res = await fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"DELETE"})
    const json = await res.json();
    return getCart();

}

const updateItemQty = async (x,qty) => { 
    if(qty <= 0){
        deleteCartItem(x);
    }else{
        var formData = new FormData();
        formData.append("qty",qty)
        const res = await fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"PATCH",body:formData})
        const json = await res.json();
    }
    return getCart();
}

const movetoWishlist = async (x) => { 
    var formData = new FormData();
    formData.append("type","wishlist")
    const res = await fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"PATCH",body:formData})
    const json = await res.json();
    return getCart();
}

const initialState =  getCart();

const cart = (state = initialState, action) => {
    switch(action.type){
        case "getCart" : return state;
        case "addToCart" : return addtoCart(action.payloads);
        case "deleteCartItem" : return deleteCartItem(action.payloads);
        case "updateItemQty" : return updateItemQty(action.payloads.id,action.payloads.qty);
        case "movetoWishlist" : return movetoWishlist(action.payloads);
        default : return state;
    }
}

export default cart;