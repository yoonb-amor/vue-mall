export default [{
  path: '/index',
  name: 'index',
  meta: {
    index: 1
  },
  component: () => import('@/views/home/index.vue')
},
  {
    path: '/fjindex',
    name: 'fjindex',
    meta: {
      index: 1
    },
    component: () => import('@/views/home/fjindex.vue')
  },
{
  path: '/mine',
  name: 'mine',
  meta: {
    index: 1
  },
  component: () => import('@/views/mine/index.vue')
}
]
