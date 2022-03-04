
var qlsvAPI = new QlsvSevices();
var validation = new  Validation()
function layDS() {
   qlsvAPI.getQlsvList()
  .then(function(result){
      console.log(result.data)
      hienThiTable(result.data)
  })
  .catch(function(error){
      console.log(error)
  })
}
layDS()
function hienThiTable(mangQLSV){
    var content = "";
    var stt = 1;
    mangQLSV.map(function(sv){
        content += `
        <tr>
        <td>${stt}</td>
        <td>${sv.taiKhoan}</td>
        <td>${sv.matKhau}</td>
        <td>${sv.hoTen}</td>
        <td>${sv.email}</td>
        <td>${sv.ngonNgu}</td>
        <td>${sv.loaiND}</td>
        <td>${sv.hinhAnh}</td>
        <td>${sv.moTa}</td>
        <td>
        <button class="btn btn-danger" onclick = "xoaSV(${sv.id}) " >Xóa</button>
        <button class="btn btn-info" onclick="xemSV(${sv.id})" data-toggle="modal" data-target="#myModal" >Xem</button>
        </td>
        </tr>
        `
        stt ++
    })
    
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content
}
//Thêm Button Thêm
document.getElementById("btnThemNguoiDung").onclick = function(){
    document.querySelector("#myModal .modal-footer").innerHTML = `
    <button onclick="themSV()" class="btn btn-success">Thêm</button>
    `
}
function themSV(){
    var taiKhoan = document.getElementById("TaiKhoan").value
    var ten = document.getElementById("HoTen").value
    var password = document.getElementById("MatKhau").value
    var email = document.getElementById("Email").value
    var hinh = document.getElementById("HinhAnh").value
    var loai = document.getElementById("loaiNguoiDung").value
    var ngonNgu = document.getElementById("loaiNgonNgu").value
    var moTa = document.getElementById("MoTa").value
    
    
    
    
    var isValid = true;
    //kiểm tra tài khoản
    isValid &= validation.checkEmpty(taiKhoan, "spanTaiKhoan", "Tài khoảng không được để trống") 
    //Kiểm tra tên
    isValid &= validation.checkEmpty(ten,"spanHoTen" , "Tên không được để trống") && validation.checkTen(ten , "spanHoTen" , "Họ và tên  không chứa số và ký tự đặc biệt")
    //Kiểm tra mật khẩu
    //isValid &= validation.checkEmpty(password, "spanMatKhau", "Mật khẩu không được để trống") && validation.checkMatKhau(password,"spanMatKhau", "Mật khẩu không đúng định dạng")
    //Kiểm tra email
    isValid &= validation.checkEmpty(email,"spanEmail","Email không được để trống") && validation.checkEmail(email,"spanEmail","Email chưa đúng định dạng")
    //Kiểm tra hình ảnh
    isValid &= validation.checkEmpty(hinh,"spanHinhAnh" ,"Hình ảnh không được để trống")
    //Kiểm tra loại người dùng
    isValid &= validation.checkSelect("loaiNguoiDung" , "spanNguoiDung" , "Người dùng phải được chọn")
    //Kiểm tra loại ngôn ngữ
    isValid &= validation.checkSelect("loaiNgonNgu" , "spanNgonNgu" , "Ngôn ngũ phải được chọn")
     //Kiểm tra mô tả
     isValid &= validation.checkEmpty(moTa,"spanMoTa" , "Mô tả không được để trống") && validation.checkMoTa(moTa,"spanMoTa","Mô Tả Chưa Đúng Định Dạng")
    if (isValid){
        var qlsv = new QuanLySV(taiKhoan,ten,password,email,loai,ngonNgu,moTa,hinh)
        qlsvAPI.addSV(qlsv)
        .then(function(result){
            console.log(result.data);
            layDS();
            document.querySelector("#myModal .close").click()
        })
        .catch(function(error){
            console.log(error)
        })

    }
    
}
function xoaSV(id){
    qlsvAPI.deleteSV(id)
    .then(function(result){
        //Xoá Thành Công
        console.log(result.data);
        layDS()
    })
    .catch(function(error){
        console.log(error);
    })
}
function xemSV(id){
    qlsvAPI.getSV(id)
    .then(function(result){
        //Xem thành công
        console.log(result.data);
        document.getElementById("TaiKhoan").value = result.data.taiKhoan
        document.getElementById("HoTen").value = result.data.hoTen
        document.getElementById("MatKhau").value = result.data.matKhau
        document.getElementById("Email").value = result.data.email
        document.getElementById("HinhAnh").value = result.data.hinhAnh
        document.getElementById("loaiNguoiDung").value = result.data.loaiND
        document.getElementById("loaiNgonNgu").value = result.data.ngonNgu
        document.getElementById("MoTa").value = result.data.moTa
        document.querySelector("#myModal .modal-footer").innerHTML = `
        <button onclick="capNhatSV(${result.data.id})" class="btn btn-success">Cập Nhật</button>
    `
        
    })
    .catch(function(error){
        console.log(error);
    })
}
function capNhatSV(id){
    var taiKhoan = document.getElementById("TaiKhoan").value
    var ten = document.getElementById("HoTen").value
    var password = document.getElementById("MatKhau").value
    var email = document.getElementById("Email").value
    var hinh = document.getElementById("HinhAnh").value
    var loai = document.getElementById("loaiNguoiDung").value
    var ngonNgu = document.getElementById("loaiNgonNgu").value
    var moTa = document.getElementById("MoTa").value

    var qlsv =  new QuanLySV(taiKhoan,ten,password,email,loai,ngonNgu,moTa,hinh)
    console.log(id , qlsv);
    
    qlsvAPI.updeleSV(id,qlsv)
    .then(function(result){
        console.log(result.data);
        layDS()
        document.querySelector("#myModal .close").click()
    })
    .catch(function(error){
        console.log(error);
    })
}

