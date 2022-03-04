function QlsvSevices(){
    this.getQlsvList = function(){
        return axios({
            method: "get",
            url: "https://621f0c32311a705914fe95e2.mockapi.io/QLSV",
          });
    }
    this.addSV = function(sv){
        return axios({
            method: "post",
            url: "https://621f0c32311a705914fe95e2.mockapi.io/QLSV",
            data: sv
        });
    }
    this.deleteSV = function(id){
        return axios({
            method: "delete",
            url: `https://621f0c32311a705914fe95e2.mockapi.io/QLSV/${id}`,
          });
    }
    this.getSV = function(id){
        return axios({
            method: "get",
            url: `https://621f0c32311a705914fe95e2.mockapi.io/QLSV/${id}`,
          });
    }
    this.updeleSV = function(id,sv){
        return axios({
            method: "put",
            url: `https://621f0c32311a705914fe95e2.mockapi.io/QLSV/${id}`,
            data : sv
          });
    }
}