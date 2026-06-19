<template>
    <div style="text-align: center;height:100%;">
        <div class="form1" style=" float:left; width:100%;display: inline-block;overflow-y: auto;height: 100%;">
            <table cellspacing='0' cellpadding='0' border='0' class="table1">
                <tr>
                    <td class="lie1" align="right">响应时间</td>
                    <td class="lie2 View">
                        <input id="STIME" class="mini-datepicker" style="width:135px;" format="yyyy-MM-dd HH:mm"
                            timeFormat="HH:mm" showTime="true" showOkButton="true" showClearButton="false" />
                    </td>
                </tr>
                <tr>
                    <td class="lie1" align="right">响应类型</td>
                    <td class="lie2 View">
                        <!-- <el-cascader ref="cascader" :options="optionType" v-model="selectedOptionsType" clearable
                            @change="handleChangeType" /> -->
                        <el-radio @click="TypeChange('FT')" v-model="typeName" label="FT">防台</el-radio>
                        <el-radio @click="TypeChange('FX')" v-model="typeName" label="FX">防汛</el-radio>
                    </td>
                </tr>
                <tr style="display: none;">
                    <td class="lie1" align="right">单位</td>
                    <td class="lie2 View">
                        <!-- <el-cascader ref="cascader" :options="optionName" v-model="selectedOptions" clearable
                            @change="handleChange" /> -->
                        苏州市水务局
                    </td>
                </tr>
                <tr>
                    <td class="lie1" align="right">响应等级</td>
                    <td class="lie2 View" colspan="3">
                        <!-- <el-radio-group> -->
                        <el-radio @click="handlePathChange('0')" v-model="pathName" label="0">无</el-radio>
                        <el-radio @click="handlePathChange('4')" v-model="pathName" label="4">Ⅳ级</el-radio>
                        <el-radio @click="handlePathChange('3')" v-model="pathName" label="3">Ⅲ级</el-radio>
                        <el-radio @click="handlePathChange('2')" v-model="pathName" label="2">Ⅱ级</el-radio>
                        <el-radio @click="handlePathChange('1')" v-model="pathName" label="1">Ⅰ级</el-radio>
                        <!-- </el-radio-group> -->
                    </td>
                </tr>
                <!-- <tr>
                    <td class="lie1" align="right">填报人员</td>
                    <td class="lie2 View">
                        <el-cascader :options="optionUploadname" clearable />
                    </td>
                </tr> -->
                <tr style="max-height: 400px;">
                    <!-- <td class="lie1" align="right">预案指导</td> -->
                    <!-- <td class="lie2 View" style="max-width: 600px;" colspan="4">
                        <el-tabs tab-position="left" class="demo-tabs" v-model="selectedTabIndex">
                            <el-tab-pane v-for="(item, index) in Yuandata" :key="index" :label="item.label" :name="index">
                                {{ item.levelLabel }}
                            </el-tab-pane>
                        </el-tabs>
                    </td> -->
                </tr>

                <tr style="max-height: 400px;">
                    <td class="lie1" align="right">响应措施
                        <img src="/images/pdf.gif" alt="应急预案" style="vertical-align: -2px;cursor: pointer;" @click="Yuan">
                    </td>
                    <td class="lie2 View" style="max-width: 600px;" colspan="3">
                        <div id="yuanzhidao"
                            style="overflow-y: auto;height:100%;width:100%;min-height:235px;white-space: pre-wrap;">
                            <!-- <div v-for="(item, index) in xiangyingcuoshi" :key="index"> -->
                            <!-- &nbsp;&nbsp;&nbsp;&nbsp;{{ item }} -->
                            <!-- <span v-html="item"></span> -->
                            <!-- </div> -->
                            <div class="fixed-tabs-header-container">
                                <el-tabs tab-position="top" class="demo-tabs" v-model="selectedTabIndex">
                                    <el-tab-pane v-for="(item, index) in Yuandata" :key="index" :label="item.label"
                                        :name="index">
                                        <span v-html="item.levelLabel"></span>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="lie2" align="center" style="text-align:center;height:50px;line-height:50px; ">
                        <el-button type="primary" style="margin-left: 20px" @click="onOK()">启动</el-button>
                        <el-button type="primary" style="margin-left: 20px" @click="reset()">关闭</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <MyDialog :showDialog="showDialog" @close="showDialog = false" :title="titleName" :typeValue="typeValue"
        style="width: 1400px; height: 800px">
        <pdf />
        <!-- <iframe id="yujing" src="/pdf/WarningInfo_FT.pdf" style="height:100%;width: 100%;"></iframe> -->
    </MyDialog>

    <MyDialogM :showDialog="showDialogM" @close="showDialogM = false" :title="titleNameM" :typeValue="typeValueM"
        style="width: 1350px; height: 700px">
        <message :closeLineDialogM="closeLineDialogM" ref="child" />
    </MyDialogM>
