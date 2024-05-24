/**
 * @description: 各大手机的操作系统
 * @return {*}
 */
const os_name = {
    xiaomi: 'Xiaomi', //Hyper OS
    huawei: 'Huawei',//Harmony OS
    vivo: 'Vivo',//Origin OS
    oppo: 'Oppo',//Color OS
    honor: 'Honor',//Magic OS
}

/**
 * @description: 适用于手机清理后台，关闭非锁定应用
 * @return {*}
 */
function clean_mermory(phone_brand) {
    home();
    sleep(500);
    recents();

    var mermory;
    switch (true) {
        case phone_brand == os_name.xiaomi:
            mermory = className("android.view.View").id("com.miui.home:id/clearAnimView");
            mermory.findOne(1000).click();
            break;
        case phone_brand == os_name.huawei:

            break;
        case phone_brand == os_name.vivo:
            mermory = className("android.widget.FrameLayout").id("com.bbk.launcher2:id/action_clean");
            mermory.findOne(1000).click();
            break;
        case phone_brand == os_name.oppo:

            break;
        case phone_brand == os_name.honor:

            break;
        default:
            text = "您的手机品牌的操作系统不知道㖏, 哎嘿( ╹▿╹ )";
            toastLog(text);
            break;
    }
    return;
}

clean_mermory(device.brand);

