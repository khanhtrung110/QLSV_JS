function DanhSachSinhVien() {
    this.DSSV = [];
    this.ThemSinhVIen =function (svThem) {
        this.DSSV.push(svThem);
    }
    this.XoaSinhVien = function (stSVXoa) {
        for(var i = 0; i <stSVXoa.length; i++){
            for(var j =0;  j < this.DSSV.length; j++){
                var sinhvien = this.DSSV[j];
                if (stSVXoa[i] == sinhvien.MaSV) {
                  
                    this.DSSV.splice(j,1);
                }
            }
        }
    }
    this.SuaSinhVien = function (svCapNhap) {
        for(var i =0 ; i<this.DSSV.length;i++){
            var svUpdate = this.DSSV[i];
            if (svCapNhap.MaSV == svUpdate.MaSV) {
                
                svUpdate.HoTen=svCapNhap.HoTen;
                svUpdate.Email=svCapNhap.Email;
                svUpdate.SoDT=svCapNhap.SoDT;
                svUpdate.CMND=svCapNhap.CMND;
                svUpdate.DTB=svCapNhap.DTB;
                svUpdate.Loai=svCapNhap.Loai;
            }
        }
        return this;
    }
    this.TimKiemSinhVien = function (keyWord) {
        var listtimkiemsv = new DanhSachSinhVien();
        var sv = this.DSSV;
        for(var i = 0; i < this.DSSV.length;i++){
            var sv = this.DSSV[i];
            if (sv.HoTen.search(keyWord) != -1) {
                listtimkiemsv.ThemSinhVIen(sv);
            }
        }
        return listtimkiemsv;
    }
    this.TimSinhVienTheoMa= function (masv){
        for(var i = 0;this.DSSV.length;i++ ){
            sv = this.DSSV[i];
            if (masv = sv.MaSV) {
                return sv;
            } 
        }
        return null;
    }
}