</template>
<script setup>
import MyDialog from "@/components/ComDialog.vue";
import MyDialogM from "@/components/ComDialog.vue";
import message from "@/components/danzhan/qxjz/message.vue";
import pdf from "@/components/top/pdf.vue";
import { SetNull, UUID } from "@/api/ComUnit.js";
// ElConfigProvider：时间选择框汉化
import { ElDatePicker, ElRadio, ElCascader, ElConfigProvider, ElTabs } from "element-plus";
import { ref, onMounted, provide, computed } from "vue";
import api from "@/api/zonglan/index.js";
import dayjs from "dayjs";
import $ from "jquery";

const stime = ref("");
const pathName = ref("0");
const optionName = ref([]);
const selectedOptionsType = ref([]);
const optionType = ref([{ "value": "FT", "label": "防台" }, { "value": "FX", "label": "防汛" }])
// 默认选中第一个选项的第一个子选项
selectedOptionsType.value = optionType.value[0].value;

const typeName = ref("FT")
const optionUploadname = ref([]);
const name = ref("")
const cascader = ref(null);
const selectedOptions = ref([]);
const WarnList = ref([]);
const Yuandata = ref([]);
const selectedTabIndex = ref("");
const yuanzhidao = ref("这是第一行、这是第二行");
const xiangyingcuoshi = ref([]);

// 判断弹窗是否显示,默认隐藏
const showDialog = ref(false);
// 传递弹开页面的标题名称
const titleName = ref();
const typeValue = ref();

const showDialogM = ref(false);
const titleNameM = ref();
const typeValueM = ref();
// 格式化消息内容（支持Markdown）
const formatMessage = (content) => {
    const contentWithBreaks = content.replace(/\n/g, '<br>');
    return contentWithBreaks;
}

const defaultProps = {
    children: 'children',
    label: 'label',
}

const props = defineProps({
    closeLineDialog: Function  //这里的closeLineDialog对应父页面中的 **:closeLineDialog**
});

// 获取当前主题
const _theme = localStorage.getItem("curTheme");
onMounted(() => {
    mini.parse();
    var startTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    mini.get("STIME").setValue(dayjs(startTime).format("YYYY-MM-DD HH:mm"));
    stime.value = dayjs(mini.get("STIME").getFormValue()).format("YYYY-MM-DD HH:mm:ss");
    WarningYUAN(typeName.value, 0);
});

