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
