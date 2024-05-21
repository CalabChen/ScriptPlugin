/*
 * @Author: CalabChen
 * @Date: 2024-05-20 09:40:43
 * @LastEditors: CalabChen
 * @LastEditTime: 2024-05-20 16:19:03
 * @Description: 森空岛 明日方舟 安卓移动端 自动化签到 脚本
 * @version: 1.0.1
 * @app version: 森空岛 1.12.1
 */
var app;
var targetName = '森空岛';

function main() {
    // 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。
    auto.waitFor();

    unlock();
    sleep(1000);

    app.launchApp(targetName);
    sleep(2000);

    killApp(targetName);
    sleep(1000);

    app.launchApp(targetName);
    sleep(3000);

    toastLog('森空岛启动! 准备签到明日方舟!');

    checkin();
    sleep(3000);

    killApp(targetName);
    sleep(1000);
    lockScreen();//锁屏
}

// 解锁屏幕
function unlock() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(500);
        swipe(500, 2000, 500, 1000, 210);
        sleep(500)
        var password = "7632"  //这里输入你手机的密码
        for (var i = 0; i < password.length; i++) {
            var p = text(password[i].toString()).findOne().bounds();
            click(p.centerX(), p.centerY());
            sleep(100);
        }
    }
}

function press_button(button) {
    if (button.exists()) {
        let res = button.findOnce().bounds();
        click(res.centerX(), res.centerY());
    } else {
        toastLog("没有找到该控件");
        exit();
    }
}

function checkin() {

    var btn1 = className("android.widget.FrameLayout").depth("13").indexInParent("1");
    btn1.waitFor();
    press_button(btn1);

    var btn2 = className("android.widget.TextView").depth("17").indexInParent("1").text("签到福利");
    btn2.waitFor();
    press_button(btn2);

    var btn3 = className("android.view.ViewGroup").depth(13).indexInParent("7");
    sleep(3000);
    press_button(btn3);

    sleep(1000);
    var day = className("android.widget.TextView").depth("12").indexInParent("5");
    let flag = day.findOnce().text();
    toastLog("已签到了" + flag + "天");

    let index = parseInt(flag) + 1;

    var b = "第" + index + "天";
    let date = new Date();
    let currentDay = date.getDate();
    currentDay = parseInt(currentDay);
    if (currentDay >= b) {
        click(b);
    }
    toastLog("今天签到成功!");
    sleep(1000);
    back();
    sleep(2000);
    back();

    var btn4 = className("android.widget.ImageView").depth("12").id("check").indexInParent("2");
    if (btn4.exists()) {
        let res = btn4.findOnce().bounds();
        click(res.centerX(), res.centerY());
        toastLog('检票成功!');
    } else {
        toastLog('明日方舟今日已经过了!');
    }
    sleep(1000);
}

function killApp(appName) {
    back();
    sleep(1000);
    back();
    sleep(1000);
    back();
    toastLog(appName + "应用已被关闭");
    return;
}

main();