function handlePathChange(e) {
    pathName.value = e;
    loadWarning();
}
function TypeChange(e) {
    typeName.value = e;
    WarningYUAN(e, pathName.value);
}
const WarningSZData = ref([]);
function WarningYUAN(pathname, pid) {
    var strParam = {};
    strParam["pathname"] = pathname;
    strParam["pid"] = "";
    api.WarningSZFindResult(strParam).then((res) => {
        var strJson = res.result;
        WarningSZData.value = strJson;
        loadWarning();
    }).catch((err) => {
    });
}
function loadWarning() {
    var strJson = WarningSZData.value;
    if (strJson.length > 0) {
        var level, level1, level2, level3, level4;
        var levelLabel, levelLabel1, levelLabel2, levelLabel3, levelLabel4;
        for (var num = 0; num < strJson.length; num++) {
            if (pathName.value == strJson[num].xydj) {
                if (strJson[num].xydj == "1") {
                    level = "Ⅰ级应急响应";
                    levelLabel = strJson[num].note;
                }
                if (strJson[num].xydj == "2") {
                    level = "Ⅱ级应急响应";
                    levelLabel = strJson[num].note;
                }
                if (strJson[num].xydj == "3") {
                    level = "Ⅲ级应急响应";
                    levelLabel = strJson[num].note;
                }
                if (strJson[num].xydj == "4") {
                    level = "Ⅳ级应急响应";
                    levelLabel = strJson[num].note;
                }
            }
        }

        var fangzhi, fangzhiLD, fangzhiPeople, fangban, yjgongz, fangtai, zhuanjia;
        var fangzhiJG, difang, xiangzhen;
        if (typeName.value == "FT") {
            fangzhi = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>贯彻落实国家防总、省防指和市委、市政府决策部署，组织制定全市防台风工作的政策、规程和制度，及时部署落实防台风各项准备工作，决定启动、变更和结束防台风应急响应，组织指挥防台风抢险救灾救援和灾后处置等工作。';
            fangzhiLD = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（1）指挥：市长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>指挥职责：根据防台风形势，在防指综合研判基础上，统筹全市防台风力量，组织召开全市工作会议，主持重要的防台风会商会议，指挥调度Ⅰ级应急响应时的防台风及抢险救灾工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（2）常务副指挥：常务副市长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>常务副指挥职责：受指挥委托，负责指挥Ⅱ级应急响应时的防台风及抢险救灾工作。当灾害仍在发展且有扩大趋势时，提请指挥提高响应级别；指挥外出时，全面主持市防指工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（3）副指挥：分管水务的副市长，苏州军分区副司令员，市政府秘书长，市政府分管水务、应急工作的副秘书长、市水务局、应急局局长、武警苏州支队支队长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>副指挥职责：协助指挥工作，负责重大防台风事件协调工作。负责Ⅲ级、Ⅳ级应急响应时的防台风指挥工作，当灾害仍在发展且有扩大趋势时，提请指挥提高响应级别。';
            fangzhiPeople = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>各成员单位服从市防指统一指挥，及时高效执行各项指令；按照职责分工，负责本系统、本行业防台风工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>苏州军分区：牵头协调驻苏部队、预备役部队和民兵，支援地方抗台抢险；组织民兵信息员做好灾情、险情信息报送；组织民兵协助完成工程抢修、排污清障、转移群众、抢运物资等任务；必要时协助开展灾后恢复重建。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>武警苏州支队：协调驻苏武警部队参加支持地方抗台抢险，加强对重要目标的安全保卫，协助公安部门维护防台抢险和社会治安秩序，协助地方组织群众转移和安置。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>水务局：组织指导水旱灾害防治体系建设；负责水情、工情的监测预报及预警信息发布；组织开展水利工程日常检查等；负责水利防台风抢险专业队伍建设和市级水利防台风物资储备、管理；负责水旱灾害防御及水量调度指挥工作，承担防御台风应急抢险的技术支撑工作，组织防台风抢险力量，开展水毁水利设施抢修。协助受灾地区人员转移撤离。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>应急局：统筹消防等应急救援力量建设，指导综合性应急救援队伍、各级各部门及社会应急救援力量建设；按照分级负责的原则，指导应急救援，组织协调有关灾害应急救援工作，协调重要应急物资的储备、调拨和紧急配送；组织协调灾害救助工作，会同有关方面组织协调紧急转移安置受灾群众、因灾毁损房屋恢复重建补助和受灾群众生活救助；组织指导灾情核查、损失评估、救灾捐赠工作，依法统一发布灾情信息；负责监督、指导灾害发生时的安全生产工作，防止发生危险化学品爆炸、泄漏等安全事故及次生灾害。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>宣传部：把握全市防台工作宣传导向，畅通信息共享渠道，协调新闻媒体做好新闻报道，协助有关部门做好灾害性天气警报、水雨情预警、应急响应等信息的公众发布，做好防灾减灾、避险自救等知识的宣传工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>网信办：收集分析防台风舆情，加强防台风舆情监管，正确引导舆论。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>发改委：负责与防台工程建设、除险加固、水毁修复等水利重点工程项目投资补助资金对上争取。负责市级救灾物资的收储、轮换和日常管理，根据市应急局的动用指令按程序组织救灾物资的调出。负责协调灾区救灾物资保障和粮油供应，保障受灾群众的基本生活。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>教育局：负责全市学校的防台安全工作，督促做好学校及学科类培训机构停课、师生安置转移等工作。做好学校防台风宣传，提高师生防范意识和自我防护能力。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>工信局：负责保障抢险救灾无线电专用频率使用安全；组织对防御台风无线电台站使用情况进行监督检查；查处应急处置期间对防御台风无线电专用频率、台站造成的有害干扰的行为；配合做好防御台风抢险救灾所需物资器材的生产保障工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>公安局：负责维护防台抢险秩序和灾区社会治安，负责道路交通临时管制；依法查处盗窃、哄抢防汛、防台风器材、物料及破坏水利、水文、通信设施的案件。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>财政局：负责安排抢险救灾、应急抢修、险工隐患处理、水毁工程修复等经费，并对资金的使用进行监管。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>资源规划局：负责做好防台建设的规划选址工作；负责台风灾害发生时地质灾害预警和监测工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>生态环境局：负责对灾害次生的水环境污染、水生态环境破坏开展应急监测，提出环境污染控制和处置的建议，监督指导污染防治措施的落实。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>住建局：负责建筑工地和城市危房的防台风工作；负责在建建筑工程及市政基础设施工程的预警与有关信息发布，督促做好塔吊、脚手架、龙门吊等高空作业设施的安全防护；指导属地住建部门协助属地政府做好居住在危险房屋的群众的撤离疏散工作；指导属地住建部门督促物业服务企业做好小区屋顶太阳能、空调外挂、窗台摆放物等设施的巡查工作，提醒相关产权人落实防风加固措施。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>园林绿化局：负责所管辖的园林景区、城市公园的防台安全，必要时及时通知园林景区停止营业；指导督促各市、区做好城市绿化防台工作，及时清除被风雨刮倒、折断影响交通、供电、通信等安全的树木。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>城管局：负责市政道路、桥梁等市政设施的管理维护和抢险工作监督；负责广告牌、灯箱、霓虹灯等户外设施安全管理的监督，并督促落实加固或拆除等防风措施。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>交通局：负责协调救援人员和抢险救灾物资的运输车辆和船舶，协同公安机关指导各地做好交通疏导和车辆分流工作，保障防台抢险救灾车辆船只的畅通；负责公路、港口、航道、渡口、码头等的预警与有关信息发布；负责所辖江、河、湖通航水域船只、浮筒、浮码头、下穿隧道等人员的转移撤离工作；做好航道清障工作；相关部门做好协调在苏铁路的防台保安。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>农业农村局：负责农（渔）业的防台和救灾工作，做好农业灾害情况统计、灾后防疫和抗灾救灾技术指导服务；指导种植业、畜牧业、水产养殖业等落实设施大棚防风措施；指导渔船回港避风，渔业人员撤离上岸；清除在水域内非法设置的鱼簖、缯网、围网、拦网等行洪障碍；及时提供农业受灾情况。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>文广旅局：组织广播、电视部门做好新闻报道及灾害性天气警报、水雨情预警、应急响应等信息的播发，做好相关宣传报道工作；负责对重大活动、旅游景区等发布安全提示信息，根据预警级别督促停运高空游乐设施，关闭旅游景区；指导旅游景区做好防御及游客避险、救护、疏导和转移工作，保障游客安全。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>卫生健康委：负责组织开展伤病人员医疗救治和灾区卫生防疫工作；及时提供灾区疫情与防治信息。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>国动办（人防办）：负责人防工程的防台安全工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>供销总社：协助做好防台风抢险和生产救灾物资的供应工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>便民服务中心：及时提供群众反映的灾情、汛情等信息，做好沟通和解释工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>轨道交通集团：负责轨道交通运营设施、在建工地的防台排涝工作，确保安全运行。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>供电公司：保障防台、排涝用电；及时修复受破坏的供电设施。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>通信行业管理办公室：组织、督促市各基础电信运营企业加强通信保障系统的维护，确保应急期间的通信畅通，并制定通信系统备用方案和应急处置预案。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>气象局：及时提供天气预报、灾害性天气专报和实时气象信息，预测天气发展趋势；发布灾害性天气警报和预警信号；开展灾害成因的气象分析。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>水文局：负责水雨情的监测、预警预报工作，做好水文信息的统计分析。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市消防救援支队：负责抢险队伍建设和应急救援装备、物资储备，做好抢险救援准备。负责组织、指导属地消防救援队伍参与抢险救援工作，指导各类社会救援力量参加救援任务，协助属地政府疏散和营救危险地区的群众。';
            fangban = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市防指的办事机构为苏州市防汛抗旱指挥部办公室（以下简称市防办）。承担市防指的日常工作；会同相关部门密切关注台风动向，加强滚动会商，为市防指决策提供支撑；组织指导协调全市防台风工作。'
            yjgongz = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>启动Ⅱ级及以上应急响应时，市防指成立综合协调组、监测预警组、技术支持组、抢险救援组、转移安置组、交通通信组、医疗救治组、秩序保障组、宣传报道组、灾情评估组等10个工作组，服从指挥或常务副指挥统一调度，其组成及职责如下：<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（1）综合协调组：由发改委、财政局、水务局、应急局、气象局、水文局组成。市水务局局长任组长。贯彻落实党中央、国务院决策部署和国家防总、省防指以及省市党委政府工作要求，负责综合协调、上传下达、工作指导、财务保障、督办核查等工作。组织防台风会商，审定发布水情调度方案，根据险情拟定抢险方案，部署抢险救灾工作；综合风情、汛情、灾情及防台信息，起草防台工作通知；紧急下拨救灾经费；负责纵向、横向和各组的综合协调、监察工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（2）监测预警组：由气象局、资源规划局、生态环境局、住建局、水务局、农业农村局、水文局等组成。市气象局局长任组长。密切关注台风动向，负责台风、水文、地质、水质预报，视情向相关单位和社会发布预警信息。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（3）技术支持组：由市气象局牵头，自然资源和规划局、生态环境局、住房和城乡建设局、交通运输局、水务局、农业农村局及有关设计、施工等单位组成。根据抢险需要，组织水上抢险救援、水利工程抢险、房屋建筑工地、地质灾害、环境污染、道路交通等相关行业专家提供防台抢险技术支持。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（4）抢险救援组：由苏州军分区、武警苏州支队、公安局、生态环境局、住建局、园林绿化局、城管局、交通局、水务局、文广旅局、卫健委、应急局、发改委、供销总社、供电公司、通管办、消防救援支队组成。市应急局局长任组长。负责各类险情的抢险救灾；调度抢险救灾物资、设备、船只及抢险小分队；维护社会治安；负责易燃易爆和有毒等化学品的处理；负责抢险、遇险伤病人员的救治；制订救灾计划，调拨、发放救灾物资，组织卫生防疫。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（5）转移安置组：由应急局、教育局、财政局、资源规划局、住建局、水务局、农业农村局、文广旅局、卫健委、发改委、供销总社等组成。市政府分管应急的副秘书长任组长。指导属地政府做好受灾群众转移安置、基本生活保障和抚慰受灾人员家属，组织调拨救灾款物。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（6）交通通信组：由市交通运输局、工信局、通管办、供电公司等组成。负责做好防台风期间交通运输、应急通信、电力等保障，组织协调优先运送伤员和抢险救援救灾人员、物资。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（7）医疗救治组：由市卫健委、苏州军分区、武警苏州支队、市应急局等组成。负责组织协调调度医疗队伍、物资，组织指导受灾群众的医疗救援救治、卫生防疫和安置人员、救援人员的医疗保障，做好灾后疾病预防控制和卫生监督工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（8）秩序保障组：由市公安局、苏州军分区、武警苏州支队等组成。负责指导灾区社会治安维稳工作，预防和打击各类犯罪活动，预防和处置群体事件；做好灾区重要目标安全保卫工作。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（9）宣传报道组：由市委宣传部、网信办、水务局、文广旅局、气象局、便民服务中心、通信行业管理办公室等组成。市政府分管水务的副秘书长任组长。负责对新闻媒体报道的协调和指导，组织和接待新闻采访；负责防台抢险的对外发布和宣传报道，必要时召开新闻发布会；组织开展舆情监测、研判与引导，回应社会热点关注；加强避险自救等公益宣传。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>（10）灾情评估组：由应急局、教育局、资源规划局、住建局、交通局、水务局、农业农村局、文广旅局等组成。负责组织指导灾情和灾害损失统计、核查与评估。在应急响应期间，市防指可根据台风发展变化等实际情况增减工作组，调整工作组组成和职责，指导台风防御和抢险救灾工作。';
            fangtai = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>启动Ⅲ级及以上应急响应时，市防指根据实际情况下派督导组，由市防指相关成员单位分管领导、1名处室负责人及市水务局1名工作人员组成，主要职责为：全面贯彻落实市委、市政府及市防指工作部署，进一步压实压紧基层责任，督促检查属地政府（管委会）防台风措施落实情况，并及时将有关情况向市防指反馈。列席当地防台风应急会商部署会，指导抢险救灾等。';
            zhuanjia = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市防指组建专家库，由相关专业的技术和管理专家组成，为防台风指挥决策、应急处置等提供技术支撑。';


            // console.error("防台风应急响应流程数据加载失败，请检查网络连接是否正常。", levelLabel, listNT)
            Yuandata.value = [
                {
                    label: '市防指职责',
                    levelLabel: fangzhi,
                    children: [
                        {
                            label: fangzhi,
                        },
                    ],
                },
                {
                    label: '市防指领导职责',
                    levelLabel: fangzhiLD,
                    children: [
                        {
                            label: fangzhiLD,
                        },
                    ],
                },
                {
                    label: '市防指成员单位职责',
                    levelLabel: fangzhiPeople,
                    children: [
                        {
                            label: fangzhiPeople,
                        },
                    ],
                },
                {
                    label: '市防办职责',
                    levelLabel: fangban,
                    children: [
                        {
                            label: fangban,
                        },
                    ],
                },
                {
                    label: '应急工作组职责',
                    levelLabel: yjgongz,
                    children: [
                        {
                            label: yjgongz,
                        },
                    ],
                },
                {
                    label: '防台风督导组职责',
                    levelLabel: fangtai,
                    children: [
                        {
                            label: fangtai,
                        },
                    ],
                },
                {
                    label: '专家库',
                    levelLabel: zhuanjia,
                    children: [
                        {
                            label: zhuanjia,
                        },
                    ],
                },
                {
                    label: level,
                    levelLabel: levelLabel,
                    children: [
                        {
                            label: levelLabel,
                        },
                    ],
                },
            ]
            var listNT = levelLabel.split("#");
            if (listNT.length > 0) {
                var listItem = [];
                var strItem = {};
                var oneChilrenHtml = "";
                for (let i = 0; i < listNT.length; i++) {
                    var item = listNT[i].split("@");
                    // console.error("item" + i, item);
                    var _label = item[0].replace('<b style="margin-left:28px;color:var(--popupContentTitleColor)">', '').replace("。</b>", "");
                    if (SetNull(_label) != "") {
                        if (_label == "") {
                            oneChilrenHtml = item[1];
                        }
                        strItem = {
                            label: _label,
                            levelLabel: item[1],
                            children: [
                                {
                                    label: item[1],
                                },
                            ],
                        };
                        listItem.push(strItem);
                    }
                    else {
                        oneChilrenHtml += item[1];
                    }


                }

                Yuandata.value = listItem;
            }


        } else if (typeName.value == "FX") {
            fangzhiJG = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>指挥：市长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>常务副指挥：常务副市长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>副指挥：分管水务工作的副市长，苏州军分区副司令员，市政府秘书长，市政府分管水务、应急工作的副秘书长、市水务局、应急局局长、武警苏州支队支队长。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>成员：宣传部、网信办、发改委、教育局、工信局、公安局、财政局、资源规划局、生态环境局、住建局、园林绿化局、城管局、交通局、水务局、农业农村局、文广旅局、卫生健康委、应急局、国动办（人防办）、供销总社、便民服务中心、轨道交通集团、供电公司、通信行业管理办公室、气象局、水文局、市消防救援支队等单位负责人组成。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市防指的办事机构为苏州市防汛抗旱指挥部办公室（以下简称市防办），市防办地址：苏州市虎丘区狮山街道玉山路11号，苏州市水务局。<br/><b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市防指机构组成调整具体由市防指相关文件明确。';
            difang = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>县级地方政府设立防汛抗旱指挥机构，在本级党委、政府和上级防汛抗旱指挥机构的领导下，组织和指挥本地区的防汛抗旱工作。';
            xiangzhen = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>乡镇（街道）、村（社区）和企事业单位按照基层防汛抗旱体系建设要求，明确职责和人员，在县级防指和乡级党委、政府的领导下，做好本行政区域和本单位的防汛抗旱工作。';
            zhuanjia = '<b style="margin-left:28px;color:var(--popupContentTitleColor)"></b>市防指组建专家库，由相关专业的技术和管理专家组成，为防汛抗旱指挥决策、应急处置等提供技术支撑。';
            Yuandata.value = [
                {
                    label: '市防指机构组成',
                    levelLabel: fangzhiJG,
                    children: [
                        {
                            label: fangzhiJG,
                        },
                    ],
                },
                {
                    label: '地方政府防汛抗旱指挥机构',
                    levelLabel: difang,
                    children: [
                        {
                            label: difang,
                        },
                    ],
                },
                {
                    label: '基层防汛抗旱组织',
                    levelLabel: xiangzhen,
                    children: [
                        {
                            label: xiangzhen,
                        },
                    ],
                },
                {
                    label: '专家库',
                    levelLabel: zhuanjia,
                    children: [
                        {
                            label: zhuanjia,
                        },
                    ],
                },
                {
                    label: level,
                    levelLabel: levelLabel,
                    children: [
                        {
                            label: levelLabel,
                        },
                    ],
                },
            ]

            var listNT = levelLabel.split("#");
            if (listNT.length > 0) {
                var listItem = [];
                var strItem = {};
                var oneChilrenHtml = "";
                for (let i = 0; i < listNT.length; i++) {
                    var item = listNT[i].split("@");
                    // console.error("item" + i, item);
                    var _label = item[0].replace('<b style="margin-left:28px;color:var(--popupContentTitleColor)">', '').replace("。</b>", "");
                    if (SetNull(_label) != "") {
                        if (_label == "") {
                            oneChilrenHtml = item[1];
                        }
                        strItem = {
                            label: _label,
                            levelLabel: item[1],
                            children: [
                                {
                                    label: item[1],
                                },
                            ],
                        };
                        listItem.push(strItem);
                    }
                    else {
                        oneChilrenHtml += item[1];
                    }


                }

                Yuandata.value = listItem;
            }

        }

    }
}
function Yuan() {
    showDialog.value = true;
    typeValue.value = typeName.value;
    if (typeName.value == "FT") {
        titleName.value = "防台风应急预案";
    } else if (typeName.value == "FX") {
        titleName.value = "防汛防旱应急预案";
    }
}
function onOK() {
    var strParam = {};
    strParam["id"] = UUID(8, 10);
    strParam["name"] = name.value;
    strParam["xydj"] = pathName.value;
    strParam["time"] = stime.value;
    strParam["type"] = typeName.value;
    var datasource = "";
    var strExp = "";
    api.DUTYPLANSel({ "stime": dayjs(stime.value).format("YYYY-MM-DD"), "etime": dayjs(stime.value).format("YYYY-MM-DD") }).then((res) => {
        var DayB, DayW;
        if (res.result.length > 0) {
            DayB = res.result[0].zb_zhuren;
            DayW = res.result[0].zb_people_one;
        }

        // if (SetNull(DayB) != "") {
        api.Addressbook({ "pid": "" }).then((data) => {
            var DayBData = data.result.filter(function (e) { return e.name == DayB });
            datasource += DayBData[0].name + ":" + DayBData[0].mobile + ","

            var DayWData = data.result.filter(function (e) { return e.name == DayW });
            datasource += DayWData[0].name + ":" + DayWData[0].mobile + ","
        }).catch((err) => { });
        // }
        // if (SetNull(DayW) != "") {
        // api.Addressbook({ "pid": "" }).then((data) => {
        if (pathName.value == 0) {
            strExp = "于" + stime.value + "取消应急响应！";
        } else if (pathName.value == 1) {
            strExp = "于" + stime.value + "发布Ⅰ级应急响应，请值班人员注意！";
        } else if (pathName.value == 2) {
            strExp = "于" + stime.value + "发布Ⅱ级应急响应，请值班人员注意！";
        } else if (pathName.value == 3) {
            strExp = "于" + stime.value + "发布Ⅲ级应急响应，请值班人员注意！";
        } else if (pathName.value == 4) {
            strExp = "于" + stime.value + "发布Ⅳ级应急响应，请值班人员注意！";
        }
        api.WarningAdd(strParam).then((res) => {
            if (res.success == "true") {
                strParam["name"] = "苏州水务局";
                api.WarningModify(strParam).then((res) => {
                    WarnList.value = strParam;
                    if (res.success == "true") {
                        showDialogM.value = true;
                        titleNameM.value = "应急响应短信通知"
                        typeValueM.value = { "datasource": datasource, "note": strExp };
                    }
                }).catch((err) => {
                });
            }
        }).catch((err) => {
        });
        // }).catch((err) => { });
        // }
    }).catch((err) => { });
}
function closeLineDialogM() {
    console.error("关闭-------WarnListWarnListWarnListWarnListWarnListWarnList", WarnList);
    showDialogM.value = false;
    props.closeLineDialog();
}
// 提供方法给子组件
provide("typeValueM", typeValueM);
function reset() {
    //  请关闭弹框
    props.closeLineDialog();
}
//这里需要暴露出去不然父组件调用不到这个方法
defineExpose({ WarnList })
provide("typeValue", typeValue)

