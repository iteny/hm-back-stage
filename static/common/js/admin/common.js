// var hm = {
//     /**
//      * 右侧错误提示
//      * @param info 错误信息
//      * @param id 标签的ID
//      */
//     error: function(info, id) {
//         layer.tips(info, id, {
//             tips: [2, '#ff6347'],
//             time: 5000,
//         });
//     },
//     success: function(info, id) {
//         layer.tips(info, id, {
//             tips: [2, '#398439'],
//             time: 5000,
//         });
//     },
//     alert: function(title, msg, icon, timeout, showType) { //右下角提示框
//         layer.alert(msg, {
//             icon: icon,
//             title: title,
//             time: timeout,
//             anim: 1,
//             offset: 't',
//             shift: 2,
//             shade: 0.1,
//             btn: ['我明白了']
//         });
//     },
//     reloadPage: function() {
//         window.location.reload();
//     },
//     //判断数组中是否存在某个值
//     inArray: function(arr, id) {
//         for (var i = 0; i < arr.length; i++) {
//             if (arr[i] == id) {
//                 return true;
//             }
//         }
//         return false;
//     },
//     countdown: function(intDiff) {
//         window.setInterval(function() {
//             var day = 0,
//                 hour = 0,
//                 minute = 0,
//                 second = 0; //时间默认值
//             if (intDiff > 0) {
//                 day = Math.floor(intDiff / (60 * 60 * 24));
//                 hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
//                 minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
//                 second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
//             }
//             if (minute <= 9) minute = '0' + minute;
//             if (second <= 9) second = '0' + second;
//             $('#day_show').html(day + "天");
//             $('#hour_show').html('<s id="h"></s>' + hour + '时');
//             $('#minute_show').html('<s></s>' + minute + '分');
//             $('#second_show').html('<s></s>' + second + '秒');
//             intDiff--;
//         }, 1000);
//     },
//     /**
//      * form提交处理
//      * @param submitName 给提交设定一个名字，防止冲突
//      */
//     submit: function(submitName, submitUrl, redirect) {
//         //自定义验证规则
//         form.verify({
//             title: function(value) {
//                 if (value.length < 5) {
//                     return '标题至少得5个字符啊';
//                 }
//             },
//             pass: [/(.+){6,12}$/, '密码必须6到12位'],
//             content: function(value) {
//                 layedit.sync(editIndex);
//             }
//         });
//         //监听提交
//         form.on('submit(' + submitName + ')', function(data) {
//             // layer.alert(JSON.stringify(data.field), {
//             //   title: '最终的提交信息'
//             // })
//             $.ajax({
//                 type: 'post',
//                 url: submitUrl,
//                 data: data.field,
//                 dataType: "json",
//                 beforeSend: function() {
//                     myload = layer.load(0, {
//                         time: 3 * 1000
//                     });
//                 },
//                 success: function(msg) {
//                     if (msg.status === 1) {
//                         // hm.success(msg.info,'#loginsubmit');
//                         hm.alert('提示信息', msg.info, 1, '3000');
//                         setTimeout(function() {
//                             window.location.href = redirect
//                         }, 3000);
//                     } else {
//                         layer.close(myload);
//                         // hm.error(msg.info,'#loginsubmit');
//                         hm.alert('提示信息', msg.info, 2, '3000');
//                         // formLogin.attr('disabledSubmit',"");
//                         // refreshs();
//                         // $('.yanzheng_img').eq(0).click();
//                         // $('#verify').val('')
//                     }
//                 },
//                 error: function(XMLHttpRequest, textStatus, errorThrown) {
//                     // hm.error('网络连接异常！','#loginsubmit');
//                     hm.alert('提示信息', msg.info, 2, '3000');
//                     // formLogin.attr('disabledSubmit',"");
//                     return false;
//                 }
//             });
//             return false;
//         });
//     },
//     menuTab: hmMenuTab,
// }
