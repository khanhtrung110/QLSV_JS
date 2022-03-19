function Validation()
{
    this.KiemTraRong = function (value,id)
    {
        if(value.trim() === "")
        {
            document.getElementById(id).style.borderColor = 'red';
            return false;
        }else{
            document.getElementById(id).style.borderColor = 'green';
            return true;
        }
        
    }
    this.KiemTraEmail = function (value,id) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value.toLowerCase())) {
            document.getElementById(id).style.borderColor = 'green';
            return true;
        }else{
            document.getElementById(id).style.borderColor = 'red';

            return false;
        } ;
    }
    this.KiemTraSoDT = function (value,id,seletorError)
    {
        var re = /^\d+$/;
        if(re.test(value) && value.length >=10 && value.length <=12)
        {
            document.getElementById(id).style.borderColor = 'green';
            document.getElementById(seletorError).style.display = 'none';
            document.getElementById(seletorError).innerHTML = '';
            return true;
        }else{document.getElementById(seletorError).style.display = 'block';
        document.getElementById(seletorError).innerHTML = 'Trong khoảng 10-12 số';
            document.getElementById(id).style.borderColor = 'red';
            return false;
        }
       
    }
    
}