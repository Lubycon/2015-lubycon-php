console.log("INFINITE SCROLL DETECTOR IS READY");
var InfiniteScrollDetector = function(data){
    console.log("INFINITE SCROLL : LOAD PAGE DATA-----------");
    console.log(data);
    this.type = data.type;
    this.topCate = data.topCate || null;
    this.sort= data.sort;
    this.filter = {
        midCate: data.filter.midCate,
        license: data.filter.license,
        continent: data.filter.continent,
        job: data.filter.job,
        search: data.filter.search
    };
    this.searchValue = data.searchValue;
    this.nowPage = data.nowpage;
    this.targetPage = null;
};
InfiniteScrollDetector.prototype.getData = function(){
    return {
        type: this.type,
        page: this.page,
        topCate: this.topCate,
        filter: {
            midCate: this.filter.midCate,
            license: this.filter.license,
            continent: this.filter.continent,
            job: this.filter.job,
            search: this.filter.search
        },
        sort: this.sort,
        searchValue: this.searchValue,
        nowPage: this.nowPage,
        targetPage: this.targetPage
    };
};
InfiniteScrollDetector.prototype.next = function(callback){
    this.nowPage = parseInt(getUrlParameter("page")) || 1;
    this.targetPage = this.nowPage + 1;
    console.log("INFINITE SCROLL : DETECT DATA--------PAGE="+this.nowPage+" => "+this.targetPage);
    console.log(this.getData());
    Request({
        url: "./service/controller/infinite_scroll/controller.php",
        data: this.getData(),
	    callback: callback
    });
    setUrlParameter("page", this.targetPage);
};
InfiniteScrollDetector.prototype.prev = function(callback){
    this.nowPage = parseInt(getUrlParameter("page")) || 1;
    this.targetPage = this.nowPage - 1;

    if(this.targetPage === 0) return false;

    console.log("INFINITE SCROLL : DETECT DATA--------PAGE="+this.nowPage+" => "+this.targetPage);
    console.log(this.getData());
    Request({
        url: "./service/controller/infinite_scroll/controller.php",
        data: this.getData(),
	    callback: callback
    });
    setUrlParameter("page", this.targetPage);
};
InfiniteScrollDetector.prototype.start = function(callback){
    var _this = this;
    $(document).on("scroll",detect);
    function detect(){
        if($(window).scrollTop() === $(document).height() - window.innerHeight){
            console.log("DOWN");
            _this.next(callback);
            return false;
        }
        else if($(document).scrollTop() === 0){
            console.log("UP");
            _this.prev(callback);
            return false;
        }
    }
};
