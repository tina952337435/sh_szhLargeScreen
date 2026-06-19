<template> 
    <div class="m-box">
			<div class="title display_flex justify-content_flex-start align-items_center leftTop-radius">
				<span>告警统计</span>
			</div>
			<div class="txt" >
				<div class="m-list4 box-siz" id="tableSY">
					<div class="flex_1 width95 maiweid display_flex mhpad1 flex-wrap justify-content_flex-justify" style="width: 94%;margin: 0 auto;height:calc(100% - 75px);display: none;">
						<div class="widget-inline-box text-center fl" style="height:100%;padding: 2.5% 0;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>&lt;25<br>(小~中雨)</p>
							<h3 class="ceeb1fd" id="count25" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=1', '雨情统计（< 25）', '1200px', '650px')">
							</h3>
						</div>
						<div class="widget-inline-box text-center fl" style="height:100%;padding: 2.5% 0;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>25~50<br>(中雨)</p>
							<h3 class="ceeb1fd" id="count50" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=2', '雨情统计（25~50）', '1200px', '650px')">
							</h3>
						</div>
						<div class=" widget-inline-box text-center fl" style="height:100%;padding: 2% 0;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>50~100<br>(暴雨)</p>
							<h3 class="cffff00" id="count100" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=3', '雨情统计（50~100）', '1200px', '650px')">
							</h3>
						</div>
						<div class="widget-inline-box text-center fl" style="height:100%;padding: 2.5% 0;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>100~250<br>(大暴雨)</p>
							<h3 class="c11e2dd" id="count250" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=4', '雨情统计（100~250）', '1200px', '650px')">
							</h3>
						</div>
						<div class="widget-inline-box text-center fl" style="height:100%;padding: 2.5% 0;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>&gt;250<br>(特大暴雨)</p>
							<h3 class="ceeb1fd" id="countBig" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=5', '雨情统计（> 250）', '1200px', '650px')">
							</h3>
						</div>
					</div>

					<div class="flex_1 width95 maiweid display_flex mhpad1 flex-wrap justify-content_flex-justify" style="width: 94%;margin: 0 auto;height:calc(100% - 75px);">
						<div class="widget-inline-box text-center fl" style="height:100%;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>1小时超<br>30mm</p>
							<h3 class="def1ff" id="countBigDRP1Real" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=21', '1小时超30mm', '1200px', '650px')">0</h3>
						</div>
						<div class=" widget-inline-box text-center fl" style="height:100%;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>3小时超<br>50mm</p>
							<h3 class="def1ff" id="countBigDRP3Real" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=23', '3小时超50mm', '1200px', '650px')">0</h3>
						</div>
						<div class="widget-inline-box text-center fl" style="height:100%;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>6小时<br>超100mm</p>
							<h3 class="def1ff" id="countBigDRP6Real" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=26', '6小时超100mm', '1200px', '650px')">0</h3>
						</div>
						<div class="widget-inline-box text-center fl" style="height:100%;background: rgba(1, 202, 217, .2);background-size: 100% 100%;">
							<p>24小时超<br>200mm</p>
							<h3 class="def1ff" id="countBigDRP24Real" onclick="WindowOpen('/LargeScreen/Danzhan/YQTJ.html?type=24', '24小时超200mm', '1200px', '650px')">0</h3>
						</div>
					</div>
					<div class="flex_1 maiweid display_flex mhpad1 flex-wrap justify-content_flex-justify" style="width: 94%;margin: 0 auto;margin-top: 0.5rem;">
						<!-- <div class="ztitem ztitem1ps display_flex flex-direction_column">
							<div
								class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
								河道超警
							</div>
							<div
								class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">
		
								<div class="yjtxtcon">
									<span class="yjbigtxt" id="HDWRZCOUNTReal"
										onclick="WindowOpen('/LargeScreen/Danzhan/SQTJ.html?type=11', '河道超警', '1200px', '650px')">&nbsp;</span>
								</div>
							</div>
						</div> -->

						<div class="ztitem ztitem1ps display_flex flex-direction_column">
							<div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
								河道超警戒
							</div>
							<div class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">

								<div class="yjtxtcon">
									<span class="yjbigtxt def1ff" id="HDWRZCOUNT" onclick="WindowOpen('/LargeScreen/Danzhan/SQTJ.html?type=1', '河道超警戒站点', '1200px', '650px')">0</span>
								</div>
							</div>
						</div>
						<div class="ztitem ztitem1ps display_flex flex-direction_column">
							<div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
								河道超保证
							</div>
							<div class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">

								<div class="yjtxtcon">
									<span class="yjbigtxt def1ff" id="HDGRZCOUNT" onclick="WindowOpen('/LargeScreen/Danzhan/SQTJ.html?type=2', '河道超保证站点', '1200px', '650px')">0</span>
								</div>
							</div>
						</div>
						<div class="ztitem ztitem1ps display_flex flex-direction_column">
							<div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
								水库超汛限
							</div>
							<div class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">

								<div class="yjtxtcon">
									<span class="yjbigtxt def1ff" id="SKWRZCOUNTReal" onclick="WindowOpen('/LargeScreen/Danzhan/SQTJ.html?type=3', '水库超汛限站点', '1200px', '650px')" style="color: rgb(255, 158, 67);">1</span>
								</div>
							</div>
						</div>
						<div class="ztitem ztitem1ps display_flex flex-direction_column">
							<div class="ztitemtit ztitemtit1 maiweid display_flex justify-content_flex-center align-items_center">
								水库超设计
							</div>
							<div class="flex_1 maiweid display_flex flex-direction_column justify-content_flex-center align-items_center hand">

								<div class="yjtxtcon">
									<span class="yjbigtxt def1ff" id="SKGRZCOUNTReal" onclick="WindowOpen('/LargeScreen/Danzhan/SQTJ.html?type=4', '水库超设计站点', '1200px', '650px')">0</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bot"></div>
		</div>
</template>
<style>
.widget-inline-box {
    text-align: center;
    color: rgba(255, 255, 255, .9);
    width: 50%;
    padding: 10% 0;
    text-align: center;
    font-size: 14px;
    float: left;
    overflow: hidden;
    width: 23.5%;
    margin: 0 .4%;
    background: rgba(1, 202, 217, .2);
    padding: 1% 0;
    height: 50%;
}
.def1ff {
    color: #def1ff;
    cursor: pointer;
}

.ztitem1ps {
    width: 24%;
    height: 40%;
}
.ztitemtit {
    height: 2rem;
	line-height:2rem;
    font-weight: bold;
    color: #ddd;
    text-align: center;
    font-size: 12px;
}
.justify-content_flex-justify {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.yjtxtcon {
    text-align: center;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    vertical-align: bottom;
}

.yjbigtxt {
    font-size: 01rem;
    font-family: shufont1;
    font-weight: bold;
}

.display_flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}
.flex-direction_column {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    -moz-flex-direction: column;
    -o-flex-direction: column;
}

.ztitemtit1 {
    background: #036E9C;
}
.maiweid {
    width: 100%;
    box-sizing: border-box;
}
.ztitemtit {
    font-size: 14px;
}
</style>