</script>

<style src="@/assets/styles/qxjz.css"></style>
<style scoped>
:deep(.el-radio) {
    --el-radio-input-bg-color: #d5141400;
}

:deep(.el-radio__label) {
    color: var(--widgetcolor);
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
    width: 160px;
}

:deep(.el-input__prefix-inner) {
    margin-left: -9px;
}

:deep(.el-input__suffix) {
    margin-right: -9px;
}

:deep(.el-input__wrapper) {
    background-color: #d5141400;
    box-shadow: 0 0 0 1.5px var(--popContentHeadbg);
    ;
}

:deep(.el-input__inner) {
    color: var(--widgetcolor);
}

:deep(.el-button) {
    background-color: var(--popContentHeadbg);
    border-color: var(--popContentHeadbg);
    color: #fff;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label),
:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: var(--swDivSelectcolor);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: var(--swDivSelectcolor);
    border-color: var(--swDivSelectcolor)
}

:deep(.el-cascader-node.is-active) {
    color: var(--popupContentTitlebg) !important;
}

:deep(.el-tree-node__label) {
    color: var(--mtablecolor);
}



:deep(.el-tree-node__content) {
    height: auto;
}

:deep(.el-tree-node) {
    outline: none;
    white-space: normal;
    height: auto;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
    background-color: transparent;
}

