import Layout from '@/components/common/layout';

import Media from '@/components/resource-manager/media'
import Channel from '@/components/resource-manager/channel'
import Placement from '@/components/resource-manager/placement'
import Tag from '@/components/resource-manager/tag'

import Block from '@/components/resource-deployment/block'
import Grade from '@/components/resource-deployment/grade'
import Rotation from '@/components/resource-deployment/rotation'

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
    children: [
      {
        path: '/index/media',
        name: "i0-0",
        routeName: "",
        component: Media,
      },
      {
        path: '/index/channel',
        name: "i0-1",
        routeName: "",
        component: Channel,
      },
      {
        path: '/index/placement',
        name: "i0-2",
        routeName: "",
        component: Placement,
      },
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
    redirect:"/index/media",
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
    redirect:"/deployment/block",
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
  }
};
export const browsRouteRegister = {
  "/index": {
    path: '/index',
    redirect:"/index/media",
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
    redirect:"/deployment/block",
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
  }
};

export default routes;
