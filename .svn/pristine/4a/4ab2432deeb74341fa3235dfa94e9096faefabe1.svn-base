<template>
  <div class="record">
    <input
      :class="['recorderBtn',isClicking?'isClicked':'']"
      @mousedown.prevent="startRecord"
      @mouseup.prevent="stopRecord"
      type="button"
      value="语音识别"
    />
    <p>{{resText}}</p>
  </div>
</template>

<script>
import { discern } from '@/api/speech/unpack.js'
import Record from "@/utils/speech/record-sdk.js";
import { ElMessage } from "element-plus";

export default {
  name: "Record",
  data () {
    return {
      isFinished: false,
      audio: "",
      resText: '语音识别返回内容',
      recorder: new Record(),
      //是否开始点击按钮
      isClicking: false
    };
  },
  methods: {
    startRecord: function () {
      let self = this;
      self.isFinished = false;
      self.recorder.startRecord({
        success: res => {
          self.isClicking = true
          console.log("开始录音");
        },
        error: res => {
          console.log("录音失败");
        }
      });
    },
    stopRecord: function () {
      //  console.log("stop record now.");
      let self = this;
      self.isFinished = true;
      self.recorder.stopRecord({
        success: res => {
          //此处可以获取音频源文件(res)，用于上传等操作
          //   console.log("stop record successfully.");
          let files = new File([res], 'test.wav', { type: 'audio/wav' })
          const formData = new FormData()
          formData.append('wavfile', files)
          //发送到后台接口
          discern(formData).then(res => {
            if (res.status === 200) {
              self.isClicking = false
              if (res.data.result) {
                self.resText = res.data.result
                console.log('有识别内容',res.data.result)
                //添加策略  根据不同返回值调用不同方法
                let result = res.data.result
                switch (result) {
                  case '打印':
                  ElMessage.success('打印')
                    break;
                  default:
                    break;
                }
              } else {
                console.log('无返回识别内容')
              }


            }
          }).catch(err => {
            self.resText = '语音识别错误'
            console.log(err)
          })
        },
        error: res => {
          self.resText = '语音识别返回内容'
          self.isClicking = false
          console.log("stop record failed.");
        }
      });
    },
    play: function () {
      console.log("play record now.");
      let self = this;
      self.isFinished = true;
      self.audio = document.querySelector("audio");
      self.recorder.play(self.audio);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.record {
  margin: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.recorderBtn {
  width: 150px;
  height: 40px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.record .isClicked {
  background-color: royalblue;
  background-color: red;
}
</style>
