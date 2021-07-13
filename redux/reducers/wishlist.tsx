
try{
    var user = JSON.parse(localStorage.getItem('user'))

}catch(err){
    // console.log(err.message)
}
const getWishlist = async () => {
    if(!user) return []
    const res = await fetch(`https://api.treevesto.com:4000/cart/user/`+user?.userId,{
        method:"GET",
        headers:{
            "token":user?.token
        }
    })
    const json = await res.json();
    const data = await json.result.filter(e=>e.type === "wishlist")
    return data
}

const addtoWishlist = async (pro) => {
    // var user = JSON.parse(localStorage.getItem('user')) 
    var formData = new FormData();
    formData.append("userId",user?.userId)
    formData.append("productId",pro._id)
    formData.append("vendorId",pro.vendorId)
    formData.append("type","wishlist")
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
    return getWishlist();
}

const deleteWishlistItem = async (x) => {
    const res = await fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"DELETE"})
    const json = await res.json();
    console.log(json)

    return getWishlist();

}

const movetoCart = async (x) => { 
    var formData = new FormData();
    formData.append("type","wishlist")
    const res = await fetch(`https://api.treevesto.com:4000/cart/`+x,{method:"PATCH",body:formData})
    const json = await res.json();
    console.log(json)
    return getWishlist();
}

const initialState =  getWishlist();

const wishlist = (state = initialState, action) => {
    switch(action.type){
        case "getWishlist" : return state;
        case "addToWishlist" : return addtoWishlist(action.payloads);
        case "deleteWishlistItem" : return deleteWishlistItem(action.payloads);
        case "movetoCart" : return movetoCart(action.payloads);
        default : return state;
    }
}

export default wishlist;