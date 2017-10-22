hm.menuCfgReset({
    tyep:'GET',
    url: '/intendant/getMenu?t='+Math.random(),
    spreadOne: false,
    topFilter: 'TopMenu',
    lefFilter: 'LarrySide'
});
hm.getMenuData();
console.log(hm.menuData);
console.log(JSON.parse(window.localStorage.getItem('hm_menu_data')));
hm.menuSet();
$('#hm_menu_top').on("click",'li',function(event){
    var that = $(this),
        data = JSON.parse(window.localStorage.getItem('hm_menu_data')),
        id = $(this).attr('data-id'),
        second = '',
        third = '';
	$('#hm_menu_top li').removeClass('active');
	that.addClass('active');
    if(id){
        if(data != null){
            for(var item in data){
                if (data[item]['id'] == id){
                    // console.log(data[item]['children']);
                    var scount = data[item]['children'].length,sdata = data[item]['children'];
                    // console.log(scount);
                    for(var i=0;i<scount;i++){
                        second += '<div class="panel panel-default">';
                        second +=   '<div class="panel-heading">';
                        second +=       '<div class="panel-title">';
                        second +=           '<a href="#hms'+sdata[i]['id']+'" class="panel-toggle" data-toggle="collapse" data-parent="#hm_menu_second">';
                        second +=               '<i class="fa fa-home"></i>&nbsp;&nbsp;&nbsp;'+sdata[i]['name']+'<span class="fa fa-chevron-right"></span>';
                        second +=           '</a>';
                        second +=       '</div>';
                        second +=   '</div>';
                        second +=   '<div id="hms'+sdata[i]['id']+'" class="panel-collapse collapse">';
                        second +=       '<div class="panel-body">';
                        second +=           '<ul>';
                        var tcount = sdata[i]['children'].length,tdata = sdata[i]['children'];
                        for(var t=0;t<tcount;t++){
                            second += '<li><a data-url="html/panel/personal.html"><i class="fa fa-home"></i>&nbsp;&nbsp;&nbsp;<span>'+tdata[t]["name"]+'</span></a></li>';
                        }
                        second +=           '</ul>';
                        second +=       '</div>';
                        second +=   '</div>';
                        second += '</div>';
                    }

                    $('#hm_menu_second').html(second);
                }
            }
        }
    }else{

    }
    $('.panel-heading').collapse("hide");
    $('.panel-toggle').eq(0).click();
    $('.panel-toggle').bind('panel_title', function() {
        $(this).parent('.panel-title').find('span.fa').attr('class', 'fa fa-chevron-down');
    });
    $('.panel-toggle').eq(0).trigger("panel_title");
    $('.panel-title').eq(0).addClass('active');
});
//处理菜单栏
$('#hm_menu_second').on('click', '.panel-title', function() {
    var that = $(this);
    $('.panel-title').removeClass('active');
    $('span.fa').attr('class', 'fa fa-chevron-right');
    if (that.find('a').hasClass('panel-toggle collapsed')) {
        that.addClass('active');
        that.find('span.fa').attr('class', 'fa fa-chevron-down');
    } else {
        that.find('span.fa').attr('class', 'fa fa-chevron-right');
    }
});
