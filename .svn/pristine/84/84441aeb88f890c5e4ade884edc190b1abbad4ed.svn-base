import { ref } from 'vue';
 
export default function useSpeechRecognitionService() {
    const recognition =ref(null);
  const listening = ref(false);
  const transcript = ref('');
  let finalResult = ''; // 保存最终结果的变量
  let interimResult = ''; // 保存中间结果的变量

  const startListening = () => {
    if (!recognition.value) {
      recognition.value = new webkitSpeechRecognition(); // 或者直接使用 window.SpeechRecognition
      recognition.value.continuous = true;
      recognition.value.interimResults = true;
      recognition.value.lang = 'zh-CN';
      recognition.value.onresult = handleResults 
    }
    recognition.value.start();
    listening.value = true;
    
  };
 
  const stopListening = () => {
    // if (!recognition) {
        recognition.value.stop();
    //   recognition = null;
    // }
    listening.value = false;
  };
 
  const handleResults = (results) => {
    // if (results[0] && results[0].isFinal) {
    //   transcript.value = results[0][0].transcript;
    // }
    interimResult = ''; // 清空中间结果
    for (let i = results.resultIndex; i < results.results.length; i++) {
      if (results.results[i].isFinal) {
        finalResult += results.results[i][0].transcript;
      } else {
        interimResult += results.results[i][0].transcript;
      }
    }
    transcript.value = finalResult + interimResult;

  };
 
  return {
    listening,
    transcript,
    startListening,
    stopListening
  };
}