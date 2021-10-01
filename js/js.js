window.onload = function(){

    const selectElement = document.forms[0].categoria;

    const container = document.getElementById("container");

    const container2 = document.getElementById("sabores");
    
    const sendButton = getElementById("send-button");

    const finish = document.getElementById("finish");

    sendButton.addEventlistener("click", validate);

    selectElement.addEventlistener("chage", showProducts);
    
    product_list = [];
    var ids = 0;
    
    var elementos = document.forms[0].elements;

    function validate(e){
        e.preventDefault();
        var patron = /^\s+/;
        var opciones = ["Combo 1", "Combo 2", "Combo 3"]

        let categoria = elementos[0];
        let sabor = elementos[1].ariaValueMax.trim();
        var cantidad = elementos[2].value;

        if(categoria.selectedIndex == 0){
            return false;
        }
        else if(!opciones.includes(sabor)){
            console.log("Opción invalida");
            return false;
        }
        else if(sabor == null || sabor.length == 0 || patron.test(sabor) || /\d+/.test(sabor)){
            return false;
        }
        else if (cantidad == 0 || isNaN(cantidad) || cantidad <=0 || cantidad>99){
            return false;
        }
        else{
            addProduct();
        }
        if(product_list.length >0 ){
            finish.style.display = "block";;
        }
    }
    function addProduct(){
        var id = ids;
        let sabor = elementos[1].value.trim();
        var categoria = elementos[0].value;

        var c1 = document.getElementById("Agrandarsoda");
        var c2 = document.getElementById("Ketchup");
        var c3 = document.getElementById("Aderezo");
        var c4 = document.getElementById("agrandarPapas");

        var complementos = [c1,c2,c3,c4];

        var producto = new Producto(id, categoria, sabor,elementos[2].value, complementos); 
        console.log(producto.id);
        ids+=1;
    
        const element = document.createElement('div');
        element.className ="card";

element.innerHTML = 

`<p><strong>${categoria} de ${producto.sabor}</strong><br>

Cantidad: ${producto.cantidad}   Precio: ${producto.precio}   Complementos: ${producto.extras}4 c/u

Total a pagar: ${producto.getTotal()}</p>
<input type="button" class="button" name="delete" value="Eliminar">`;

    container.appendChild(element);
    product_list.push(producto);
    document.forms[0].reset();
    console.log(product_list);

    container.removeEventListener("click", deleteProduct);
    container.addEventListener("click", function(e){

    console.log(e.target+": "+e.target.name+" "+ producto.id);
    if(e.target.name === 'delete'){
        deleteProduct(e.target, producto.id);
    }

});
return false;

}
function completarCompra(){
    var total = 0;
    for(i=0; i< product_list.length; i++){
         console.log(product_list[i]);
         total+=product_list[i].getTotal();
    }
    alert("Monto total a pagar: "+total);
}

function deleteProduct(element, id){
    if(element.name === 'delete'){
        element.parentElement.remove();
        if(product_list.length>0){
            product_list.splice(id,1);
            ids-=1;
        }
            console.log("Productos: "+ product_list.length);
    }else{

        return;
    }

}
    }
    function Producto(id, tipo, sabor, Cantidad, complementos){
        this.id = id;
        this.tipo = tipo;
        this.sabor = sabor;
        this.cantidad = cantidad;
        this.extras = "";
        
        switch(sabor){
            case "Combo 1":
                this.precio = 7.25;
                break;
            case "Combo 2":
                this.precio = 5.75;
                break;
            case "Combo 3":
                this.precio = 3.50;
                break;
        }
        this.subtotal = this.cantidad*this.precio;

        var adicional = 0
        for(var i=0; i<complementos.length; i++){
            if(complementos[i].checked == true){
                this.precio +=0.50;
                this.extras+=complementos[i]+","
            }
        }
        this.getTotal = function(){
            var total = this.subtotal + adicional;
            return total;
        }
    }
}