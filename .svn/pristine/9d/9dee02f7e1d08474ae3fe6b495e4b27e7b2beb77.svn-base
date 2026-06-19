    /**
     * 语音播报类
     **/
    class Broadcast {
        speech(text) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.volume = '1'; // 声音的音量，区间范围是0到1，默认是1。
            msg.rate = '1'; // 语速，数值，默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍。
            msg.pitch = '0'; // 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1。
            msg.lang = 'zh-cn'; // 使用的语言，字符串， 例如："zh-cn"
            return msg;
        }
        play = (text) => {
            speechSynthesis.speak(this.speech(text));
        }
        stop = (text) => {
            speechSynthesis.cancel(this.speech(text));
        }
    };
	
	function doTextToSpeak(text){
		const broadcast = new Broadcast();
		broadcast.play(text);
	}