import React from 'react'
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';


function ProductCardInCheckout({ p }) {

    const colors = ["Black",
        "Brown",
        "Silver",
        "White",
        "Blue",
        'Red'];

    const handleColorChange = (e) => {
        console.log('color changed', e.target.value);
        let cart=[];
        if(typeof Window !== "undefined"){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product,id)=>{
                
            })
        }
    };

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name="color" className="form-control">
                        {p.color ? <option>{p.color}</option> : <option value={p.color}>Select</option>}
                        {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </td>
                <td>{p.count}</td>
                <td>Shipping icon</td>
                <td>delete icon</td>
            </tr>
        </tbody>
    );

}

export default ProductCardInCheckout