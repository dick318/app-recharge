const path = require('path');
const chalk = require('chalk');

exports.getSettings = function (env) {

    var settings = {
        // 通过代理访问的后台地址
        proxyTarget:'http://localhost:2246/',

        // 当前启动的端口
        visitPort:'8080',

        // 是否调试模式
        isDebug:false,

        // 是否启用js、css压缩
        isMinimize:false,

        outputFolderName: '', // 发布目录名称

        path:{
            // 输出目录路径
            outputPath: '',

            /*
             * publish path
             * （发布目录）
             * */
            publicPath: '/',

            /*
             * node_modules path
             */
            node_modulesPath: path.resolve('./node_modules'),

            /*
             *公共文件
             * */
            libsPath: path.resolve('./libs'),
        }
    };


    if (env && env.dev){

        settings.isDebug = true;
        settings.isMinimize = false;
        settings.showLog = true;
        settings.outputFolderName = 'dist';

        settings.path.outputPath = "./";
        settings.path.publicPath = "/webpack3-simple-app/"

    }else if (env && env.build){

        settings.isDebug = false;
        settings.showLog = false;
        settings.isMinimize = true;

        settings.outputFolderName = 'dist';

        settings.path.outputPath = "./";
        settings.path.publicPath = "./"

    }else if (env && env.dist){
        settings.showLog = true;
        settings.isDebug = false;
        settings.isMinimize = true;

        settings.outputFolderName = 'prod';
        settings.test = true;

        settings.path.outputPath = "../../";
        settings.path.publicPath = "./"


    }else if (env && env.prod){
        settings.showLog = true;
        settings.isDebug = false;
        settings.isMinimize = true;

        settings.outputFolderName = 'dist';
        settings.test = true;

        settings.path.outputPath = "./";
        settings.path.publicPath = "./"


    }else if (env && env.test){
        settings.showLog = true;
        settings.isDebug = false;
        settings.isMinimize = true;

        settings.outputFolderName = 'prod';

        settings.path.outputPath = "../../";
        settings.path.publicPath = "./"


    }else{
        var msg;
        if (!env){
            msg = 'setting.js error : In the script node of package.json, the parameter "env" can\'t be empty';

        }else{
            msg = 'setting.js error : In the script node of package.json,"env" Must be one of "build", "dev", or "dist"';

        }
        console.log(chalk.red(msg));
        return false;
    }

    return settings;
}
