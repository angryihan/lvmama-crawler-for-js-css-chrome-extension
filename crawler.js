$(function() {
    const picPathArray = [
        'http://pic.lvmama.com',
        'http://s1.lvjs.com.cn',
        'http://s2.lvjs.com.cn',
        'http://s3.lvjs.com.cn',
        'https://pics.lvjs.com.cn'
    ];

    const crawlerDom = '<div id="angryihan-crawler" style="position:fixed; right:0; top:0; z-index: 99999; width: 300px; padding: 10px 4px; border: 1px solid #e38; background:#fff;">' +
        '<p style="text-align: center; font-size: 14px; font-weight: bold;">驴妈妈缓存爬虫</p>' +
        '<input id="angryihan-keyword" type="text" placeholder="请输入关键词" style="width: 288px; height: 24px; padding: 0 5px; margin-top: 5px; border: 1px solid #c1c1c1; line-height: 24px;">' +
        '<span id="angryihan-search-btn" style="display:block; width: 288px; height: 24px; margin-top: 5px; padding: 0 5px; line-height: 24px; border: 1px solid #c1c1c1; background: #FBFBFB; color: #666666; text-align: center; cursor: pointer;">搜索</span>' +
        '<span id="angryihan-copy-btn" data-clipboard-action="copy" data-clipboard-target="#angryihan-result" style="display:block; width: 288px; height: 24px; margin-top: 5px; padding: 0 5px; line-height: 24px; border: 1px solid #c1c1c1; background: #FBFBFB; color: #666666; text-align: center; cursor: pointer;">复制</span>' +
        '<textarea id="angryihan-result" placeholder="缓存文件结果" style="resize: none; width: 288px; height: 180px; margin-top: 5px; padding: 0 5px; border: 1px solid #c1c1c1; line-height: 20px; word-break: break-all;"></textarea>' +
        '</div>';

    let $result;
    let $keyword;
    let $crawler;
    let $searchBtn;

    function init() {
        if ($("#angryihan-crawler").length) {
            $crawler.show();
        } else {
            $('body').append(crawlerDom);
            $crawler = $("#angryihan-crawler");
            $result = $("#angryihan-result");
            $keyword = $("#angryihan-keyword");
            $searchBtn = $("#angryihan-search-btn");
            bindEvent();
        }
    }

    function bindEvent() {
        // 搜索
        $searchBtn.on("click", search);
        // 输入框回车搜索
        $keyword.on("keydown", function(e) {
            if (e.keyCode == 13) {
                search();
            }
        });
        // 复制
        var clipboard = new Clipboard("#angryihan-copy-btn");
        //复制成功后的回调
        clipboard.on('success', function(e) {
        	e.clearSelection(); //取消被复制文字的选中状态
        });

        //复制失败后的回调
        clipboard.on('error', function(e) {
        	console.error("copy error");
        });
    }

    function search(event) {
        let linkSet = new Set();
        let keyword = $keyword.val();
        if (keyword) {
            $result.val("获取中，请稍候……");
            let pattern = new RegExp(keyword);
            let $resources = $('link[rel="stylesheet"], script');
            $resources.each(function(index, ele) {
                let link = $(ele).attr('href') ? $(ele).attr('href') : $(ele).attr('src');
                if (link && pattern.test(link)) {
                    linkSet.add(link.replace(/(.*pic\.lvmama\.com)|(.*\.lvjs\.com\.cn)/, picPathArray[0]));
                }
            });
            $result.val(linkSet.size ? toText(linkSet) : '未找到对应信息');
        } else {
            $result.val("请输入关键词");
            $keyword.focus();
        }
    }

    function toText(linkSet) {
        let text = '';
        for (let link of linkSet) {
            text += generateAllLinks(link);
        }
        return text;
    }

    function generateAllLinks(url) {
        let allLinksArr = [];
        for (let picPath of picPathArray) {
            allLinksArr.push(url.replace(/.*pic.lvmama.com/, picPath) + '\n');
        }
        return allLinksArr.join('') + '\n';
    }

    init();

});
