function save(){
	let fullname=document.getElementById('fullname').value;
    let code=document.getElementById('code').value;
	let phone=document.getElementById('phone').value;
	let address=document.getElementById('address').value;
	let yield=document.getElementById('yield').value;
	let quantity=document.getElementById('quantity').value;
	let price=document.getElementById('price').value;

    if(_.isEmpty(fullname)) {
        fullname='';
        document.getElementById('fullname-error').innerHTML='Vui lòng nhập họ và tên';      
    } else if(fullname.length <= 2){
        fullname='';
        document.getElementById('fullname-error').innerHTML='Họ và tên không được nhỏ hơn 2 kí tự';
    } else if(fullname.length > 50){
        fullname='';
        document.getElementById('fullname-error').innerHTML='Họ và tên không được quá 50 kí tự';
    }
    else {
        document.getElementById('fullname-error').innerHTML='';
    }
    
    if(_.isEmpty(code)) {
        code='';
        document.getElementById('code-error').innerHTML='Vui lòng nhập mã khách hàng';  
    } else if(code.trim().length <= 2){
        code='';
        document.getElementById('code-error').innerHTML='Mã khách hàng không được nhỏ hơn 2 kí tự';
    } else if(code.trim().length > 10){
        code='';
        document.getElementById('code-error').innerHTML='Mã khách hàng không được quá 10 kí tự';
    }
    else {
        document.getElementById('code-error').innerHTML='';
    }

    if(_.isEmpty(phone)){
        phone='';
        document.getElementById('phone-error').innerHTML='Vui lòng nhập SĐT';
    }else if(phone.trim().length > 10){
        phone='';
        document.getElementById('phone-error').innerHTML='SĐT không đúng';
    }else if(phone.trim().length < 10){
        phone='';
        document.getElementById('phone-error').innerHTML='SĐT không đúng';
    }
    else {
        document.getElementById('phone-error').innerHTML='';
    }

    if(_.isEmpty(address)){
        address='';
        document.getElementById('address-error').innerHTML='Vui lòng nhập địa chỉ';
    }
    else {
        document.getElementById('address-error').innerHTML='';
    }

    if(_.isEmpty(yield)){
        yield='';
        document.getElementById('yield-error').innerHTML='Vui lòng nhập tên sản phẩm';
    }
    else {
        document.getElementById('yield-error').innerHTML='';
    }

    if(_.isEmpty(quantity)){
        quantity='';
        document.getElementById('quantity-error').innerHTML='Vui lòng nhập số lượng';
    }else if(quantity == 0) {
        quantity='';
        document.getElementById('quantity-error').innerHTML='Số lượng  không đúng';
    }
    else {
        document.getElementById('quantity-error').innerHTML='';
    }

    if(_.isEmpty(price)){
        price='';
        document.getElementById('price-error').innerHTML='Vui lòng nhập giá thành';
    } else if(price.trim().length < 4) {
        price='';
        document.getElementById('price-error').innerHTML='Giá thành không đúng';
    }
    else {
        document.getElementById('price-error').innerHTML='';
    }

    if(fullname && code && phone && address && yield && quantity && price){
        //Lưu vào danh sách khách hàng
        
        let client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : [];
        client.push({
            fullname: fullname,
            code: code,
            phone: phone,
            address: address,
            yield: yield,
            quantity: quantity,
            price: price,
        });  
        
        localStorage.setItem('client',JSON.stringify(client));
        this.renderListClient();

    }
}
function renderListClient(){
    let client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : [];
    
    if(client.length === 0) {
        document.getElementById('list-client').style.display = 'none'
        return false;
        
    }
    document.getElementById('list-client').style.display = 'block'
    let tablecontent = `<tr>
        <td width='20'>#</td>
        <td>Họ và tên</td>
        <td>Mã khách hàng</td>
        <td>Số điện thoại</td>
        <td>Địa chỉ</td>
        <td>Sản phẩm</td>
        <td>Số lượng</td>
        <td>Giá thành</td>
        <td>Sửa/Xóa</td>
        </tr>`;
    client.forEach((client, index) =>{
        let clientId = index;    
        index++;
            
            tablecontent += `<tr>
            <td>${index}</td>
            <td>${client.fullname}</td>
            <td>${client.code}</td>
            <td>${client.phone}</td>
            <td>${client.address}</td>
            <td>${client.yield}</td>
            <td>${client.quantity}</td>
            <td>${client.price}</td>
            <td>
                <a href='#' onclick='editClient(${clientId})' >Sửa</a> | <a href='#' onclick='deleteClient(${clientId})'>Xóa</a>
            </td>
            </tr>`
    })

        document.getElementById('grid-client').innerHTML = tablecontent;  
}

function deleteClient(id){
    let client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : [];
    client.splice(id, 1);
    localStorage.setItem('client', JSON.stringify(client));
    renderListClient();
    
}
function editClient(id){
    let client = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client')) : [];
    client.splice(id, id);
    localStorage.setItem('client', JSON.stringify(client));
    renderListClient();
    
}