:deep(.el-tree .el-tree-node .el-tree-node__content:hover) {
    background-color: transparent;
}

:deep(.el-tree-node:focus>.el-tree-node__content) {
    background-color: transparent;
}

/* .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
} */

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}

:deep(.el-tabs__item) {
    color: var(--widgetcolor);
    padding: 0px 10px;
    font-size: 1rem;
}

:deep(.el-tabs--left .el-tabs__item.is-left) {
    color: var(--widgetcolor);
    padding: 0px 10px 0px 0px;
}

:deep(.el-tabs__item.is-active, .el-tabs__item:hover) {
    color: var(--swDivSelectcolor) !important;
    font-size: 1.05rem;
}

:deep(.el-tabs__active-bar) {
    background-color: var(--swDivSelectcolor);
}

:deep(.el-tab-pane) {
    line-height: 32px;
}

/* 自定义滚动条样式 */
#yuanzhidao::-webkit-scrollbar {
    width: 2px;
}

#yuanzhidao::-webkit-scrollbar-thumb {
    /* 滚动条手柄 */
    width: 10px;
    height: 10px;
    position: absolute;
    right: -4px;
    top: 0px;
    background: var(--mtabletrcolor);
    z-index: 2;
}

/* 给包含 el-tabs 的容器设置固定高度和滚动属性 */

/* 固定 el-tabs 头部 */
:deep(.el-tabs__header.is-top) {
    position: sticky;
    top: 0;
    background-color: var(--dialogColor);
    /* 设置背景色，避免内容滚动时穿透 */
    z-index: 1;
    /* 确保头部显示在内容上方 */
}
</style>
