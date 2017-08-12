import {playMode} from 'common/js/config'
import {loadSearch,loadPlay} from 'common/js/cache'
const state={
	singer:{},
	playing:false,
	fullScreen:false,
	playlist:[],//播放列表
	sequenceList:[],//歌曲列表
	mode:playMode.sequence,//顺序播放
	currentIndex:-1,
	disc:{},
	topList:{},
	searchHistory:loadSearch(),
	playHistory:loadPlay()
}
export default state