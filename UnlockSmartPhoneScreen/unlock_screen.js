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

unlock();
