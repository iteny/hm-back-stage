var HmMenuTab = function() {
    /**
     *  默认配置
     */
    this.config = {
        top_menu: undefined, //顶部顶级菜单
        data: undefined, //数据源
        url: undefined, //数据源地址
        type: 'GET', //读取方式
        cached: true, //是否启用菜单数据项缓存，默认localStorage
        spreadOne: false, //设置是否只展开一个二级菜单
        topFilter: 'TopMenu', //顶级菜单过滤器
        left_menu: undefined, //左侧二级导航
        leftFilter: 'LarrySide', //左侧菜单过滤器
        larry_elem: undefined, //tab选项卡容器
        tabFilter: 'larryTab', //tab过滤器
        maxTab: 50, //默认允许最大打开tab个数
        tabSession: true, //是否开启已打开tab选项卡缓存
        closed: true, // 选项卡是否包含删除按钮进而可关闭操作
        contextMenu: false, //是否屏蔽页面右键，使用页面级自定义右键菜单
        autoRefresh: false, //是否支持选项卡重新打开时自动刷新操作
    }
    // alert(this.config.topFilter);
}
/**
 * @param options [可设置所有配置，覆盖掉默认的配置]
 */
HmMenuTab.prototype.fullSet = function(options) {
    var that = this;
    $.extend(true, that.config, options);
    return that;
};
/**
 * @param options [可设置必要配置，覆盖掉默认的配置]
 */
HmMenuTab.prototype.menuSet = function(options) {
    var that = this;
    if (!options.hasOwnProperty('data') && !options.hasOwnProperty('url')) {
        Base.errorDialog('没有传入数据源:data 或 url参数，菜单项无法正常初始化！', common.larryCore.errorTit);
    }
    var allow = ['top_menu', 'left_menu', 'data', 'url', 'type', 'cached', 'spreadOne', 'topFilter', 'leftFilter'];
    var option = configFilter(options, allow);
    // 传入参数进行配置
    $.extend(that.config, options);
    return that;
};
//创建HmMenuTab对象
var hmMenuTab = new HmMenuTab();
