import Layout from '@/pages/common/layout';

import Media from '@/pages/resource-manager/media'
import MediaForm from '@/pages/resource-manager/media/media-form'

import Channel from '@/pages/resource-manager/channel'
import ChannelAdd from '@/pages/resource-manager/channel/channel-add'
import ChannelEdit from '@/pages/resource-manager/channel/channel-edit'

import Placement from '@/pages/resource-manager/placement'
import Tag from '@/pages/resource-manager/tag'

import Block from '@/pages/resource-deployment/block'
import Grade from '@/pages/resource-deployment/grade'
import Rotation from '@/pages/resource-deployment/rotation'

import DSP from '@/pages/DSP-management/dsp-manager'

import Nofond from '@/pages/common/notfontd'
import Login from '@/pages/common/login'

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
        component: MediaForm,
      },
      {
        path: '/index/media/edit/:id',
        name: "i0-0-1",
        routeName: "",
        component: MediaForm,
      },
      
      // channel ==============================================
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "",
        component: Channel,
      },
      {
        path: '/index/channel/add',
        name: "i0-1-0",
        routeName: "",
        component: ChannelAdd,
      },
      {
        path: '/index/channel/edit/:id',
        name: "i0-1-1",
        routeName: "",
        component: ChannelEdit,
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
    children: [
      {
        path: '/index/media',
        name: "i0-0",
        routeName: "媒体",
      },
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "频道",
      },
      {
        path: '/index/placement',
        name: "i0-2",
        routeName: "广告位",
      },
      {
        path: '/index/tag',
        name: "i0-3",
        routeName: "标签",
      }
    ]
  },
  "/deployment": {
    path: "/deployment",
    redirect: "/deployment/block",
    name: "i1",
    routeName: "资源部署",
    children: [
      {
        path: "/deployment/block",
        name: "i1-0",
        routeName: "广告块",
      },
      {
        path: "/deployment/rotation",
        name: "i1-1",
        routeName: "轮播关系",
      },
      {
        path: "/deployment/grade",
        name: "i1-2",
        routeName: "车型级别关系",
      }
    ]
  },
  "/dsp": {
    path: "/dsp",
    redirect: "/dsp/index",
    name: "i2",
    routeName: "DSP管理",
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
