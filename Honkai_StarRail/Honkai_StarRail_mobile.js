/*
 * @Author: CalabChen
 * @Date: 2024-05-20 09:40:43
 * @LastEditors: CalabChen 14226484+calabchen@user.noreply.gitee.com
 * @LastEditTime: 2024-05-20 21:39:35
 * @Description: 米游社 崩坏：星穹铁道 安卓移动端 自动化签到 脚本
 * @version: 1.0.2
 * @app version: 米游社 2.71.1
 */
var app;
var targetName = '米游社';

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

    toastLog('米游社启动! 准备签到崩坏：星穹铁道!');

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

    var btn1 = className("android.widget.TextView").text("崩坏：星穹铁道");
    sleep(3000);
    press_button(btn1);

    var btn2 = className("android.widget.TextView").depth("20").indexInParent("1").text("签到福利");
    sleep(3000);
    press_button(btn2);

    sleep(3000)
    var btn3 = className("android.widget.TextView").text("查看全部奖励");
    press_button(btn3);

    sleep(1000);
    var day = className("android.widget.TextView").depth("14").indexInParent("3");
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

    var btn4 = className("android.widget.TextView").depth("23").text("候车室");
    press_button(btn4);
    sleep(3000);


    var btn5 = className("android.widget.TextView").depth("24").text("打卡");
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
        var btn6 = className("android.widget.TextView").depth("24").id("mPostCardTvTitle").indexInParent("0");
        let res1 = btn6.findOne().bounds();
        click(res1.centerX(), res1.centerY());

        sleep(2000);
        click(825, 2244, 880, 2299);
        back();
        sleep(1000);

        swipe(device.width / 2, device.height / 100 * 43, device.width / 2, device.height / 3 * 2, 200);
        sleep(1000);
    }
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

