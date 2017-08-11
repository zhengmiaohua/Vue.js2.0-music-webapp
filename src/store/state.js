import {playMode} from 'common/js/config'
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playlist:[],//播放列表
	sequenceList:[],//歌曲列表
	mode:playMode.sequence,//顺序播放
	currentIndex:-1,
	disc:{},
	topList:{}
}
export default state