let rec_status = document.getElementById('status')
const video = document.getElementById("video_Display");
const st_option = {
    video: true,
    audio: {
        sampleRate: 44100
    }

}
async function main(){
document.getElementById('getDisplay').addEventListener('click',navi_media)
function navi_media(){

    navigator.mediaDevices.getDisplayMedia(st_option)

    .then(function(video_st){
    video.srcObject = video_st;
    video.play();
    rec_status.textContent = "画面共有中"
    video_st.getTracks()[0].addEventListener('ended',()=>{

        console.log("止まったよ")
    })
    return video_st

    }).then((video_inf)=>{

        document.getElementById('video_rec').onclick = function Stream(){
            const chunks = []
            const media_rec = new MediaRecorder(video_inf,{mimeType : 'video/webm;codecs=h264'})
            media_rec.start();
            rec_status.textContent = "録画中"
            document.getElementById('video_rec').value = "録画停止"
            document.getElementById('video_rec').id = 'video_rec_stop'
         
            document.getElementById('video_rec_stop').onclick = function(){
        
                media_rec.stop();
                rec_status.value = "録画終了"
                media_rec.ondataavailable = (e) => {
                    chunks.push(e.data);
                            
                    const webm = new Blob(chunks);
                const url = window.URL.createObjectURL(webm)
                const a = document.createElement('a')
                a.setAttribute('href', url)
                a.setAttribute('download', 'rec.webm')
                a.click()
                }
                document.getElementById('video_rec_stop').value = "録画開始"
                document.getElementById('video_rec_stop').id = 'video_rec'
                
                }
        }
    
    })
    
}
}

main()



