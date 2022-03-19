function getEle(id) {
    return document.getElementById(id);
}
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa = '';
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DTB = '';
SinhVien.prototype.Loai = '';
SinhVien.prototype.TinhDiemTb = function () {
    var diemtb = ((Number(this.DiemHoa) + Number(this.DiemToan) + Number(this.DiemLy)) / 3);
    this.DTB = diemtb.toFixed(2);
}
SinhVien.prototype.XepLoai = function () {
    if (this.DTB >= 8 && this.DTB <= 10) {
        this.Loai = 'Giỏi';
    } else if (this.DTB < 8 && this.DTB >= 6.5) {
        this.Loai = 'Khá';
    } else if (this.DTB < 6.5 & this.DTB > 5) {
        this.Loai = 'Trung bình';
    } else {
        this.Loai = 'Yếu';
    }
}


var danhSachSinhVien = new DanhSachSinhVien();
var validation = new Validation();
function ThemSinhVien() {
    var masv = getEle('masv').value;
    var hoten = getEle('hoten').value;
    var cmnd = getEle('cmnd').value;
    var sdt = getEle('sdt').value;
    var email = getEle('email').value;
    //Kiem tra Validation
    var valid = true;
    valid &= validation.KiemTraRong(masv, 'masv') & validation.KiemTraRong(hoten, 'hoten') & validation.KiemTraRong(cmnd, 'cmnd') & validation.KiemTraRong(sdt, 'sdt') & validation.KiemTraRong(email, 'email');
    // & validation.KiemTraRong(toan,'Toan') & validation.KiemTraRong(ly,'Ly') & validation.KiemTraRong(hoa,'Hoa')
    //Kiểm tra email
    valid &= validation.KiemTraEmail(email, 'email');
    //Kiểm tra sđt
    valid &= validation.KiemTraSoDT(sdt, 'sdt', 'error_sdt');

    if (!valid) {
        return false;
    } else {
        valid = true;
    }

    //Themsinhvien
    var sinhVien = new SinhVien(masv, hoten, email, sdt, cmnd,);
    sinhVien.DiemToan = getEle('Toan').value;
    sinhVien.DiemLy = getEle('Ly').value;
    sinhVien.DiemHoa = getEle('Hoa').value;
    sinhVien.TinhDiemTb();
    sinhVien.XepLoai();
    danhSachSinhVien.ThemSinhVIen(sinhVien);
    //CapNhapSinhVien hiển thị
    CapNhapSinhVien(danhSachSinhVien);
    console.log(danhSachSinhVien);

}

function CapNhapSinhVien(danhsachsinhvien) {
    var listTable = getEle('tbodySinhVien');
    listTable.innerHTML = '';
    for (var i = 0; i < danhsachsinhvien.DSSV.length; i++) {

        var sv = danhsachsinhvien.DSSV[i];
        var trSinhVien = document.createElement('tr');
        trSinhVien.setAttribute('class', 'trSinhVien');
        trSinhVien.setAttribute('onclick', 'SuaSinhVien("' + sv.MaSV + '")');
        var checkMaSV = document.createElement('input');
        checkMaSV.setAttribute('class', 'check_MaSV');
        checkMaSV.setAttribute('type', 'checkbox');
        checkMaSV.setAttribute('value', sv.MaSV);



        var checkbox = document.createElement('td');
        checkbox.appendChild(checkMaSV);
        var masv = theTD(sv.MaSV, 'MaSV');
        var hoten = theTD(sv.HoTen, 'HoTen');
        var email = theTD(sv.Email, 'Email');
        var sdt = theTD(sv.SoDT, 'SoDT');
        var cmnd = theTD(sv.CMND, 'CMND');
        var diemTB = theTD(sv.DTB,'DTB');
        var xeploai = theTD(sv.Loai,'Xeploai');

        trSinhVien.appendChild(checkbox);
        trSinhVien.appendChild(masv);
        trSinhVien.appendChild(hoten);
        trSinhVien.appendChild(email);
        trSinhVien.appendChild(cmnd);
        trSinhVien.appendChild(sdt);
        trSinhVien.appendChild(diemTB);
        trSinhVien.appendChild(xeploai);
        listTable.appendChild(trSinhVien);
    }
}

function theTD(value, className) {
    var td = document.createElement('td');
    td.className = className;
    td.innerHTML = value;
    return td;
}

function SetStorage() {
    var jsonDanhSachSV = JSON.stringify(danhSachSinhVien.DSSV);
    localStorage.setItem('DanhSachSV', jsonDanhSachSV);
}
function GetStorage() {
    var jsonDanhSachSV = localStorage.getItem('DanhSachSV');
    var objectDanhSachSV = JSON.parse(jsonDanhSachSV);
    danhSachSinhVien.DSSV = objectDanhSachSV;
    CapNhapSinhVien(danhSachSinhVien);
}
function XoaSinhVien() {
    var listclass = document.getElementsByClassName('check_MaSV');
    var listcheck = [];
    for (var i = 0; i < listclass.length; i++) {
        if (listclass[i].checked) {
            listcheck.push(listclass[i].value);
        }
    }
    console.log(listcheck);
    danhSachSinhVien.XoaSinhVien(listcheck);
    CapNhapSinhVien(danhSachSinhVien);
}
function TimKiemSinhVien() {
    var tukhoa = getEle('tukhoa').value;
    var timkiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhapSinhVien(timkiem);
    console.log('hello');
}
function SuaSinhVien(masv) {
    var sinhvien = danhSachSinhVien.TimSinhVienTheoMa(masv);
    if (sinhvien != null) {
        getEle('masv').value = sinhvien.MaSV;
        getEle('hoten').value = sinhvien.HoTen;
        getEle('cmnd').value = sinhvien.CMND;
        getEle('sdt').value = sinhvien.SoDT;
        getEle('email').value = sinhvien.Email;
    }

}
function LuuThongTin() {
    var masv = getEle('masv').value;
    var hoten = getEle('hoten').value;
    var cmnd = getEle('cmnd').value;
    var sdt = getEle('sdt').value;
    var email = getEle('email').value;
    var toan = getEle('Toan').value;
    var ly = getEle('Ly').value;
    var hoa = getEle('Hoa').value;
    //Kiem tra Validation
    var valid = true;
    valid &= validation.KiemTraRong(masv, 'masv') & validation.KiemTraRong(hoten, 'hoten') & validation.KiemTraRong(cmnd, 'cmnd') & validation.KiemTraRong(sdt, 'sdt') & validation.KiemTraRong(email, 'email');
    // & validation.KiemTraRong(toan,'Toan') & validation.KiemTraRong(ly,'Ly') & validation.KiemTraRong(hoa,'Hoa')
    //Kiểm tra email
    valid &= validation.KiemTraEmail(email, 'email');
    //Kiểm tra sđt
    valid &= validation.KiemTraSoDT(sdt, 'sdt', 'error_sdt');

    if (!valid) {
        return false;
    } else {
        valid = true;
    }

    //Themsinhvien
    var sinhVien = new SinhVien(masv, hoten, email, sdt, cmnd,);
    //CapNhapSinhVien hiển thị
    sinhVien.DiemToan = getEle('Toan').value;
    sinhVien.DiemLy = getEle('Ly').value;
    sinhVien.DiemHoa = getEle('Hoa').value;
    sinhVien.TinhDiemTb();
    sinhVien.XepLoai();
    danhSachSinhVien.SuaSinhVien(sinhVien);
    CapNhapSinhVien(danhSachSinhVien);
}