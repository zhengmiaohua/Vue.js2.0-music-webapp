<template>
  <div class="recommend" ref="recommend">
  	<scroll ref="scroll" class="recommend-content" :data="playList">
      <div>
    		<div v-if="recommends.length" class="slider-wrapper">
    			<slider>
    				<div v-for="item in recommends">
    					<a :href="item.linkUrl">
    						<img class="needsclick" @load="loadImage" :src="item.picUrl"/>
    					</a>
    				</div>
    			</slider>
    		</div>
    		<div class="recommend-list">
    			<h1 class="list-title">热门歌单推荐</h1>
    			<ul>
            <li v-for="item in playList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>   
          </ul>
    		</div>
      </div>
      <div class="loading-container" v-show="!playList.length">
        <loading></loading>
      </div>
  	</scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider' 
  import {getRecommend,getPlayList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins:[playlistMixin],
  	data() {
  		return {
  			recommends:[],
        playList:[]
  		}
  	},
  	created() {
  		this._getRecommend();
  		this._getPlayList();
  	},
  	methods: {
      ...mapMutations({
        setDisc:'SET_DISC'
      }),
      selectItem(item) {
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handlePlaylist(playlist) {
            const bottom=playlist.length>0 ? '60px' : ''
            this.$refs.recommend.style.bottom=bottom
            this.$refs.scroll.refresh()
         },
  		_getRecommend() {
  			getRecommend().then((res) => {
  				if(res.code === ERR_OK) {
  					this.recommends=res.data.slider;
  				}
  			})
  		},
  		_getPlayList() {
  			getPlayList().then((res) => {
  				if(res.code===ERR_OK) {
  					this.playList = res.data.list;
  				}
  			})
  		},
      loadImage() {
        if(!this.checkLoad){
          this.$refs.scroll.refresh();
          this.checkLoad=true;
        }
      }
  	},
  	components: {
  		Slider,
      Scroll,
      Loading
  	} 
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>