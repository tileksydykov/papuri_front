import Index from '../views/index/index'
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/popular',
        name: 'Popular',
        component: ()=> import('../views/index/AllBooks'),
    },
    {
        path: '/auth',
        component: () => import("../views/user/Auth"),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import("../components/auth/Login"),
            },
            {
                path: 'registration',
                name: 'Reg',
                component: () => import("../components/auth/Registration"),
            }
        ]
    },
    {
        path: '/chapter/:id',
        name: 'Chapter',
        component: () => import("../views/book/ChapterView"),
    },
    {
        path: '/u/:username',
        name: 'Profile',
        component: () => import('../views/user/Profile'),
        children : [
            {
                path: 'settings',
                name: 'Settings',
                component: () => import("../components/profile/Settings"),
            }, {
                path: 'books',
                name: 'MyBooks',
                component: () => import("../components/profile/MyBooks"),
            }, {
                path: '',
                name: 'Activity',
                component: () => import("../components/profile/Activity"),
            },
        ]
    },
    {
        path: '/book/:id',
        name: 'Book',
        component: () => import('../views/book/BookView'),
        children: [
            {
                path: '',
                name: 'Chapters',
                component: () => import('../components/book/Chapters')
            },
            {
                path: 'volume',
                name: 'Volumes',
                component: () => import('../components/book/Volumes')
            },
            {
                path: 'create',
                name: 'CreateToBook',
                component: () => import('../components/book/create/Index'),
                children: [
                    {
                        path: '',
                        name: 'CreateVolume',
                        component: () => import('../components/book/create/CreateVolume')
                    },
                    {
                        path: 'chapter',
                        name: 'CreateChapter',
                        component: () => import('../components/book/create/CreateChapter')
                    }
                ],
            },
            {
                path: 'settings',
                name: 'BookSettings',
                component: () => import('../components/book/settings/Index'),
                children: [
                    {
                        path: '',
                        name: 'EditBook',
                        component: () => import('../components/book/settings/Edit')
                    }, {
                        path: 'maintainers',
                        name: 'BookMaintainers',
                        component: () => import('../components/book/settings/Maintainers')
                    }
                ],
            }
        ]
    },
    {
        path: '/book/create',
        name: 'CreateBook',
        component: () => import('../views/book/BookCreate')
    },
    {
        path: '/editor/:id',
        name: 'Editor',
        component: () => import('../views/repo-editor/RepoEditor')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
