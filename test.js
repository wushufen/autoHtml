var updateHtmlByLess = require('./updateHtmlByLess')

async function test() {
  var html = await updateHtmlByLess(`
  .container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .tab-list-wrap {
      flex: none;
      .tab-list {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        height: 40px;
        padding: 0 20 - 25/2px;
        overflow: auto;
        background: #fff;
        &:after {
          content: "";
          flex: none;
          width: 59px;
          height: 1px;
        }
        &.center {
          &:before,
          &:after {
            content: "";
            width: auto;
            margin: auto;
            display: none;
          }
          + .toggle {
            display: none;
          }
        }
        .item {
          position: relative;
          padding: 0 25/2px;
          line-height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          white-space: nowrap;
          &.active {
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            color: #030303;
            letter-spacing: 0;
            text-align: center;
            &:after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              // bottom: 7px;
              bottom: 0;
              margin: auto;
              width: 14px;
              height: 2px;
              background: #000000;
              border-radius: 1px;
            }
          }
        }
      }
      .toggle {
        position: absolute;
        z-index: 3;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 59px;
        opacity: 0.98;
        background-image: linear-gradient(
          -90deg,
          #ffffff 0%,
          #ffffff 84%,
          rgba(255, 255, 255, 0) 100%
        );
        .icon-down {
          transition: 0.3s;
        }
      }
      .dropdown {
        // display: none;
        position: absolute;
        z-index: 9999;
        left: 0;
        right: 0;
        top: 40px;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        .dropdown-list {
          display: flex;
          flex-wrap: wrap;
          // justify-content: center;
          justify-content: flex-start;
          // align-content: flex-start;
          // height: 110px;
          max-height: 250px;
          padding: 10 - 12/2px 0;
          padding-left: 16 - 12/2px;
          overflow: auto;
          background: #ffffff;
          box-shadow: 5px 5px 5px -3px #aaa;
          .item {
            margin: 12/2px;
            width: 77px;
            padding: 0 4px;
            // height: 32px;
            line-height: 32px;
            background: #f0f0f0;
            border-radius: 2px;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #000000;
            letter-spacing: 0;
            text-align: center;
            &.active {
              color: #4b97fd;
            }
          }
        }
      }
      &.open {
        .toggle {
          .icon-down {
            transform: rotate(180deg);
          }
        }
        .dropdown {
          display: block;
        }
        + .tab-content-list {
          .tab-content {
            // -webkit-overflow-scrolling: auto;
            // overflow: hidden;
          }
          filter: blur(2px);
          margin-top: -0.1px;
        }
      }
    }
    .tab-content-list {
      width: 100%;
      height: 100%;
      .tab-content {
        overflow: auto;
        .banner {
          width: 343px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 5px;
          border-radius: 6px;
          .item {
            position: relative;
            width: 100%;
            height: 150px;
            .img {
              display: block;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 6px;
              object-fit: cover;
            }
            .title {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              height: 52px;
              line-height: 52px;
              padding: 0 12px;
              background-image: linear-gradient(
                -180deg,
                rgba(1, 1, 1, 0) 0%,
                rgba(1, 1, 1, 0.85) 97%
              );
              border-radius: 0px 0px 6px 6px;
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #ffffff;
              // text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .fuck-list{
          span.fuck-item{}
        }
        .article-list {
          .item {
            display: flex;
            padding: 12px 0;
            margin: 0 18px;
            color: #000000;
            border-bottom: 1px solid #f0f0f0;
            // &:visited,
            &.visited {
              color: #999999;
            }
            .left {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .title {
                max-height: 50px;
                font-family: PingFangSC-Regular;
                font-size: 17px;
                letter-spacing: 0;
                line-height: 26px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              .footer {
                display: flex;
                margin-top: 7px;
                .tag {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 6px;
                  width: 30px;
                  height: 16px;
                  font-size: 12px;
                  color: #4b97fd;
                  border: 1px solid #4b97fd;
                  border-radius: 2px;
                }
                .views {
                  font-family: PingFangSC-Regular;
                  font-size: 12px;
                  color: #999999;
                  letter-spacing: 0;
                }
              }
            }
            .right {
              flex: 0;
              .img {
                margin-left: 13px;
                width: 117px;
                height: 72px;
                background: #eee;
                object-fit: cover;
              }
            }
          }
        }
        .no-more {
          text-align: center;
          line-height: 74px;
          margin-bottom: -74px;
          color: #aaa;
        }
      }
    }
  }
  `, `
  <div class="container">
  <div class="tab-list-wrap" :class="{open:isTabsDropdownOpen}">
    <div ref="tabList" class="tab-list" :class="{center:channelList.length<6}">
      <div
        v-for="(item,i) in channelList"
        :key="i"
        class="item"
        :class="{active:current.channel==item}"
        @click="current.channel=item"
      >{{item.title}}</div>
    </div>
    <div class="toggle" @click="isTabsDropdownOpen=!isTabsDropdownOpen">
      <div class="icon-down"></div>
    </div>
    <transition>
      <div v-if="isTabsDropdownOpen" class="dropdown" @click.self="isTabsDropdownOpen=false">
        <div class="dropdown-list">
          <div
            v-for="(item,i) in channelList"
            :key="i"
            class="item"
            :class="{active:current.channel==item}"
            @click="current.channel=item;isTabsDropdownOpen=false"
          >{{item.title}}</div>
        </div>
      </div>
    </transition>
  </div>
  <swiper ref="swiper" class="tab-content-list" @slideChange="slideChange">
    <swiper-slide v-for="channel in channelList" :key="channel" class="tab-content">
      <mescroll-vue ref="mescroll" :down="mescrollVueOptions.down" :up="mescrollVueOptions.up">
        <!-- banner -->
        <swiper v-if="channel.bannerList.length" class="banner" :options="swiperOptions">
          <swiper-slide v-for="item in channel.bannerList" class="item" :key="item">
            <img
              :src="item.imageUrl"
              alt=""
              class="img"
              @click="clickItem(item,11,item.bannerId,111,207)"
            >
            <div class="title">{{item.title}}</div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- list -->
        <div class="article-list" is="transition-group" name="list">
          <!-- topList -->
          <div
            v-for="item in channel.topList"
            :key="item"
            xis="router-link"
            class="item"
            :class="{visited:item.visited}"
            to="/articel"
            @click.prevent="clickItem(item,12,item.contentId,121,208)"
          >
            <div class="left">
              <div class="title">{{item.title}}</div>
              <div class="footer">
                <div class="tag">置顶</div>
                <div class="views">{{item.viewCount}}人查看</div>
              </div>
            </div>
            <!-- <div class="right">
              <div class="img"></div>
            </div>-->
          </div>
          <!-- notTopList -->
          <div
            v-for="item in channel.notTopList"
            :key="item"
            xis="router-link"
            class="item"
            :class="{visited:item.visited}"
            to="/articel"
            @click.prevent="clickItem(item,12,item.contentId,121,208)"
          >
            <div class="left">
              <div class="title">{{item.title}}</div>
              <div class="footer">
                <!-- <div class="tag">置顶</div> -->
                <div class="views">{{item.viewCount}}人查看</div>
              </div>
            </div>
            <div v-if="item.imageUrl" class="right">
              <img :src="item.imageUrl" alt="" class="img">
            </div>
          </div>
          <!-- <div v-if="channel.isNoMore" :key="no-more" class="no-more">没有数据了</div> -->
        </div>
      </mescroll-vue>
    </swiper-slide>
  </swiper>
</div>
  `)
  console.log(html)
}


test(0)

setTimeout(() => {

}, 1000000)

