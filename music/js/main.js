/**
 * Created by Administrator on 2017/3/10.
 */
//点击播放
function play(){
    var music = document.getElementById('music');
    var btnPlay = document.getElementById('btn-play');
    if(music.paused){
        music.play();
    } else {
        music.pause();
    }
}
//展开
function getLyric() {
    document.getElementById('get-lyric').style.display = 'none';
    document.getElementById('hide-lyric').style.display = 'block';
    document.getElementById('lyric-more').style.display = 'block';
}
//收起
function hideLyric() {
    document.getElementById('get-lyric').style.display = 'block';
    document.getElementById('hide-lyric').style.display = 'none';
    document.getElementById('lyric-more').style.display = 'none';
}
