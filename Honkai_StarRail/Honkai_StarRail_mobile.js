/*
 * @Author: CalabChen
 * @Date: 2024-05-20 09:40:43
 * @LastEditors: CalabChen
 * @LastEditTime: 2024-05-24 12:02:37
 * @Description: 米游社 崩坏：星穹铁道 安卓移动端 自动化签到 脚本
 * @version: 1.0.3
 * @app version: 米游社 2.71.1
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

    var btn1 = text("崩坏：星穹铁道");
    press_button(btn1);

    var btn2 = text("签到福利");
    press_button(btn2);
    sleep(2000);

    var btn3 = text("查看全部奖励");
    press_button(btn3);
    sleep(2000);

    //领取蚊子肉
    let date = new Date();
    let currentDay = date.getDate();
    currentDay = parseInt(currentDay);
    for (let i = 1; i <= currentDay; i++) {
        var b = "第" + i + "天";
        click(b);
        // toastLog(b);
        sleep(500);
    }
    toastLog("今天签到成功!");
    back();
    sleep(3000);
    back();

    var btn4 = text("候车室");
    press_button(btn4);

    sleep(1000);
    var btn5 = text("打卡");
    if (btn5.exists()) {
        let res = btn5.findOnce().bounds();
        click(res.centerX(), res.centerY());
        toastLog('打卡成功!');
    } else {
        toastLog('星穹铁道今日已经在候车室打卡过了!');
    }
    sleep(1000);

    //每日10个点赞
    for (var i = 1; i <= 10; i++) {
        let btn6 = id("com.mihoyo.hyperion:id/likeBtn").findOne(1000);
        btn6.click();
        swipe(device.width / 2, device.height / 100 * 43, device.width / 2, device.height / 3 * 2, 200);
        sleep(2000);
    }

    return;
}

/**
 * @description: 主函数
 * @return {*}
 */
function main() {
    // 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
    auto.waitFor();

    unlock();
    sleep(1000);
    clean_mermory();
    sleep(1000);

    let app_name = "米游社";
    let app_name_packagename = getPackageName(app_name);
    launch(app_name_packagename);
    toastLog("米游社启动! 准备签到崩坏：星穹铁道!");
    sleep(5000);

    check_in();
    sleep(3000);

    clean_mermory();
    sleep(1000);
    lockScreen();//锁屏
}

main();

