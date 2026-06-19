//语音识别
import axios from 'axios'
export function discern (data) {
   return axios.request({
    url: '/tba3618098/speech/getSpeechAndWord',
    // url: '/tba3618098/speech/getSpeechKeyByVoice',
    headers: { 'Content-Type': 'multipart/form-data',"Authorization":"768ADC6A9E72BFEE4891F1F98650FEEE" },
    data,
    method: 'POST'
  })
}