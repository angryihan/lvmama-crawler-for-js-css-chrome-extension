$(function() {
    const picPathArray = [
        'http://pic.lvmama.com',
        'http://s1.lvjs.com.cn',
        'http://s2.lvjs.com.cn',
        'http://s3.lvjs.com.cn',
        'https://pics.lvjs.com.cn'
    ];

    const crawlerDom =
        `<style>
            input:focus, textarea:focus, button:focus {
                outline: none;
            }
            #angryihan-crawler {
                position:fixed;
                right:0;
                top:0;
                z-index: 9999;
                width: 300px;
                padding: 10px;
                border: 1px solid #c1c1c1;
                background:#fff;
                border-radius: 8px;
            }
            #angryihan-keyword {
                width: 288px;
                height: 28px;
                padding: 0 5px;
                margin-top: 8px;
                border: 1px solid #c1c1c1;
                line-height: 28px;
            }
            #angryihan-title {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
            #angryihan-btn-part {
                margin-top: 8px;
            }
            .angryihan-btn {
                float: left;
                display:block;
                width: 147px;
                height: 28px;
                padding: 0 5px;
                font-size: 14px;
                line-height: 28px;
                cursor: pointer;
                color: #666666;
                border: 1px solid #c1c1c1;
                border-radius: 3px;
                background-color: #ffffff;
            }
            .angryihan-btn:hover {
                color: #e38;
                border-color: #e38;
            }
            #angryihan-copy-btn {
                position: fixed;
                right: 11px;
                top: 79px;
                z-index: 10000;
            }
            #angryihan-result {
                font-family: "Lucida Sans Typewriter", 'monaco', "PingFang SC", "Microsoft Yahei", monospace;
                resize: none;
                width: 288px;
                height: 180px;
                margin-top: 8px;
                margin-bottom: 0;
                padding: 0 5px;
                border: 1px solid #c1c1c1;
                line-height: 20px;
                word-break: break-all;
            }
            #angryihan-result::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            #angryihan-result::-webkit-scrollbar-track {
                background-color: #eeeeee;
                border-radius: 4px;
            }
            #angryihan-result::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: #d3d3d3;
            }
        </style>

        <div id="angryihan-crawler">
            <div id="angryihan-crawler-main">
                <p id="angryihan-title">驴妈妈缓存统计神器</p>
                <input id="angryihan-keyword" type="text" placeholder="请输入关键词">
                <div id="angryihan-btn-part">
                    <button id="angryihan-search-btn" class="angryihan-btn">搜索</button>
                </div>
                <textarea id="angryihan-result" placeholder="缓存文件结果"></textarea>
            </div>
            <button id="angryihan-copy-btn" class="angryihan-btn" data-clipboard-action="copy" data-clipboard-target="#angryihan-result">复制</button>
        </div>`;

    let $crawlerMain;
    let $result;
    let $keyword;
    let $searchBtn;

    function init() {
        if ($("#angryihan-crawler").length) {
            $("#angryihan-crawler").show();
        } else {
            $('body').append(crawlerDom);
            $crawler = $("#angryihan-crawler");
            $crawlerMain = $("#angryihan-crawler-main");
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
        // 隐藏
        $(document).on("click", function(){
            $crawler.hide();
        });
        // 阻止冒泡
        $crawlerMain.on("click", function(e){
            e.stopPropagation();
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
