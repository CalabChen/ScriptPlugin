/*
 * @Author: CalabChen
 * @Date: 2024-05-20 09:40:43
 * @LastEditors: CalabChen
 * @LastEditTime: 2024-05-22 00:25:06
 * @Description: 森空岛 明日方舟 安卓移动端 自动化签到 脚本
 * @version: 1.0.2
 * @app version: 森空岛 1.12.1
 */

/**
 * @description: 判断手机是否处于锁屏，解锁手机屏幕
 * @return {*}
 */
function unlock() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(500);
        swipe(500, 2000, 500, 1000, 210);
        sleep(500)
        var password = "XXXX"  //这里输入你手机的密码
        for (var i = 0; i < password.length; i++) {
            var p = text(password[i].toString()).findOne().bounds();
            click(p.centerX(), p.centerY());
            sleep(100);
        }
    }
    return;
}

/**
 * @description: 适用于小米手机清理后台，关闭非锁定应用
 * @return {*}
 */
function clean_mermory() {
    home();
    sleep(500);
    recents();
    let mermory = className("android.view.View").id("com.miui.home:id/clearAnimView");
    mermory.findOne(1000).click();
    return;
}

function press_button(button) {
    let res = button.untilFind();
    //toastLog(res.length);
    let bound = res[0].bounds();
    click(bound.centerX(), bound.centerY());
    return;
}

function check_in() {



    click(206, 125, 387, 202);

    var btn2 = text("签到福利");
    press_button(btn2);
    sleep(1000);

    //领取蚊子肉
    click(110, 662, 312, 863);
    click(329, 662, 531, 863);
    click(548, 662, 750, 863);
    click(767, 662, 969, 863);
    click(110, 887, 312, 1088);
    click(329, 887, 531, 1088);
    click(548, 887, 750, 1088);
    toastLog("今天签到成功!");
    back();
    sleep(3000);
    back();

    var btn3 = id("com.hypergryph.skland:id/check");
    if (btn3.exists()) {
        let res = btn3.findOnce().bounds();
        click(res.centerX(), res.centerY());
        toastLog('检票成功!');
    } else {
        toastLog('明日方舟今日已经过了!');
    }
    sleep(1000);

    //每日10个点赞
    for (var i = 1; i <= 10; i++) {
        let btn4 = id("com.hypergryph.skland:id/likeHotSpot").findOne(1000);
        btn4.click();
        swipe(device.width / 2, device.height / 100 * 43, device.width / 2, device.height / 3 * 2, 200);
        sleep(2000);
    }

    return;
}

function main() {
    // 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
    auto.waitFor();

    unlock();
    sleep(1000);
    clean_mermory();
    sleep(1000);

    let app_name = "森空岛";
    let app_name_packagename = getPackageName(app_name);
    launch(app_name_packagename);
    toastLog('森空岛启动! 准备签到明日方舟!');
    sleep(3000);
    setScreenMetrics(1080, 2400);
    // let start_youth_model = className("android.widget.TextView").id("com.hypergryph.skland:id/confirmTv").text("我知道了");
    // var c = start_youth_model.findOne(2000).exists();
    // sleep(3000);
    // if (!c) {
    //     check_in();
    // } else {
    //     c.click();
    //     sleep(1000);
    //     check_in();
    // }

    check_in();
    sleep(3000);

    clean_mermory();
    sleep(1000);

    lockScreen();//锁屏
}

main();

