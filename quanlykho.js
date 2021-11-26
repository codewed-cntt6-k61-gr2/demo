function save(){
    let name=document.getElementById('codehang').value;
    let myname=document.getElementById('name').value;
    let donvi=document.getElementById('donvi').value;
    let dongia=document.getElementById('dongia').value;
    let solg=document.getElementById('solg').value;
    let macc=document.getElementById('macc').value;
    let tencc=document.getElementById('tencc').value;

    if(_.isEmpty(name)) {
        name='';
        document.getElementById('codehang-error').innerHTML=' Nhập mã hàng';      
    } else if(name.length <= 2){
        name='';
        document.getElementById('codehang-error').innerHTML='k được ít hơn 2 ký tự ';
    } else if(name.length > 50){
        name='';
        document.getElementById('codehang-error').innerHTML=' k được quá 50 kí tự';
    }
        else {
            document.getElementById('codehang-error').innerHTML='';
        }
    
    if(_.isEmpty(myname)) {
        myname='';
        document.getElementById('name-error').innerHTML='nhập tên hàng';  
    } else if(myname.trim().length <= 2){
        myname='';
        document.getElementById('name-error').innerHTML=' không được nhỏ hơn 2 kí tự';
    } else if(myname.trim().length > 50){
       myname='';
        document.getElementById('name-error').innerHTML=' không được quá 50 kí tự';
    }
    else {
        document.getElementById('name-error').innerHTML='';
    }

    if(_.isEmpty(donvi)){
        donvi='';
        document.getElementById('donvi-error').innerHTML=' nhập đơn vị tính';
    }else if(donvi.trim().length <1){
        donvi='';
        document.getElementById('donvi-error').innerHTML='DV không đúng';
    } else {
        document.getElementById('donvi-error').innerHTML='';
    }

    if(_.isEmpty(dongia)){
        dongia='';
        document.getElementById('dongia-error').innerHTML='Nhập đơn giá';
    }
    else {
        document.getElementById('dongia-error').innerHTML='';
    }

    if(_.isEmpty(solg)){
        solg='';
        document.getElementById('solg-error').innerHTML='  nhập sô lượng';
    }
    else {
        document.getElementById('solg-error').innerHTML='';
    }

    if(_.isEmpty(macc)){
        macc='';
        document.getElementById('macc-error').innerHTML=' nhập mã nhà cung cấp';
    }else if(macc == 0) {
        macc='';
        document.getElementById('macc-error').innerHTML='mã  CT không đúng';
    }
    else {
        document.getElementById('macc-error').innerHTML='';
    }

    if(_.isEmpty(tencc)){
        tencc='';
        document.getElementById('tencc-error').innerHTML=' nhập tên nhà cung câp ';
    } else if(tencc.trim().length < 4) {
        tencc='';
        document.getElementById('tencc-error').innerHTML=' tên nhà CC không đúng';
    }
    else {
        document.getElementById('tencc-error').innerHTML='';
    }

    if(name && myname && donvi && dongia&& solg && macc &&tencc){
        //Lưu vào danh sách khách hàng
        
        let kho = localStorage.getItem('kho') ? JSON.parse(localStorage.getItem('kho')) : [];
       kho.push({
            name: name,
            myname: myname,
            donvi: donvi,
            dongia: dongia,
            solg: solg,
            macc:tencc,
            tencc: macc,
        });  
        
        localStorage.setItem('kho',JSON.stringify(kho));
        this.renderListClient();

    }
}
function renderListClient(){
    let kho= localStorage.getItem('kho') ? JSON.parse(localStorage.getItem('kho')) : [];
    
    if(kho.length === 0) {
        document.getElementById('list-kho').style.display = 'none'
        return false;
        
    }
    document.getElementById('list-kho').style.display = 'block'
    let tablecontent = `<tr>
        <th width='20'>TT</th>
        <th>Mã hàng</th>
        <th>Tên hàng</th>
        <th>Đơn vị tính</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Mã nhà cung cấp</th>
        <th>Nhà cung cấp</th>
        <th>Xóa</th>
        </tr>`;
    kho.forEach((kho, index) =>{
        let clientId = index;    
        index++;
            
            tablecontent += `<tr>
            <td>${index}</td>
            <td>${kho.name}</td>
            <td>${kho.myname}</td>
            <td>${kho.donvi}</td>
            <td>${kho.dongia}</td>
            <td>${kho.solg}</td>
            <td>${kho.macc}</td>
            <td>${kho.tencc}</td>
            <td>
                 <a href='#' onclick='deleteClient(${clientId})'>Xóa</a>
            </td>
            </tr>`
    })

        document.getElementById('grid-kho').innerHTML = tablecontent;  
}

function deleteClient(id){
    let kho = localStorage.getItem('kho') ? JSON.parse(localStorage.getItem('kho')) : [];
    kho.splice(id, 1);
    localStorage.setItem('kho', JSON.stringify(kho));
    renderListClient();
    
}
