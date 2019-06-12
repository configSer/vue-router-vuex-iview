import Layout from '@/components/common/layout';

import Media from '@/components/resource-manager/media'
import MediaAdd from '@/components/resource-manager/media/media-add'
import MediaEdit from '@/components/resource-manager/media/media-edit'

import Channel from '@/components/resource-manager/channel'
import Placement from '@/components/resource-manager/placement'
import Tag from '@/components/resource-manager/tag'

import Block from '@/components/resource-deployment/block'
import Grade from '@/components/resource-deployment/grade'
import Rotation from '@/components/resource-deployment/rotation'

import DSP from '@/components/DSP-management/dsp-manager'

import Nofond from '@/components/common/notfontd'
import Login from '@/components/common/login'

var routes = [
  {
    path: '/',
    redirect: "/index/media"
  },
  {
    path: '/login',
    name: "i-1",
    routeName: "登录",
    component: Login,
  },
  {
    path: '/index',
    name: 'i0',
    routeName: "",
    component: Layout,
    redirect:'/index/media',
    children: [
      // media ======================================================
      {
        path: '/index/media',
        name: "i0-0",
        routeName: "",
        component: Media,
      },
      {
        path: '/index/media/add',
        name: "i0-0-0",
        routeName: "",
        component: MediaAdd,
      },
      {
        path: '/index/media/edit/:id',
        name: "i0-0-1",
        routeName: "",
        component: MediaEdit,
      },
      
      // channel ==============================================
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "",
        component: Channel,
      },
      // placement ==============================================
      {
        path: '/index/placement',
        name: "i0-2",
        routeName: "",
        component: Placement,
      },
      // tag =====================================================
      {
        path: '/index/tag',
        name: "i0-3",
        routeName: "",
        component: Tag,
      }
    ]
  },
  {
    path: "/deployment",
    name: "i1",
    routeName: "",
    component: Layout,
    redirect:'/deployment/block',
    children: [
      {
        path: "/deployment/block",
        name: "i1-0",
        routeName: "",
        component: Block
      },
      {
        path: "/deployment/rotation",
        name: "i1-1",
        routeName: "",
        component: Rotation
      },
      {
        path: "/deployment/grade",
        name: "i1-2",
        routeName: "",
        component: Grade
      }
    ]
  },
  {
    path: "/dsp",
    routeName: "",
    component: Layout,
    redirect:'/dsp/index',
    children:[
      {
        path:'/dsp/index',
        name:'i2',
        component: DSP,
      }
    ]
  },
  {
    path: '*',
    redirect: "/404",
  },
  {
    path: '/404',
    name: 'i100',
    routeName: "NOT FOUND",
    component: Nofond,
  }
];

export const browsRoute = {
  "/index": {
    path: '/index',
    redirect: "/index/media",
    name: 'i0',
    routeName: "资源管理",
    icon: require('./../../static/icon/ziyuan.svg'),
    children: [
      {
        path: '/index/media',
        name: "i0-0",
        routeName: "媒体",
        icon: require('./../../static/icon/media.svg'),
      },
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "频道",
        icon: require('./../../static/icon/channel.svg'),
      },
      {
        path: '/index/placement',
        name: "i0-2",
        routeName: "广告位",
        icon: require('./../../static/icon/place.svg'),
      },
      {
        path: '/index/tag',
        name: "i0-3",
        routeName: "标签",
        icon: require('./../../static/icon/tag.svg'),
      }
    ]
  },
  "/deployment": {
    path: "/deployment",
    redirect: "/deployment/block",
    name: "i1",
    routeName: "资源部署",
    icon: require('./../../static/icon/ziyuan_1.svg'),
    children: [
      {
        path: "/deployment/block",
        name: "i1-0",
        routeName: "广告块",
        icon: require('./../../static/icon/blocks.svg'),
      },
      {
        path: "/deployment/rotation",
        name: "i1-1",
        routeName: "轮播关系",
        icon: require('./../../static/icon/lunbo.svg'),
      },
      {
        path: "/deployment/grade",
        name: "i1-2",
        routeName: "车型级别关系",
        icon: require('./../../static/icon/car.svg'),
      }
    ]
  },
  "/dsp": {
    path: "/dsp",
    redirect: "/dsp/index",
    name: "i2",
    routeName: "DSP管理",
    icon: require('./../../static/icon/dianshangpingtaikaifa.svg'),
  }
};
export const browsRouteRegister = {
  "/index": {
    path: '/index',
    redirect: "/index/media",
    name: 'i0',
    routeName: "第一梯队",
    children: [
      {
        path: '/index/media',
        name: "i0-0",
        routeName: "第一页",
      },
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "第二页",
      },
      {
        path: '/index/placement',
        name: "i0-2",
        routeName: "第三页",
      },
      {
        path: '/index/tag',
        name: "i0-3",
        routeName: "第四页",
      }
    ]
  },
  "/deployment": {
    path: "/deployment",
    redirect: "/deployment/block",
    name: "i1",
    routeName: "第二梯队",
    children: [
      {
        path: "/deployment/block",
        name: "i1-0",
        routeName: "第一页",
      },
      {
        path: "/deployment/rotation",
        name: "i1-1",
        routeName: "第二页",
      },
      {
        path: "/deployment/grade",
        name: "i1-2",
        routeName: "第三页",
      }
    ]
  },
  "/dsp": {
    path: "/dsp",
    redirect: "/dsp/index",
    name: "i2",
    routeName: "第三梯队",
  }
};

export default routes;
