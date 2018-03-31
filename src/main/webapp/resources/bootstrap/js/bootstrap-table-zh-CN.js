/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '请稍等，数据正在加载中...';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
        	if(!pageFrom){
        		pageFrom = 0;
        	}if(!pageTo){
        		pageTo = 0;
        	}
            return '第 ' + pageFrom*(pageTo==0?0:1) + ' - ' + pageTo + ' 条记录，共 ' + totalRows + ' 条记录';
        },
        formatAllRows:function(){
        	return "全部";
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '对不起，没有查询到相关的数据...';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },
        formatExport: function () {
            return '导出数据';
        },
        formatClearFilters: function () {
            return '清空过滤';
        },
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);
